import React , {Component , PropTypes } from "react";
import { TransitionGroup, CSSTransition, CSSTransitionGroup, Switch } from "react-transition-group";
import MySections from "./MySections"
import NoticeSwiper from "./NoticeSwiper"
import RightMenuMyInfo from "./RightMenuMyInfo"
import FoodSwiper from "./FoodSwiper";


import { connect } from 'react-redux';

import * as actions from '../../actions/common';
import * as actionsFoodlist from '../../actions/foodlist';

import '../../../../css/components/FoodList.css'
import '../../../../css/components/ListHeader.css'
import CommonAction from "../common/CommonAction";
import { WSAETIMEDOUT } from "constants";

const propsTypes = {

}

const defultProps ={

}


 class FoodList extends Component{
    constructor(props){
        super(props)
        this.state = {
            MyFreezer : []
            ,selectedFreezer : ''
        }
        
        this.getUserEmail = this.getUserEmail.bind(this);
        this.lockClick = this.lockClick.bind(this);
        this.unlockClick = this.unlockClick.bind(this);
        this.getMyFreezer = this.getMyFreezer.bind(this);

        // redux props 에 셋팅 
        this.props.getMyFreezer(this.getMyFreezer.bind(this));
    }
    
    lockClick (){
        // 클릭 방지 
        console.log('lockClick');
    }

    unlockClick(){
        console.log('unlockClick');
    }

    /*  redux props 에 셋팅되어있으니 외부에서 this.props.getMyFreeze 실행 바람 */
    getMyFreezer(freezerKey){
        // var _url = "/src/dev/scripts/sampledata.js"
        // $.ajax({
        //     url: _url
        // , type: "GET"
        // , async: false
        // , dataType: "text"
        // , beforeSend: this.lockClick
        // , success: function (data) { 
        //     var _list = JSON.parse(data)
        //     var _myFreezer = _list.MyFreezers.filter((r) => r.MainYn === "Y" )[0]
            
        //     if(_myFreezer != undefined)
        //     {
        //         this.setState(prevState => ({
        //             MyFreezer :{
        //                 ..._myFreezer, 
        //                 MySections : _myFreezer.MySections 
        //             }
        //         }), function(){
        //         })
        //     }
        // }.bind(this)
        // , complete : this.unlockClick
         
        // });

        // 임시 작업해야됨
        // 작업 내용 -  db를 확인 #$모바일에 몽고 db데이터가 있는지 있으면 , 몽고 db에서 가져오기 , 아닐시 웹 스토리지 사용하기 

        try{
            // 웹뷰기준에서 retrieveFreezerData
            window.webViewBridge.send('retrieveFreezerData' , null , function (){ } , function (){ });
        }
        catch(e){

        }

        var db = new freezer.createlocalFreezerDB();
        var mainfreezer = {};

        if (freezerKey == undefined){
            mainfreezer = db.getMainFreezer();

            if(mainfreezer == undefined){
                db.insertFreezer({FreezerKey : "F001", FreezerName : "울집냉장고", MainYn : "Y" , RegDate : new Date().convertFormatString('yyyy년 MM월 dd일')});
                db.insertSection("F001", { SectionKey: "S0001", SectionName: "신선칸(샘플)", RegDate: new Date().convertFormatString('yyyy년 MM월 dd일') })
                db.insertMyFood("S0001", {
                    "FoodKey": 1,
                    "FoodCD": "100210000200100001",
                    "FoodCDName": "달걀,생것",
                    "FoodName": "달걀",
                    "FoodGrp": "",
                    "InputDate": new Date(new Date().setDate(1)).convertFormatString('yyyy년 MM월 dd일') ,
                    "ExpiredDate": new Date(new Date().setDate(41)).convertFormatString('yyyy년 MM월 dd일') ,
                    "FoodDetail": "",
                    "Memo": "유통기한짧음",
                    "BasketMemo": "",
                    "BasketYN": "N",
                    "MasterCode": "FM010"
                })

                db.insertMyFood("S0001", {
                    "FoodKey": 2,
                    "FoodCD": "100213000500100001",
                    "FoodCDName": "우유",
                    "FoodName": "우유",
                    "FoodGrp": "",
                    "InputDate": new Date(new Date().setDate(15)).convertFormatString('yyyy년 MM월 dd일') ,
                    "ExpiredDate": new Date(new Date().setDate(31)).convertFormatString('yyyy년 MM월 dd일') ,
                    "FoodDetail": "",
                    "Memo": "냉장보관",
                    "BasketMemo": "",
                    "BasketYN": "N",
                    "MasterCode": "FM013"
                })

                db.insertSection("F001", { SectionKey: "S0002", SectionName: "냉동칸(샘플)", RegDate: new Date().convertFormatString('yyyy년 MM월 dd일') })
                db.insertMyFood("S0002", {
                    "FoodKey": 3,
                    "FoodCD": "330301007400000002",
                    "FoodCDName": "만두,전통우리만두",
                    "FoodName": "만두",
                    "FoodGrp": "",
                    "InputDate": new Date().convertFormatString('yyyy년 MM월 dd일') ,
                    "ExpiredDate": new Date(new Date().setDate(32)).convertFormatString('yyyy년 MM월 dd일') ,
                    "FoodDetail": "",
                    "Memo": "비비고",
                    "BasketMemo": "",
                    "BasketYN": "N",
                    "MasterCode": "FM017"
                })
                mainfreezer = db.getMainFreezer();
            }
        }
        else{
            mainfreezer = db.getFreezer(freezerKey);
        }
        
        this.setState({
            MyFreezer : mainfreezer
        })

    }

    getUserEmail(){
        //userEmail에 값이 있는 경우
        if(this.props.userEmail) return;

        let _url = "api/MyPage";
        $.ajax({
            url: _url
            , contentType: 'application/json'
            , type: "GET"
            , dataType: "json"
            , error: function(data){
                if(data){
                    if(data.responseJSON.msg == "unknownUser"){
                        alert("사용자 정보를 알수 없습니다. 재로그인이 필요합니다.");
                    }
                    location.href = "/login";
                }
            }
            , success: function (data) { 
                if(data){
                    this.props.setUserEmail(data.Email);           
                }
            }.bind(this)         
        });
    }

    initSet(){
        this.getMyFreezer();
   
        this.getUserEmail();
    }

    componentDidMount(){
        // 오픈 상태 유지 하기위한 방법
        // window.history.replaceState(_extends({}, history.state, {
        //     state: this.state.MyFood
        // }), 'addFood', location.pathname);
        this.initSet();
        
        try{
            setTimeout(() => {
                if(window.webViewBridge != undefined){

                    // 해당 페이지 일때만 실행
                    if(location.pathname == "/"){
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
            }, 500);
        }
        catch(er){
            alert(er);
        }

    }

    componentWillUnmount(){
    }
    
    render(){
        return (
            
            <div className="foodlist-container" data-paging-direction="left">   
                <div className="listheader-wrapper">
                    <div className="listheader-left">
                    </div>
                    <div className="listheader-title">
                        {/* <i className="title" onClick={()=> { localStorage.clear()}}></i> */}
                        <i className="title"></i>
                    </div>
                    <div className="listheader-right">
                        <a className="right-menu" onClick={() =>{
                            this.props.toggleRightMenu()
                            window.webViewBridge.send('handleFooterVisible' , 'Y' , function (){ } , function (){ });
                        }}></a>
                    </div>
                </div>
                <NoticeSwiper></NoticeSwiper>
                {/* 
                    redux mapStateToProps, mapDispatchToProps 연결전 
                    <RightMenuMyInfo toggle_right_menu_yn={this.props.store.getState().common.toggle_right_menu_yn};/> */}
                <RightMenuMyInfo toggle_right_menu_yn={this.props.toggle_right_menu_yn} userEmail={this.props.userEmail}/>
                <MySections MySections={this.state.MyFreezer.MySections == undefined ? [] : this.state.MyFreezer.MySections } />
                <FoodSwiper MySections={this.state.MyFreezer.MySections == undefined ? [] : this.state.MyFreezer.MySections }/>
                <CommonAction/>
                <i className="layermask" onClick={this.props.closeRightMenu} ></i>
               

            </div>
      );
    }
}

// export 하기전 함수를 설정
// redux state 안에 있는걸 이 컴포넌트 props 로 맵핑 해주는거
const mapStateToProps = (state) => {
    // state 는 component state랑은 틀림 , redux state를 칭함
    return {
        toggle_right_menu_yn : state.common.toggle_right_menu_yn,
        userEmail : state.foodlist.userEmail,
    };
}

// redux dispatch 함수
const mapDispatchToProps = (dispatch) => {
    return {
        toggleRightMenu: () => {dispatch(actions.toggleRightMenu()) },
        closeRightMenu: () => {dispatch(actions.closeRightMenu()) },
        getMyFreezer: (func) => {dispatch(actionsFoodlist.getMyFreezer(func))},
        setUserEmail: (email) => {dispatch(actionsFoodlist.setUserEmail(email))}
    };
}

// redux 연결 후 
export default connect(mapStateToProps , mapDispatchToProps)(FoodList);


