// 샘플 reducer 입니다. 
import * as types from '../actions/ActionTypes'

const initialState = {
    color : [ 255,255,255]
}

export default function ui (state = initialState , action){
    switch(action.type){
        case types.SET_COLOR: 
            return { 
                color :  action.color
            }
        default : 
            return state;     
    }
}
