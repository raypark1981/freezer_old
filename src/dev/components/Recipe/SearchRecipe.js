import React from 'react';
import { Link } from 'react-router-dom';

import '../../../../css/components/searchRecipe.css';

import * as recipeActions from '../../actions/recipe.js'
 
import { connect } from 'react-redux';

import SearchType from './SearchType';
import RecipeList from './RecipeList';
import util from '../../scripts/util.js';

import '../../scripts/extension';


class SearchRecipe extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hotList: [],
            recommendList: [],
            searchParam: {
                type: "search",
                dtls: "",
                way2: "",
                pat2: ""
            },
            dispSearchWord: []
        }

        this.getHotRecipeList = this.getHotRecipeList.bind(this);
        this.getList = this.getList.bind(this);
        this.searchClickHandle = this.searchClickHandle.bind(this);
        this.searchKeyPressHandle = this.searchKeyPressHandle.bind(this);
        this.passTogetListObj = this.passTogetListObj.bind(this);
        this.setSearchMethod = this.setSearchMethod.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    getList(){
        let _url = "/api/RecipeSearch";

        $.ajax({
            url: _url
            , type: "GET"
            , data: this.state.searchParam
            , async: false
            , dataType: "json"
            , success: function (data) { 
                if(data){
                    this.setState(prevState => ({
                        ...prevState.state,
                        recommendList: data.RecipeIndexlist
                    }),function(){});
                }else{
                    this.setState(prevState => ({
                        ...prevState.state,
                        recommendList: []
                    }),function(){});
                }

            }.bind(this)         
        });
    }

    searchKeyPressHandle(e){
        //검색어가 있고, 엔터키 눌렀을때 이벤트 발생
        if(e.target.value){
            if(e.key === 'Enter') this.searchClickHandle();
        }
    }

    searchClickHandle(){
        this.convertObjToParam("searchByText", this.getList);
    }

    passTogetListObj(obj){
        //리덕스 props 셋팅
        this.props.setSearchType(obj);

        //검색 파라미터 만들기어서 list 가져 오는 함수 callback실행
        this.convertObjToParam("search", this.getList);
    }

    convertObjToParam(type, callback){
        let _param = {};
        let _dispSearchWord = [];

        if(type == "search"){
            let _dtls = [];
            if(this.props.searchTypeObj.ingredient.length) {
                _dtls = this.props.searchTypeObj.ingredient.filter(item => item.onoff);
            }
    
            let _way2 = this.props.searchTypeObj.way2.filter(item => item.onoff);
            let _pat2 = this.props.searchTypeObj.pat2.filter(item => item.onoff);
    
            _param = {
                type: type,
                dtls: _dtls.length ? _dtls.map(item => item.name).join(' ') : "",
                way2: _way2.length ? _way2.map(item => item.name).toString() : "",
                pat2: _pat2.length ? _pat2.map(item => item.name).toString() : ""
            }

            if(_param.dtls)
                _dispSearchWord = _param.dtls.split(' ');
            if( _param.way2)
                _dispSearchWord.push(_param.way2);
            if(_param.pat2)
                _dispSearchWord.push(_param.pat2);

        }else if(type == "searchByText"){
            _param = {
                type: type,
                dtls: document.getElementById("searchTxt").value,
                way2: "",
                pat2: ""
            }

            _dispSearchWord = _param.dtls.split(' ');
        }        

        this.setState({
            ...this.state, 
            searchParam: _param,
            dispSearchWord: _dispSearchWord
        },callback)
    }

    getIngredientList(){
        let _list = [];
        var db = new freezer.createlocalFreezerDB();
        let mainfreezer = db.getMainFreezer();

        mainfreezer.MySections.map(section => {
            section.MyFoods.map(food => {
                if(food.RecipeYN && food.RecipeYN == "Y")
                    _list.push({name: food.FoodName, onoff: false})
            })
        })
        
        return _list;
    }

    getHotRecipeList(){
        let _url = "/api/RecipeSearch";
        let _param = {
            type: "hot",
            dtls: "",
            way2: "",
            pat2: ""
        }

        $.ajax({
            url: _url
            , type: "GET"
            , data: _param
            , async: false
            , dataType: "json"
            , success: function (data) { 
                if(data){
                    this.setState(prevState => ({
                        ...prevState.state,
                        hotList: data.RecipeIndexlist
                    }),function(){});
                }else{
                    this.setState(prevState => ({
                        ...prevState.state,
                        hotList: []
                    }),function(){});
                }

            }.bind(this)         
        });
    }

    componentDidMount(){
        
        //재료리스트 가져 오기(원래 화면에 존재한던 -> props에 저장된 리스트 )
        let list = this.props.searchTypeObj.ingredient;
        //신규 추가된 리스트 
        let newlist = this.getIngredientList();
        //이전 + 신규 = 새로운 리스트 만들기
        let chagedIngredient = util.getNewArray(newlist, list);
        this.passTogetListObj({...this.props.searchTypeObj, ingredient: chagedIngredient});

        //인기레시피 가져 오기 
        this.getHotRecipeList();
    }

    setSearchMethod(e){
        let _type = e.currentTarget.dataset.method;
        this.props.setSearchType({...this.props.searchTypeObj, type: _type});
    }

    render(){  
        return(
            <div className={`search-recipe-container`} data-paging-direction="right">   
                <div className="search-wrapper">
                    <div className="search-name">
                        <Link to="/" className="logo"></Link> 
                        <div className="name-box">
                            <input id="searchTxt" type="text" placeholder="재료명, 음식명, 태그" onKeyPress={this.searchKeyPressHandle} />
                            <button type="button" onClick={this.searchClickHandle}></button>
                        </div>
                    </div>
                    <div className="search-method">
                        <a className={`${this.props.searchTypeObj.type == "ingredient" ? "on" : ""}`} onClick={this.setSearchMethod} data-method="ingredient"><span>재료별</span></a>
                        <a className={`${this.props.searchTypeObj.type == "way2" ? "on" : ""}`} onClick={this.setSearchMethod} data-method="way2"><span>방법별</span></a>
                        <a className={`${this.props.searchTypeObj.type == "pat2" ? "on" : ""}`} onClick={this.setSearchMethod} data-method="pat2"><span>종류별</span></a>
                    </div>
                    <div className="search-ingredient">
                        <SearchType passTogetListObj={this.passTogetListObj}></SearchType>
                    </div>
                </div>
                <div className="display-wrapper">
                    {
                        this.state.dispSearchWord.map((e, i) => (<span key={i}>{`#${e}`}</span>))
                    }
                </div>
                <RecipeList list={this.state.recommendList} title="추천"></RecipeList>
                <RecipeList list={this.state.hotList} title="인기"></RecipeList>
            </div>
        );
    }
}


// export 하기전 함수를 설정
// redux state 안에 있는걸 이 컴포넌트 props 로 맵핑 해주는거

const mapStateToProps = (state) => {
    return{
        searchTypeObj: state.recipe.searchTypeObj
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setSearchType: (searchTypeObj) => {dispatch(recipeActions.setSearchType(searchTypeObj))}
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(SearchRecipe);