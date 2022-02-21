import React from 'react';
import { Link } from 'react-router-dom';

import '../../../../css/components/header.css'

class CommonHeader extends React.Component{
    constructor(props){
        super(props)

        /* 
            leftActionEvent , rightActionEvent 
            case : typeof 'historyback' == "string"
            case : typeof function 
            
            leftAction , rightAction 
                Action 이름
        */

        this.state= {
            headerValues : {
                headTitle : this.props.headerValues.headTitle , 
                leftAction : this.props.headerValues.leftAction , 
                leftActionEvent : this.props.headerValues.leftActionEvent == undefined ? null : this.props.headerValues.leftActionEvent , 
                rightAction : this.props.headerValues.rightAction  ,
                rightActionEvent : this.props.headerValues.rightActionEvent == undefined ? null : this.props.headerValues.rightActionEvent, 
                leftClass : this.props.headerValues.leftClass , 
                rightClass : this.props.headerValues.rightClass
            }
        }

        this.callbackLeftAction = this.callbackLeftAction.bind(this);
        this.callbackRightAction = this.callbackRightAction.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            headerValues : nextProps.headerValues
        })
    }

    callbackLeftAction(e){
        if( typeof this.props.headerValues.leftActionEvent == 'function'){
            var returnValue = this.props.headerValues.leftActionEvent();
            if(returnValue){
                //true 면 Link To 실행
            }
            else{
                // Link To Block
                e.preventDefault();
            }
        }
    }

    callbackRightAction(e){
        if( typeof this.props.headerValues.rightActionEvent == 'function'){
            var returnValue = this.props.headerValues.rightActionEvent();
            if(returnValue){
                //true 면 Link To 실행
            }
            else{
                // Link To Block
                e.preventDefault();
            }
        }
    }

    render(){
        if(this.props.headerValues){
            return(
                <div className="header-wrapper">
                    <div className="header-left">
                        <Link onClick={this.callbackLeftAction} to={`/${this.props.headerValues.leftAction}`} className={`left ${this.props.headerValues.leftClass}`}></Link>
                    </div>
                    <div className="header-title">
                        <span>{this.props.headerValues.headTitle}</span>
                    </div>
                    <div className="header-right">
                        <Link onClick={this.callbackRightAction} to={`/${this.props.headerValues.rightAction}`} className={`right ${this.props.headerValues.rightClass}`}></Link>
                    </div>
                </div>
            );
        }
        else{
            return "";
        }
    };
}
export default CommonHeader;