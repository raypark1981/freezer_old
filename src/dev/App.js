import React , {Component} from 'react';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FoodList, AddFood, AddDetail, AddMemo, SearchFood, EditFreezer, SearchRecipe, Recipe, MyPage, Basket, Notice} from './components';

import * as actions from '../dev/actions/common';

class App extends Component{

    constructor(props){
        super(props);
        
        window.onerror = function(message, source, lineno, colno, error){
            alert( "위치 : " + source + " \r\n메세지 :  "  +message);
            location.href = location.protocol + "//" + location.host;
        }

        // 전역으로 쓸 함수 바인딩
        if(window._appBridge == undefined){
            window._appBridge = {
                //함수이름 : 함수
                toggleRightMenu : this.toggleRightMenu.bind(this) , 
            }
        }
    }

    returnIsLoaded(currentPath , nowComponent){
        if(currentPath == nowComponent)
            return true;
        else
            return false;
    }

    toggleRightMenu(_delegate){
        this.props.toggleRightMenu();
    }

    componentDidMount(){

        // console.log('trying to sync Data at entry')
        // try {
        //     setTimeout(function () {
        //         if (window.webViewBridge != undefined) {
        //             var db = new freezer.createlocalFreezerDB();
        //             var myfreezer = db.getSyncData();
        //             var freezerData = {
        //                 MyFreezer :myfreezer 
        //             }

        //             window.webViewBridge.send('syncDataFromWebview' , freezerData , function (){ } , function (){ });
        //         } else {
        //             console.log('window.webViewBridge 없어');
        //         }
        //     }, 500);
        // } catch (er) {
        //     alert(er);
        // }
       
    }

    render(){
        return (
            <Router>
                <Route
                    render={({ location }) => (
                        <TransitionGroup  ref={ref => {
                            // console.log('changed url');
                            // alert('changed url');
                            // try{
                            //     window.webViewBridge.send('handleCurrentPath' , location.pathname , function (){ alert('성공')} , function (){ alert('fail')});
                            // }
                            // catch(er){
                            //     alert(er);
                            // }

                          }}>
                            <CSSTransition key={location.key} classNames="example" timeout={300}>
                                <Switch location={location}>
                                    <Route exact path="/" component={FoodList}/>
                                    <Route exact path="/AddFood/:food_key?" component={AddFood}/>
                                    <Route exact path="/AddDetail/:food_key?" component={AddDetail}/>
                                    <Route exact path="/AddMemo/:food_key?" component={AddMemo}/>
                                    <Route exact path="/SearchFood/:food_key?" component={SearchFood}/>
                                    <Route exact path="/EditFreezer" component={EditFreezer}/>
                                    <Route exact path="/SearchRecipe" component={SearchRecipe}/>
                                    <Route exact path="/Recipe/:rcp_seq" component={Recipe}/>
                                    <Route exact path="/MyPage" component={MyPage}/>
                                    <Route exact path="/Basket" component={Basket}/>
                                    <Route exact path="/Notice" component={Notice}/>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )}
                />
            </Router>
        )
    }

}

// export 하기전 함수를 설정
// redux state 안에 있는걸 이 컴포넌트 props 로 맵핑 해주는거
const mapStateToProps = (state) => {
    // state 는 component state랑은 틀림 , redux state를 칭함
    return {
        currentPath : state.common.currentPath,
    };
}

// redux dispatch 함수
const mapDispatchToProps = (dispatch) => {
    return {
        toggleRightMenu: () => {dispatch(actions.toggleRightMenu()) },
    };
}


export default connect(mapStateToProps , mapDispatchToProps)(App);

