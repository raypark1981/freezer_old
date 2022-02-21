import React , { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import * as foodlistAction from '../../actions/foodlist'
import commonS from "../../scripts/common";

import '../../../../css/components/FoodList.css'

import '../../../../Scripts/swiper-3.4.1.min.js'
import '../../../../Scripts/jquery-1.10.2.min.js'

import Swiper from 'react-id-swiper';
import '../../../../node_modules/react-id-swiper/src/styles/css/swiper.css';


const swipeParams = {
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: false,
}


class FoodSwiper extends Component{
    constructor(props){
        super(props)

        this.state ={
            MySections : []
        }

        this.toggleBasket = this.toggleBasket.bind(this);
        this.toggleRecipe = this.toggleRecipe.bind(this);
    }

    componentWillReceiveProps (nextProps){
        this.setState({
            MySections : nextProps.MySections
        } , function(){

        })
    }

    componentDidMount(){

    }

    openFoodSwiper(e){

        if(e.target.classList.contains('basket') || e.target.classList.contains('recipe'))
        return ;

        switch(e.target.className){
            case 'edit-button':
                break;
            default:
                break;
        }

        this.props.openFoodSwiper({
            openYN : false , 
            selectedFoodKey : this.props.selectedFoodKey
        });
    }

    
    toggleBasket(e){
        
        var basketYN = !e.target.classList.contains('on');
        var db = new freezer.createlocalFreezerDB();
        var _myFood = db.getMyFood(this.props.selectedFoodKey);

        if(_myFood.FoodKey > 0){
            db.updateMyFood({ ..._myFood , BasketYN : basketYN ? 'Y' : 'N'} , this.props.getMyFreezer)
        }
    }

    toggleRecipe(e){
        var recipeYN = !e.target.classList.contains('on');
        var db = new freezer.createlocalFreezerDB();
        var _myFood = db.getMyFood(this.props.selectedFoodKey);

        if(_myFood.FoodKey > 0){
            db.updateMyFood({ ..._myFood , RecipeYN : recipeYN ? 'Y' : 'N'} , this.props.getMyFreezer)
        }
    }
    
    initializeAddFood(foodkey){
        var db = new freezer.createlocalFreezerDB();
        var _myFood = db.getMyFood(foodkey);
        db.setAddFood(_myFood);
    }

    render(){
        
        var gethering = [];
        
        this.state.MySections.map((myfoods) => {
            gethering = gethering.concat(myfoods.MyFoods)
        });

        return (
            <div  className={`swipe-container ${this.props.showFoodSwiperYN ? 'visible' : ''}`}>
            <div className="swipelayer-wrapper" onClick={this.openFoodSwiper.bind(this)}>
                <div className="swipe-wrapper">
                    <ul className="swipe-wrapper-list">
                        <Swiper {...swipeParams} activeSlideKey={this.props.selectedFoodKey.toString()} shouldSwiperUpdate>
                        {
                            gethering.map((food, i) => (
                                <li key={food.FoodKey} className="swipe-wrap-list-item">
                                    <div className="wrapper">
                                        <div className="btn-wrap">
                                            <button className={`recipe ${food.RecipeYN == "Y" ? 'on' : '' }` } onClick={this.toggleRecipe}></button>
                                            <button className={`basket ${food.BasketYN == "Y" ? 'on' : '' }` } onClick={this.toggleBasket}></button>
                                            <i className={`warning ${commonS.dateDiff(new Date() , food.ExpiredDate.stringToDate('yyyy년 MM월 dd일'))  > 0 ?  "on" : '' }`}></i>
                                        </div>
                                        <div className="foodinfo-wrap">
                                            <input type='hidden' className="food-cd" value={food.FoodCD} />
                                            <input type='hidden' className="food-key" value={food.FoodKey} />
                                            <i className={`foodgrp ${food.MasterCode}`} data-foodgrp={food.FoodGrp}></i>
                                            <p className="food-name">{food.FoodName}</p>
                                            {food.FoodDetail == "" ? "" : (<span className="detail">{food.FoodDetail}</span>)}
                                            <span className="memo">{food.Memo}</span>
                                        </div>
                                        <div className="block">
                                            <i className="clock"></i>
                                            <div className="dateinfo-wrap">
                                                <p>보관일시</p><span className="date input-date">{food.InputDate}</span>
                                                <p>소비기한</p><span className="date expired-date">{food.ExpiredDate}</span>
                                            </div>
                                        </div>
                                        <div className="nutrition">
                                            <div className="title-wrap"><span className="title">열량</span><span className="kcal">52kcl/100g</span></div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>탄수화물</th>
                                                        <th>딘백질</th>
                                                        <th className="last">지방</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>3kcal</td>
                                                        <td>5.2kcal</td>
                                                        <td className="last">2.53kcal</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="edit-wrapper">
                                            <Link to={`AddFood/${food.FoodKey}`} onClick={this.initializeAddFood.bind(null , food.FoodKey)} className="edit-button" type="button"></Link>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                        </Swiper>
                    </ul>
                </div>
            </div>
        </div>
        );
    }   
}


// export 하기전 함수를 설정
// redux state 안에 있는걸 이 컴포넌트 props 로 맵핑 해주는거
const mapStateToProps = (state) => {
    // state 는 component state랑은 틀림 , redux state를 칭함
    return {
        showFoodSwiperYN : state.foodlist.showFoodSwiperYN,
        selectedFoodKey : state.foodlist.selectedFoodKey,
        getMyFreezer : state.foodlist.getMyFreezer
    };
}

const mapDispathToProps = (dispatch) =>{
    return {
        openFoodSwiper : (value) => { dispatch(foodlistAction.openFoodSwiper(value))},
    }
}


// redux 연결 후 
export default connect(mapStateToProps , mapDispathToProps)(FoodSwiper);