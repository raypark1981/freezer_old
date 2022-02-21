import React from 'react';
import CommonHeader from '../common/CommonHeader';
import '../../../../css/components/searchFood.css';


class SearchFood extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            word : '' , 
            masterCode : '' , 
            searchFoodlist : [] ,
            selectedFoodKey : props.match.params.food_key,
            selectedValue : {},  
            headerValues :{
                headTitle : '식품검색',
                rightAction : 'AddFood/{0}'.format(props.match.params.food_key) ,
                rightClass : 'save'
            } 
        }

        this.searchKeyPressHandle = this.searchKeyPressHandle.bind(this);
        this.selectSearchedFood = this.selectSearchedFood.bind(this);
        this.searchFood = this.searchFood.bind(this);
    }

    selectSearchedFood(e){
        
        var tr = e.target.closest('tr');
        var mastercode = tr.dataset.mastercode;
        var foodcode = tr.dataset.foodcode;
        var foodcdname = tr.querySelector('.food-name').innerHTML;

        var db = new freezer.createlocalFreezerDB();
        var myfood = db.getAddFood();

        var _myfood = {
            ...myfood , 
            FoodCD : foodcode, 
            FoodCDName : foodcdname ,
            MasterCode : mastercode
        }
        db.setAddFood(_myfood , function(){ history.back()});
    }

    searchKeyPressHandle(e){
        //검색어가 있고, 엔터키 눌렀을때 이벤트 발생
        if(e.target.value){
            if(e.key === 'Enter') this.searchFood();
        }
    }

    searchFood(){
        var word = document.getElementById('txtMasterGrpName').value; 
        var masterCode = document.getElementById('selectFoodMasterGroup').value;

        var _url = "/API/Search?word={0}&masterCode={1}".format(encodeURI(word) , masterCode)
        $.ajax({
            url: _url
        , type: "GET"
        , async: false
        , dataType: "json"
        , beforeSend: function(){}
        , success: function (data) { 
            if(data.length > 0){
                this.setState(prevState => ({
                    ...prevState , 
                    searchFoodlist : data
                }))
            }
        }.bind(this)
        , complete : function(){}
         
        });
    }

    componentDidMount(){
        setTimeout(() => {
            if(window.webViewBridge != undefined){
                // window.webViewBridge.send('handleCurrentPath' , location.pathname , function (){ } , function (){ });

                // 해당 페이지 일때만 실행
                if(location.pathname.toUpperCase().indexOf('SEARCHFOOD') > -1){
                    var handleComponentDidMountMessage = {
                        visibleFooter : 'Y' , 
                        currentPath : location.pathname
                    }
                    window.webViewBridge.send('handleComponentDidMount' , handleComponentDidMountMessage , function (){ } , function (){ });                
                }
            }
            else{
                console.log('window.webViewBridge 없어')
            }    
        }, 0);
    }

    render(){
        var _searchFoodlist = this.state.searchFoodlist.length > 0 ? this.state.searchFoodlist : [];
        return (
            <div className={`search-food-container`} data-paging-direction="left">
            <CommonHeader headerValues={this.state.headerValues} />
            <div className="search-food-wrapper">
                <div className="block">
                    <i className="food-group"></i><span className="title">식품군</span>
                    <span className="select">
                        <select id="selectFoodMasterGroup">
                            <option value="">-- 전체 --</option>
                            <option value="FM001">곡류 및 그 제품</option>
                            <option value="FM002">감자 및 전분류</option>
                            <option value="FM003">당류 및 그 제품</option>
                            <option value="FM004">두류 및 그 제품</option>
                            <option value="FM005">견과류</option>
                            <option value="FM006">채소류</option>
                            <option value="FM007">버섯류</option>
                            <option value="FM008">과실류</option>
                            <option value="FM009">육류 및 그 제품</option>
                            <option value="FM010">난류</option>
                            <option value="FM011">어패류</option>
                            <option value="FM012">해조류</option>
                            <option value="FM013">우유 및 유제품</option>
                            <option value="FM014">유지류</option>
                            <option value="FM015">음료 및 주류</option>
                            <option value="FM016">조미료류</option>
                            <option value="FM017">조리가공식품류</option>
                            <option value="FM018">기타</option>
                        </select>
                    </span>
                </div>
                <div className="block connect">
                    <i className="food-name"></i><span className="title">식품명</span>
                    <input type="text" id="txtMasterGrpName" placeholder="검색" onKeyPress={this.searchKeyPressHandle}/>
                    <button className="search" onClick={this.searchFood}></button>
                </div>
                <div className="search-result-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th className="group">식품군</th>
                                <th className="name">식품명</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _searchFoodlist.map(x => (
                                    <tr key={x.Food_CD} data-mastercode={x.MasterCode} data-foodcode={x.Food_CD} onClick={this.selectSearchedFood}>
                                        <td className="grp-title">{x.FoodGrpName}</td>
                                        <td className="food-name">{x.DESC_KOR}</td>
                                    </tr>
                                ))
                            }
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    };
}

// redux state 안에 있는걸 이 컴포넌트 props 로 맵핑 해주는거

export default SearchFood;
