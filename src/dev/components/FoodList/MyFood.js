import React ,{ Component , PropTypes } from "react";

import * as actionsFoodlist from '../../../dev/actions/foodlist';
import { connect } from 'react-redux';
import commonS from "../../scripts/common";

class MyFood extends Component{

    constructor(props){
        super(props)

        this.toggleRecipe = this.toggleRecipe.bind(this);
        this.toggleBasket = this.toggleBasket.bind(this);
    }
    openFoodSwiper(e){
        if(e.target.classList.contains('basket') || e.target.classList.contains('recipe')) return ;

        var _value = {
            openYN : true , 
            selectedFoodKey : this.props.MyFood.FoodKey
        }

        
        this.props.openFoodSwiper(_value)
    }

    toggleBasket(e){
        var basketYN = !e.target.classList.contains('on');
        var db = new freezer.createlocalFreezerDB();
        var _myFood = db.getMyFood(this.props.MyFood.FoodKey);

        if(_myFood.FoodKey > 0){
            db.updateMyFood({ ..._myFood , BasketYN : basketYN ? 'Y' : 'N'} , this.props.getMyFreezer)
        }

        let _obj = {
            class: basketYN ? "basket" : "",
            message: basketYN ?  "장바구니 담기": "",
            result: "성공!"
        }

        this.props.setCommonActinoObj(_obj);
        
    }

    toggleRecipe(e){
        var recipeYN = !e.target.classList.contains('on');
        var db = new freezer.createlocalFreezerDB();
        var _myFood = db.getMyFood(this.props.MyFood.FoodKey);

        if(_myFood.FoodKey > 0){
            db.updateMyFood({ ..._myFood , RecipeYN : recipeYN ? 'Y' : 'N'} , this.props.getMyFreezer)
        }

        let _obj = {
            class: recipeYN ? "recipe" : "",
            message: recipeYN ? "레시피 담기" : "",
            result: "성공!"
        }
        this.props.setCommonActinoObj(_obj);
        
    }

    render(){
        return ( 
        <li onClick={this.openFoodSwiper.bind(this)}>
            <i className={`foodgrp ${this.props.MyFood.MasterCode}`} data-food-grp={this.props.MyFood.FoodGrp}></i>
            <div className="food-wrapper">
                <div className="foodinfo-wrapper">
                    <p className="food-name">{this.props.MyFood.FoodName}</p><span className="nutrition"></span>
                    {this.props.MyFood.FoodDetail == "" ? "" : (<span className="detail">{this.props.MyFood.FoodDetail}</span>)}
                    <span className="memo">{this.props.MyFood.Memo}</span>
                </div>
                <div className="btn-wrapper vertical-middle">
                    <button className={`recipe ${this.props.MyFood.RecipeYN == "Y" ? 'on' : '' }`} onClick={this.toggleRecipe}></button>
                    <button className={`basket ${this.props.MyFood.BasketYN == "Y" ? 'on' : '' }`} onClick={this.toggleBasket}></button>
                    <button className="date" data-count={commonS.dateDiff(new Date() , this.props.MyFood.InputDate.stringToDate('yyyy년 MM월 dd일')) } ></button>
                    <button className={`warning ${commonS.dateDiff(new Date() , this.props.MyFood.ExpiredDate.stringToDate('yyyy년 MM월 dd일'))  > 0 ?  'on' : 'off' }`}></button>
                </div>
            </div>
        </li>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        getMyFreezer : state.foodlist.getMyFreezer,
        setCommonActinoObj : state.foodlist.setCommonActinoObj
    }
}


// redux dispatch 함수
const mapDispatchToProps = (dispatch) => {
    return {
        openFoodSwiper: (value) => { dispatch(actionsFoodlist.openFoodSwiper(value)) },
    };
}

// redux 연결 후 
export default connect(mapStateToProps , mapDispatchToProps)(MyFood);
