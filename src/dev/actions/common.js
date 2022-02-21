// action 생성자 폴더 action은 freezer-react-read.me txt 4. Action 구조 및 생성 참조,

// import { TOGGLE_RIGHT_MENU , CLOSE_RIGHT_MENU} from './ActionTypes'; (하동)
import * as types from './ActionTypes';

export function toggleRightMenu() {
    return { type : types.TOGGLE_RIGHT_MENU};
}

export function closeRightMenu() {
    return { type : types.CLOSE_RIGHT_MENU};
}

export function openNcloseEditMenu(condition){
    return {
        type : types.OPENCLOSE_EDITMENU,
        condition : condition,
    };
}

export function setEditMenuValue(value){
    return {
        type: types.EDITMENU_VALUE,
        value : value
    }
}

export function selectSections(selectedSections , toggleYN){
    return {
        type : types.SELECT_SECTIONS, 
        selectedSections , 
        toggleYN 
    }
}

