import React from 'react';
import '../../../../css/components/myPage.css';
import CommonHeader from '../common/CommonHeader'
import CommonEditMenu from '../common/CommonEditMenu'

import Switch, { State } from 'react-switchable';
import 'react-switchable/dist/main.css'



class MyPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            headerValues: {
                headTitle : '회원 정보',
                leftAction : '',
                rightAction : '',
                leftClass : 'close',
                rightClass : 'save'
            }, 

            userInfo:{
                email: "",
                userName: "",
                userGrade: ""
            },

            freezerCnt: 0,
            alarmYN: false,
            loginKeepYN: false
        }

        this.handleAlarmChange = this.handleAlarmChange.bind(this);
        this.handlekeepLoginChange = this.handlekeepLoginChange.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.countFreezer = this.countFreezer.bind(this);
        this.logout = this.logout.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    handleAlarmChange(newVal){
        this.setState(prevState => ({
            ...prevState.state,
            alarmYN: newVal == "yes" ? true : false
        }))
    }

    handlekeepLoginChange(newVal){
        this.setState(prevState => ({
            ...prevState.state,
            loginKeepYN: newVal == "yes" ? true : false
        }))
    }

    getUserInfo(){
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
                    let _userInfo= {
                        email: data.Email,
                        userName: data.UserName,
                        loginKeepYN: data.LoginKeepYN,
                        alarmYN: data.AlarmYN,
                        userGrade: data.UserGrade == "GENR" ? "일반" : "프리미엄"
                    }

                    this.setState(prevState => ({
                        ...prevState.state,
                        userInfo: {
                            email: _userInfo.email,
                            userName: _userInfo.userName,
                            userGrade: _userInfo.userGrade
                        }
                    }),function(){
                        //switch 이벤트 발생
                        this.handleSwitch(_userInfo.alarmYN, _userInfo.loginKeepYN);
                    });                   
                }
            }.bind(this)         
        });
    }

    handleSwitch(alarmYN, loginKeepY){
        let _alarmYN = alarmYN == "Y" ? "yes" : "no";
        let _loginKeepYN = loginKeepY == "Y" ? "yes" : "no";

        document.querySelector("#alarm").querySelector("input[value=" + _alarmYN + "]").click();
        document.querySelector("#keepLogin").querySelector("input[value=" + _loginKeepYN + "]").click();
    }

    countFreezer(){
        //로컬 스토리지에서 냉장고 갯수 확인 
        this.setState(prevState => ({
            ...prevState.state,
            freezerCnt: 1
        }))
    }

    componentDidMount(){
        //userInfo get
        this.getUserInfo();

        //보유 냉장고 확인
        this.countFreezer();
    }

    logout(){
        let _url = "Login/LogOut";
        
        $.ajax({
            url: _url
            , contentType: 'application/json'
            , type: "GET"
            , dataType: "json"   
            , success: function (data) { 
                if(data){
                    if(data.logout != "ok"){
                        alert("정상적인 로그아웃이 아닙니다.");
                    }
                    location.href = "/login";
                }
            }.bind(this)          
        });
    }

    render(){
        return(
            <div className="myPage-container"  data-paging-direction="right">
                <CommonHeader headerValues={this.state.headerValues}/>
                <p className="email">{this.state.userInfo.email}</p>
                <div className="myPage-wrapper">
                    <div className="block">
                        <i className="user-name">
                        </i><span className="title">이름</span><span className="value">{this.state.userInfo.userName}</span>
                    </div>
                    <div className="block">
                        <i className="freezer-count"></i>
                        <span className="title">보유냉장고</span><span className="value">{this.state.freezerCnt}</span>
                    </div>
                    <div className="block">
                        <i className="user-grade"></i>
                        <span className="title">회원등급</span><span className="value">{this.state.userInfo.userGrade}</span>
                    </div>
                    <div className="block">
                        <i className="alarm"></i><span className="title">알림받기</span>
                        <div className="switch-wapper vertical-middle" id="alarm">
                            <Switch onValueChange={this.handleAlarmChange}>
                                <State active={this.state.alarmYN} value='yes'>yes</State>
                                <State active={!this.state.alarmYN} value='no'>no</State>
                            </Switch>
                        </div>
                    </div>
                    <div className="block last">
                        <i className="keep-login"></i><span className="title">로그인유지</span>
                        <div className="switch-wapper vertical-middle" id="keepLogin">
                            <Switch onValueChange={this.handlekeepLoginChange}>
                                <State active={this.state.loginKeepYN} value='yes'>yes</State>
                                <State active={!this.state.loginKeepYN} value='no'>no</State>
                            </Switch>
                        </div>
                    </div>
                </div>
                <div className="logout" onClick={this.logout}>
                    <p>로그아웃</p>
                </div>
            </div>
        );
    }
}

export default MyPage;