import * as types from './ActionTypes';

export function openFoodSwiper(_value) {
    return {
        type : types.OPEN_FOOD_SWIPER,
        showFoodSwiperYN : _value.openYN , 
        selectedFoodKey : _value.selectedFoodKey
    };
}

export function getMyFreezer(getMyFreezer){
    return {
        type : types.GET_MYFREEZER,
        getMyFreezer 
    }
}

export function setUserEmail(email){
    return {
        type: types.USER_EMAIL,
        email : email
    }
}

export function setCommonActinoObj(func){
    return {
        type: types.ACTION_OBJ,
        setCommonActinoObj : func
    }
}