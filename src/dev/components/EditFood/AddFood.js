import React from 'react';
import { Link } from 'react-router-dom'
import CommonHeader from '../common/CommonHeader';

import { connect } from 'react-redux';

import InfiniteCalendar from 'react-infinite-calendar';
import CommonEditMenu from '../common/CommonEditMenu';
import * as commonActions from '../../actions/common.js'
import {Calendar ,  withRange } from 'react-infinite-calendar/lib/';

import 'react-infinite-calendar/styles.css';
import '../../../../css/components/addFood.css';


const propTypes = {
};

const defaultProps = {
   
};

class AddFood extends React.Component{
    constructor(props){
        super(props)

        var db = new freezer.createlocalFreezerDB();
        var _myFood = db.getAddFood();

        if(_myFood.FoodKey == -1 && props.match.params.food_key > -1 ){
            _myFood = db.getMyFood(props.match.params.food_key) 
            db.setAddFood(_myFood);
        }
            

        var date = new Date();
        this.state = {
            showCalendarYN : false,
            MyFood : _myFood,
            selectedSection : props.selectedSection ,
            selectedCalendar : {
                start : _myFood == undefined ? date : _myFood.InputDate.stringToDate('yyyy년 MM월 dd일'), 
                end : _myFood == undefined ? date : _myFood.ExpiredDate.stringToDate('yyyy년 MM월 dd일'), 
            }, 
            headerValues :{
                headTitle : props.match.params.food_key > 0 ? '수정' : '추가 ',
                leftAction : '' ,
                leftActionEvent : this.cancelSavingFood.bind(this), 
                rightAction : '' ,
                rightActionEvent : this.saveFood.bind(this), 
                leftClass : 'close',
                rightClass : 'save'
            } 
            
            ,editMenuValue :   {
                title: '장바구니',
                editList: [
                    {className: "memo", event: this.clickEditFoodName.bind(this), title: "식품명 수정"}
                ]  
            }
            , selectedEditMenu : false
        }

        this.closeEditMenu = this.closeEditMenu.bind(this);
        this.clickEditMenu = this.clickEditMenu.bind(this);
        this.clickEditFoodName = this.clickEditFoodName.bind(this);
        this.deleteSavingFood = this.deleteSavingFood.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
        this.cancelSavingFood = this.cancelSavingFood.bind(this);
        this.saveFood = this.saveFood.bind(this);
        this.saveFoodName = this.saveFoodName.bind(this);
    }

    cancelSavingFood(){
        var confirmString = this.state.MyFood.FoodKey == -1 ? "등록중인 푸드를 중단하시겠습니까?" :  "저장하지 않은 데이터가 있습니다. 이 페이지를 벗어나시겠습니까?";
        var db = new freezer.createlocalFreezerDB();
        var _myfood = db.getAddFood();

        var __myfood = db.getMyFood(this.state.MyFood.FoodKey)
        if(this.state.MyFood.FoodKey > -1){
            if(_myfood.FoodName != __myfood.FoodName || _myfood.FoodDetail != __myfood.FoodDetail ||  _myfood.Memo != __myfood.Memo ||  _myfood.InputDate != __myfood.InputDate ||  _myfood.ExpiredDate != __myfood.ExpiredDate){    
                if(confirm(confirmString.format(_myfood.FoodName == undefined ? ''  : _myfood.FoodName))){    
                    return true;
                }
                else{
                    return false;    
                }
            }else{
                db.initializeAddFood();
                return true;
            }
        }
        else{
            if(_myfood.FoodName != "" || _myfood.FoodDetail != "" ||  _myfood.Memo != ""){
                if(confirm(confirmString.format(_myfood.FoodName == undefined ? ''  : _myfood.FoodName))){
                    // db.deleteMyFood(_myfood.FoodKey , db.initializeAddFood);
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                db.initializeAddFood();
                return true;
            }
        }
    }

    
    closeEditMenu(){
        this.props.openNcloseEditMenu(false);
    }
    
    clickEditFoodName(){
        
        this.setState(prevState => ({
            ...prevState , 
            selectedEditMenu : true , 
        }))
        this.props.openNcloseEditMenu(false);
    }
    
    clickEditMenu(){
        window.webViewBridge.send('handleFooterVisible' , 'Y' , function (){ } , function (){ });
        this.props.openNcloseEditMenu(true);
    }

    deleteSavingFood(){
        var confirmString = this.state.MyFood.FoodKey == -1 ? "등록중인 푸드를 삭제 하시겠습니까?" :  "{0}을(를) 삭제 하시겠습니까?";
        var db = new freezer.createlocalFreezerDB();
        var _myfood = db.getAddFood();
        if(_myfood.FoodName != "" || _myfood.FoodDetail != "" ||  _myfood.Memo != ""){
            if(confirm(confirmString.format(_myfood.FoodName == undefined ? ''  : _myfood.FoodName))){
                db.deleteMyFood(_myfood.FoodKey , db.initializeAddFood);
                return true;
            }
            else{
                return false;
            }
        }
        else{
            db.initializeAddFood();
            return true;
        }


    }

    saveFood(){
        
        var db = new freezer.createlocalFreezerDB();
        var _myfood = db.getAddFood();
        
        if(_myfood.FoodName == ''){
            alert('식품명을 입력해주세요(필수)!');
            return false;
        }
        if(_myfood.FoodKey == -1){
            var _newMyFoodKey = db.getNewFoodKey();
            db.insertMyFood(this.state.selectedSection , { ..._myfood , FoodKey : _newMyFoodKey} , db.initializeAddFood)
        }
        else{
            db.updateMyFood(_myfood, db.initializeAddFood)
        }

        return true;
    }

    showCalendar(){
        this.setState(prevState => ({
            ...this.state, 
            showCalendarYN : !prevState.showCalendarYN
        }) , function(){
            
            window.webViewBridge.send('handleFooterVisible' , this.state.showCalendarYN ? 'Y' : 'N' , function (){ } , function (){ });
        });
    }
    
    onCalendarSelect = (e) => {
        
        if (e.eventType === 3) {
            this.setState({ selectedCalendar: {
                start: e.start,
                end: e.end,
            } } , function(){
                var db = new freezer.createlocalFreezerDB();
                var myfood = db.getAddFood();
                var _myfood = {
                    ...myfood , 
                    InputDate : e.start.convertFormatString('yyyy년 MM월 dd일'), 
                    ExpiredDate : e.end.convertFormatString('yyyy년 MM월 dd일') 
                }
                db.setAddFood(_myfood);
                setTimeout(()=>{
                    this.showCalendar();
                }, 500)
            });
        }
    }

    saveFoodName(){
        
        var txtFoodName = document.getElementById('txtFoodName').value;
        if(txtFoodName == ''){
            this.setState(prevState =>({
                ...prevState , 
                selectedEditMenu : false 
            }));
            return false;
        }
            

        this.setState(prevState =>({
            ...prevState , 
            selectedEditMenu : false , 
            MyFood : {
                ...prevState.MyFood , 
                FoodName : txtFoodName
            }
        }) , function(){
            var db = new freezer.createlocalFreezerDB();
            var myfood = db.getAddFood();
            var _myfood = {
                ...myfood , 
                FoodName : txtFoodName
            }
            db.setAddFood(_myfood);
        })
    }

    componentWillReceiveProps(nextProps){
    
    }

    componentWillUnmount(){
         
    }

    componentDidMount(){
        console.log('AddFood!! call parent!');
        setTimeout(() => {
            if(window.webViewBridge != undefined){
                // window.webViewBridge.send('handleCurrentPath' , location.pathname , function (){ } , function (){ });



                // 해당 페이지 일때만 실행
                if(location.pathname.toUpperCase().indexOf('ADDFOOD') > -1){
                    var handleComponentDidMountMessage = {
                        visibleFooter : 'N' , 
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
        var today = new Date();
        var locale = {
            locale: require('date-fns/locale/ko'),
            weekdays: ["일","월","화","수","목","금","토"],
        };
        var theme = {
            selectionColor: 'rgb(250, 191, 1)',
            weekdayColor: 'rgb(250, 191, 1)',
            accentColor : 'rgb(250, 191, 1)'
        }
        var displayOptions = {
            showHeader: false,
            showTodayHelper: false,
            showWeekdays: true
          };
        var displayCalendar = this.state.showCalendarYN ? 'show' : '';
        return (
            <div className="add-food-container" data-paging-direction="right">
                <CommonHeader headerValues={this.state.headerValues} />
                <input type='hidden' id='hidFoodCD' value={this.state.MyFood.FoodCD}/>
                <div className="add-food-wrapper">
                    <div className="block">
                        <i className="food-name"></i><span className="title">식품명</span>
                        
                        <i style={ { display : this.state.selectedEditMenu ? 'none' : '' }} className="more" onClick={this.clickEditMenu}></i>
                        <i style={ { display : this.state.selectedEditMenu ? '' : 'none' }} className="save" onClick={this.saveFoodName} ></i>
                        <span className="food-name" style={ { display : this.state.selectedEditMenu ? 'none' : '' }}>{this.state.MyFood.FoodName == "" ? "입력하세요" : this.state.MyFood.FoodName}</span>
                        <input id="txtFoodName" style={ { display : this.state.selectedEditMenu ? '' : 'none' }} placeholder={this.state.MyFood.FoodName} type="text" className="name vertical-middle" />
                    </div>
                    <div className="block">
                        <i className="food-name"></i><span className="title">품목명</span>
                        <Link to={`/SearchFood/${this.state.MyFood.FoodKey}`}>
                            <span data-foodkey={this.state.MyFood.FoodKey}>{this.state.MyFood.FoodCDName == "" ? "선택하세요" : this.state.MyFood.FoodCDName}</span>
                        </Link>
                    </div>
                    <div className="block date" onClick={this.showCalendar}> 
                        <i className="clock"></i><span className="title">보관일시</span><span className="disp-date">{this.state.selectedCalendar.start == undefined ? this.state.MyFood.InputDate : this.state.selectedCalendar.start.convertFormatString('yyyy년 MM월 dd일') }</span>
                    </div>
                    <div className="block date connect" onClick={this.showCalendar}>
                        <i></i><span className="title">소비기한</span><span className="disp-date">{this.state.selectedCalendar.end == undefined ? this.state.MyFood.InputDate : this.state.selectedCalendar.end.convertFormatString('yyyy년 MM월 dd일') }</span>
                    </div>
                    <div className={`block date-wapper ${displayCalendar}`} >
                        <InfiniteCalendar
                            Component={withRange(Calendar)}
                            selected={this.state.selectedCalendar}
                            width={'100%'}
                            height={window.innerHeight - 200}
                            locale={locale}
                            theme={theme}
                            displayOptions={displayOptions}
                            onSelect={this.onCalendarSelect}
                        />
                    </div>
                    
                    <div className="block">
                        <i className="detail"></i><span className="title">세부사항</span>
                        <Link to={`/AddDetail/${this.state.MyFood.FoodKey}`}>
                            <span>{this.state.MyFood.FoodDetail}</span>
                        </Link>
                    </div>
                    <div className="block">
                        <i className="memo"></i><span className="title">메모</span>
                        <Link to={`/AddMemo/${this.state.MyFood.FoodKey}`}>
                            <span>{this.state.MyFood.Memo}</span>
                        </Link>
                    </div>
                </div>
                <Link to={`/`}>
                    <div style={this.props.match.params.food_key > 0 ? {} : { display : 'none' }} className="delete" onClick={this.deleteSavingFood}><p>삭제</p></div>
                </Link>
                <CommonEditMenu editMenuValue={this.state.editMenuValue} toggled={this.props.openNclose_editMenu} handleCloseEditMenu={()=>{
                    this.props.openNcloseEditMenu(false);
                    window.webViewBridge.send('handleFooterVisible' , 'N' , function (){ } , function (){ });
                }} />
                <i className="layermask" onClick={this.closeEditMenu} ></i>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    
    return {
        selectedSection : state.addfood.selectedSection , 
        openNclose_editMenu: state.common.openNclose_editMenu
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        openNcloseEditMenu: (conditon) => {dispatch(commonActions.openNcloseEditMenu(conditon))}
    };
}

export default connect(mapStateToProps , mapDispatchToProps)(AddFood);