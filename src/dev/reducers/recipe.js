import * as types from '../actions/ActionTypes';

// reducer 초기상태 정의 

const initialState = {
    searchTypeObj: {
        type: "ingredient",
        ingredient: [],
        way2: [
                {name: "끓이기", onoff: false},
                {name: "굽기", onoff: false},
                {name: "기타", onoff: false},
                {name: "볶기", onoff: false},
                {name: "찌기", onoff: false},
                {name: "튀기기", onoff: false}
        ],
        pat2: [
                {name: "후식", onoff: false},
                {name: "국&찌개", onoff: false},
                {name: "반찬", onoff: false},
                {name: "밥", onoff: false},
                {name: "일품", onoff: false}
        ]
    }
}

export default function recipe(state = initialState, action){
    switch(action.type){
        case types.SEARCH_TYPE:
            return { 
                ...state, 
                searchTypeObj: action.searchTypeObj
            
            };

        default: return state;

    }

}
