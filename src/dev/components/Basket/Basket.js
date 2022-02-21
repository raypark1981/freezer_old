import React from 'react';
import '../../../../css/components/basket.css';

import CommonHeader from '../common/CommonHeader'
import CommonEditMenu from '../common/CommonEditMenu'
import CommonFloating from '../common/CommonFloating'

import * as commonActions from '../../actions/common.js'
import * as commonS from '../../scripts/common.js'

import { connect } from 'react-redux';

class Basket extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            headerValues: {
                headTitle : '장바구니',
                leftAction : '',
                rightAction : '',
                rightActionEvent : () => { 
                    var db = new freezer.createlocalFreezerDB();
                    var _baskets = db.syncFromBasketToMyFreezer();
                    return true;
                }, 
                leftClass : '',
                rightClass : 'save'
            },
            floatingMenuList:[ 
                { mode : 'delete' , text : '선택삭제' , classname : 'delete' , clickevent : this.deleteBaskets.bind(this) } , 
                { mode : 'ingredient' , text : '재료 추가' , classname : 'ingredient' , clickevent : this.addBasket.bind(this) }
            ]
            ,editMenuValue :   {
                title: '장바구니',
                editList: []  
            },
            baskets : [],
            checkedBasketArray : [],
            editMenuToggle : false,
            selectedEditMenu : { id : '' , addMemo : false , editable : false}, 
            
        }

        this.initSet = this.initSet.bind(this);
        this.deleteBaskets = this.deleteBaskets.bind(this);
        this.getBaskets = this.getBaskets.bind(this);
        this.clickEditMenu = this.clickEditMenu.bind(this);
        this.closeEditMenu = this.closeEditMenu.bind(this);
        this.clickCheckbox = this.clickCheckbox.bind(this);
    }

    saveBasket(_basket){
        var db = new freezer.createlocalFreezerDB();
        var list = db.updateBasket(_basket , db.getBasket);

        if(list != undefined && list.length > 0)
        this.setState({
            baskets : list
        })
    }

    deleteBaskets(keys){

        //  직접 클릭
        if(keys != undefined && keys.length > 0){
            if(confirm('삭제 하시겠습니까?')){
                var db = new freezer.createlocalFreezerDB();
                var list = db.deleteBasket(keys , db.getBasket);
        
                this.setState({
                    baskets : list
                    , checkedBasketArray : []
                })    
            
                this.props.openNcloseEditMenu(false);
            }

            return;
        }

        // 선택박스 클릭
        if(this.state.checkedBasketArray.length > 0){
            if(confirm('{0}개의 품목을 삭제 하시겠습니까?'.format(this.state.checkedBasketArray.length))){
                var db = new freezer.createlocalFreezerDB();
                var list = db.deleteBasket(this.state.checkedBasketArray , db.getBasket);
        
                this.setState({
                    baskets : list
                    , checkedBasketArray : []
                })    
            }
        }
        else{
            alert('삭제 할 품목을 선택해주세요')
        }

        return false;
    }

    addBasket(){

        var db = new freezer.createlocalFreezerDB();
        var _addedBasket = db.addBasket({ BasketMemo : '' , BasketYN : 'N' ,  IsNew : 'Y'}, db.getBasket);
        var list = db.getBasket();

        if(list != undefined && list.length > 0){
            this.setState(prevState => ({
                ...prevState , 
                baskets : list,
                selectedEditMenu : { id : _addedBasket.BasketKey , addMemo : false , editable : true}, 
            }))

            this.props.openNcloseEditMenu(false);
        }
    }

    editTitle(){
        this.setState(prevState => ({
            ...prevState , 
            selectedEditMenu : {
                ...prevState.selectedEditMenu , 
                addMemo : false , 
                editable : true, 
            }
        }))

        return true;
    }

    addBasketMemo(){
        this.setState(prevState => ({
            ...prevState , 
            selectedEditMenu : {
                ...prevState.selectedEditMenu , 
                addMemo : true , 
                editable : false , 
                // editMenuToggle : false
            }
        }))

        this.props.openNcloseEditMenu(false);

        return true;
    }

    clickEditMenu( basket , e){

        var _editMenuValue = {
            title: basket.FoodName,
            editList: []  
        }
        
        _editMenuValue.editList.push({className: "memo", event: this.addBasketMemo.bind(this), title: "메모추가"})
        _editMenuValue.editList.push({className: "delete", event:  this.deleteBaskets.bind( null , [ basket.BasketKey]) , title : "재료 삭제"})
        

        if(basket.BasketYN.toUpperCase() == "N"){
            _editMenuValue.editList.push({className: "memo", event: this.editTitle.bind(this), title: "이름 수정"});
        }

        if(e.target.classList.contains('save')){

            var _text ='';

            if(this.state.selectedEditMenu.addMemo){
                _text = e.target.closest('.basket-list').querySelector('textarea.memo').value;
                this.saveBasket({ ...basket , BasketMemo : _text});

                

            }

            if(this.state.selectedEditMenu.editable){
                _text = e.target.closest('.basket-list').querySelector('[type="text"]').value;
                this.saveBasket({ ...basket , FoodName : _text});
            }

            this.setState(prevState => ({
                ...prevState , 
                selectedEditMenu : {
                    addMemo : false, 
                    editable : false

                }
            }))
            this.props.openNcloseEditMenu(false);
        }

        if(e.target.classList.contains('more')){
            this.setState(prevState => ({
                ...prevState , 
                // editMenuToggle : true,
                selectedEditMenu : {
                    id : basket.BasketKey , 
                    addMemo : false
                }, 
                editMenuValue : _editMenuValue
            }))

            this.props.openNcloseEditMenu(true);
        }
    }

    clickCheckbox(e){
        var _selectedkey = e.target.dataset.basketkey ;
        var prev = this.state.checkedBasketArray.slice();
        if(e.target.checked)
            prev.push(_selectedkey)
        else
            prev.pop(_selectedkey)

        this.setState(prevState => ({
            ...prevState , 
            checkedBasketArray : prev
        }))
    }

    closeEditMenu(){
        this.setState(prevState => ({
            ...prevState , 
            // editMenuToggle : false 
        }))

        this.props.openNcloseEditMenu(false);
    }

    getBaskets(){
        var db = new freezer.createlocalFreezerDB();
        var _baskets = db.syncFromMyFreezerToBasket();

        this.setState({
            baskets : _baskets
        })
    }

    initSet(){
        this.getBaskets();
    }

    componentDidMount(){
        this.initSet();
    }

    componentWillUnmount(){
       
    }

    render(){
        var _baskets = this.state.baskets.length > 0 ? this.state.baskets : [];
        return(
            <div className="basket-container"  data-paging-direction="right">
                <CommonHeader headerValues={this.state.headerValues}/>
                <ul className="basket-wrapper">
                    {
                        _baskets.map((basket , i) => (
                            <li key={basket.BasketKey} className="basket-list">
                                <div className="basket-list-item">
                                    <div className="basket-list-item-content vertical-middle">
                                        <input type="checkbox" id={`chkBox_${basket.BasketKey}`} data-basketkey={basket.BasketKey} onClick={this.clickCheckbox} onChange={(e)=>{ e.target.checked = e.target.checked}}/>
                                        <label htmlFor={`chkBox_${basket.BasketKey}`} className={`color${(i + 1) % 24}`}></label>
                                        <span style={ { display : (this.state.selectedEditMenu.id  == basket.BasketKey && !!this.state.selectedEditMenu.editable) ? 'none' : '' }}  className="name">{basket.FoodName}</span>
                                        <input style={ { display : (this.state.selectedEditMenu.id  == basket.BasketKey && !!this.state.selectedEditMenu.editable) ? '' : 'none' }} placeholder={basket.FoodName} type="text" className="name" />
                                        <span className="memo">{basket.BasketMemo}</span>
                                    </div>
                                    <i style={ { display : (this.state.selectedEditMenu.id  == basket.BasketKey && (this.state.selectedEditMenu.addMemo || this.state.selectedEditMenu.editable)) ? '' : 'none' }} onClick={this.clickEditMenu.bind(null , basket)} className="save"></i>
                                    <i className="more" onClick={this.clickEditMenu.bind(null , basket)}></i>
                                </div>
                                <div className={`basket-memo ${ (this.state.selectedEditMenu.id  == basket.BasketKey && !!this.state.selectedEditMenu.addMemo) ?  'expended' : ''}`}>
                                    <div className='basket-content'>
                                        <textarea placeholder={basket.BasketMemo} className='memo' rows='3'></textarea>
                                    </div>
                                </div>
                            </li>
                        ))

                    }
                   
                </ul>
                <CommonEditMenu editMenuValue={this.state.editMenuValue} toggled={this.props.openNclose_editMenu} />
                <CommonFloating menuList={this.state.floatingMenuList}/>
                <i className="layermask" onClick={this.closeEditMenu} ></i>
            </div>
        );
    }
}


//export default EditFreezer;
const mapStateToProps = (state) => {
    // state 는 component state랑은 틀림 , redux state를 칭함
    return {
        openNclose_editMenu: state.common.openNclose_editMenu
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        openNcloseEditMenu: (conditon) => {dispatch(commonActions.openNcloseEditMenu(conditon))}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);