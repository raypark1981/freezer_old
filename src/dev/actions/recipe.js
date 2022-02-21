// action 생성자 폴더 action은 freezer-react-read.me txt 4. Action 구조 및 생성 참조,

// import { TOGGLE_RIGHT_MENU , CLOSE_RIGHT_MENU} from './ActionTypes'; (하동)
import * as types from './ActionTypes';

export function setSearchType(searchTypeObj){
    return { 
        type: types.SEARCH_TYPE,
        searchTypeObj
    };

}