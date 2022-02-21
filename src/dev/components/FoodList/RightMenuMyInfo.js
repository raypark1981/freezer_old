import React from 'react';
import { Link } from 'react-router-dom';
import  '../../../../css/components/rightMenu.css';

import * as commonActions from '../../actions/common.js'
import { connect } from 'react-redux';
import commonS from "../../scripts/common";

const propTypes = {
  
};

const defaultProps = {
    
};

class RightMenuMyInfo extends React.Component{
    constructor(props){
        super(props)

        this.state={
            userEmail: "",
            warningCount: 0,
            recipeCount: 0,
            basketCount: 0,
        }

        this.countFreezerInfo = this.countFreezerInfo.bind(this);
        this.handleCloseRightMenu = this.handleCloseRightMenu.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState(prevState => ({
            ...prevState,
            userEmail: nextProps.userEmail
        }))

        //right메뉴가 열릴떄!
        if(nextProps.toggle_right_menu_yn)
            this.countFreezerInfo();
    }

    countFreezerInfo(){
        let db = new freezer.createlocalFreezerDB();
        
        //우선, 메인냉장고로! 
        let _freezer = {}; 
        _freezer = db.getMainFreezer();

        let _warningCount = 0;
        let _recipeCount = 0;
        let _basketCount = 0;

        _freezer.MySections.map(s => {
            s.MyFoods.map(f => {
                if(f.BasketYN && f.BasketYN == "Y")
                    _basketCount += 1;
                if(f.RecipeYN && f.RecipeYN == "Y")
                    _recipeCount += 1;
                if(commonS.dateDiff(new Date() , f.ExpiredDate.stringToDate('yyyy년 MM월 dd일'))  > 0)
                    _warningCount += 1;
            })
        })

        this.setState(prevState => ({
            ...prevState,
            warningCount: _warningCount,
            recipeCount: _recipeCount,
            basketCount: _basketCount,
        }))
    }

    handleCloseRightMenu(){
        this.props.closeRightMenu()
        window.webViewBridge.send('handleFooterVisible' , 'N' , function (){ } , function (){ });
    }

    render(){
        return (
            <div className={`right-menu-container ${this.props.toggle_right_menu_yn == true ? 'visible' : ''}`}>
                <div className="close-wrap"><button className="close-button" onClick={this.handleCloseRightMenu}></button></div>
                <div className="account-wrap">
                    <img />
                    <p>{this.state.userEmail}</p>
                </div>
                <div className="freezerinfo-wrap">
                    <div className="icon-wrap">
                        <i className="warning on"></i>
                        <i className="recipe"></i>
                        <i className="basket"></i>
                    </div>
                    <div className="info-wrap">
                        <span>{this.state.warningCount == 0 ? '-' : this.state.warningCount}</span>
                        <span>{this.state.recipeCount == 0 ? '-' : this.state.recipeCount}</span>
                        <span>{this.state.basketCount == 0 ? '-' : this.state.basketCount}</span>
                    </div>
                </div>
                <div className="menu-wrap">
                    <ul>
                        <li className="mn01">
                            <Link to="/MyPage" onClick={this.props.closeRightMenu}><span>정보수정</span></Link>
                        </li>
                        <li className="mn02">
                            <Link to="/EditFreezer" onClick={this.props.closeRightMenu}><span>내 냉장고</span></Link>
                        </li>
                        <li className="mn03 right-none">
                            <Link to="/Basket" onClick={this.props.closeRightMenu}><span>장바구니</span></Link>
                        </li>
                        <li className="mn04 bottom-none">
                            <Link to="/SearchRecipe" onClick={this.props.closeRightMenu}><span>추천레세피</span></Link>
                        </li>
                        <li className="mn05 bottom-none">
                            <Link to="/Notice" onClick={this.props.closeRightMenu}><span>공지사항</span></Link>
                        </li>
                        <li className="mn06 bottom-none right-none"><span>1:1 문의</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };
}

RightMenuMyInfo.propTypes = propTypes;
RightMenuMyInfo.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        getMyFreezer : state.foodlist.getMyFreezer
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        closeRightMenu: () => { dispatch(commonActions.closeRightMenu()) },
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(RightMenuMyInfo);