import * as types from '../actions/ActionTypes';


const initialState = {
    showFoodSwiperYN : false,
    selectedFoodKey : '',
    getMyFreezer : () =>{},
    userEmail : '',
    setCommonActinoObj :()=> {}
    // actoinObj: {
    //     class: "",
    //     message: "",
    //     result: ""
    // }

} 

// default argument  state = initailState
export default function foodlist( state = initialState , action ){
    
    switch(action.type){
        case types.OPEN_FOOD_SWIPER: 
            return { ...state,  showFoodSwiperYN : action.showFoodSwiperYN , selectedFoodKey : action.selectedFoodKey}
      
        case types.GET_MYFREEZER : 
            if(typeof action.getMyFreezer == 'function'){
                return { ...state,  getMyFreezer : action.getMyFreezer}
            }
            else
            return state;
        case types.USER_EMAIL :
            return{
                ...state
                ,userEmail: action.email 
            }
        case types.ACTION_OBJ :
            if(typeof action.setCommonActinoObj == 'function'){
                return { ...state,  setCommonActinoObj : action.setCommonActinoObj}
            }
            else
            return state;
        default : return state;     
    }
}
