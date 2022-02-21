import * as types from '../actions/ActionTypes';

export function selectSection(selectedSection){
    return {
        type : types.SELECT_SECTION, 
        selectedSection 
    }
}