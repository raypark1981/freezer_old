import React from 'react';

import CommonHeader from '../common/CommonHeader';
import '../../../../css/components/addDetail.css';

import { connect } from 'react-redux';

const propTypes = {
};

const defaultProps = {
   
};

class AddDetail extends React.Component{
    constructor(props){
        super(props)
      
        this.state = {
            selectedFoodKey : props.match.params.food_key , 
            headerValues :{
                headTitle : '세부사항',
                rightAction : 'AddFood/{0}'.format(props.match.params.food_key) ,
                rightActionEvent : this.saveAddDetail.bind(this), 
                rightClass : 'back-right'
            } 

        }

        this.onClickNum = this.onClickNum.bind(this);
    }

    onClickNum(e){
        var textValue = document.getElementById('txtDetail').innerText;
        var value = e.target.dataset.value;
        switch(value){
            case 'hide' : 
                history.back();
            break;
            case 'back' : 
            var temp = textValue.substring(0 , textValue.length - 1);
            this.setState(prevState => ({
                ...prevState , 
                textValue : temp
            }))
            break;
            case 'space' : 
                textValue = textValue + " ";
                this.setState(prevState => ({
                    ...prevState , 
                    textValue : textValue
                }))
            break;
            default : 
                textValue = textValue + value;
                this.setState(prevState => ({
                    ...prevState , 
                    textValue : textValue
                }))
            break;
        }
    }

    saveAddDetail(){
        var value = document.getElementById('txtDetail').innerText
        if(value != undefined && value != ''){
            var db = new freezer.createlocalFreezerDB();
            var myfood = db.getAddFood();
    
            var _myfood = {
                ...myfood , 
                FoodDetail : value, 
            }
            db.setAddFood(_myfood);
        }

        return true;
    }

    componentDidMount(){
        var db = new freezer.createlocalFreezerDB();
        var _myFood = db.getAddFood();
    
        document.getElementById('txtDetail').value = _myFood.FoodDetail;
        try{
            setTimeout(() => {
                if(window.webViewBridge != undefined){
                    // window.webViewBridge.send('handleCurrentPath' , location.pathname , function (){ } , function (){ });

                      // 해당 페이지 일때만 실행
                    if(location.pathname.toUpperCase().indexOf('ADDDETAIL') > -1){
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
        catch(er){
            alert(er);
        }
    }

    render(){
        return (
            <div className={`add-detail-container`} data-paging-direction="left">
            <CommonHeader headerValues={this.state.headerValues} />
            <div className="add-detail-wrapeer">
                <div className="detail-area">
                    <p id="txtDetail" placeholder="입력하세요!" className="pTxtDetail">{this.state.textValue}<i className="cursor"></i></p>
                </div>
                <div className="keypad-wrapper">
                    <div className="hide-container">
                        <div className="row">
                            <div className="col">
                                <button type="button" className="hide-button" onClick={this.onClickNum} data-value="hide">∨</button>
                            </div>
                        </div>
                    </div>
                    <div className="keyPadcontainer">
                        <div className="num-container">
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="7">7</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="8">8</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="9">9</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="4">4</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="5">5</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="6">6</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="1">1</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="2">2</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="3">3</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="num-button hangle" onClick={this.onClickNum} data-value="space">space</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="0">0</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="num-button" onClick={this.onClickNum} data-value="back">←</button>
                                </div>
                            </div>
                        </div>
                        <div className="unit-container">
                            <div className="row">
                                <div className="col">
                                    <ul>
                                        <li onClick={this.onClickNum} data-value="-">-</li>
                                        <li onClick={this.onClickNum} data-value="/">/</li>
                                        <li onClick={this.onClickNum} data-value="소분">소분</li>
                                        <li onClick={this.onClickNum} data-value="묶음">묶음</li>
                                        <li onClick={this.onClickNum} data-value="봉지">봉지</li>
                                        <li onClick={this.onClickNum} data-value="병">병</li>
                                        <li onClick={this.onClickNum} data-value="Kg">Kg</li>
                                        <li onClick={this.onClickNum} data-value="g">g</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    };
}


export default connect(null , null)(AddDetail);
