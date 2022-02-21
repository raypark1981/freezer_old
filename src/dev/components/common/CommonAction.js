import React from 'react';
import * as actionsFoodlist from '../../../dev/actions/foodlist';
import  '../../../../css/components/action.css';

import { connect } from 'react-redux';
class CommonAction extends React.Component{
    constructor(props){
        super(props)

        //값을 보내지 않는 경우, 작동 하지 않음 
        // let _obj = {
        //     class: recipeYN ? "recipe" : "",
        //     message: recipeYN ? "레시피 담기" : ""
        //     result: recipeYN ? "성공!" : "실패"                
        // }

        this.state = {
            openToggle: false,
            actoinObj : {
                class : "",
                message : "",
                result : ""
            }
        }

        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
              // redux props 에 셋팅 
        this.props.setCommonActinoObj(this.setCommonActinoObj.bind(this))
    }

    handleAnimationEnd(){
        this.setState(prevState => ({
            ...prevState,
            openToggle: false
        }))
    }

    setCommonActinoObj(nextProps){
        //값이 없는 경우 return
        if(!nextProps.class) return;
        
        this.setState({
            openToggle: true,
            actoinObj : {
                class: nextProps.class,
                message: nextProps.message,
                result: nextProps.result
            }
        })
    }

    render(){
        return(
            <div className={`action-container ${this.state.openToggle ? "open" : ""}`} onAnimationEnd={this.handleAnimationEnd}>
            <div className="action-wapper">
                <i className={this.state.actoinObj.class}></i>
                <p>{this.state.actoinObj.message}</p>
                <p>{this.state.actoinObj.result}</p>
            </div>
        </div>
        );
    }
}

// redux dispatch 함수
const mapDispatchToProps = (dispatch) => {
    return {
        setCommonActinoObj: (func) => {dispatch(actionsFoodlist.setCommonActinoObj(func))},
    };
}

// redux 연결 후 
export default connect(null , mapDispatchToProps)(CommonAction);
