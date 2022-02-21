import * as types from '../actions/ActionTypes'

const initialState = {
    selectedSection :''
}

export default function addFood (state = initialState , action){
  
    switch(action.type){
        case 'SELECT_SECTION' : 
            if(action.selectedSection != undefined){
                return { ...state , 
                    selectedSection : action.selectedSection}
            }else
            return state
        default :
            return state;
        break;
    }
}