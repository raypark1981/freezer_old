import * as types from '../actions/ActionTypes';

// reducer 초기상태 정의 

const initialState = {
    toggle_right_menu_yn : false,
    currentPath : 'FoodList',
    openNclose_editMenu : false,
    selectedSections :[],
    editMenuValue : {
        title : "",
        editList: []
    },
}

// default argument  state = initailState
export default function common( state = initialState , action ){
    switch(action.type){
        case types.TOGGLE_RIGHT_MENU: 
            return { ...state,  toggle_right_menu_yn : !state.toggle_right_menu_yn }
        case types.CLOSE_RIGHT_MENU :

            // if(window.webViewBridge != undefined){
            //      window.webViewBridge.send('handleFooterVisible' , 'N' , function (){ } , function (){ });
            // }
            return { 
                ...state
                , toggle_right_menu_yn : false
            }
        case types.PASS_PATH : 
            // return { ...state, currentPath : action.currentPath , toggle_right_menu_yn : false }
            return { 
                ...state
                , currentPath : action.currentPath 
                , toggle_right_menu_yn : false
            }

        case types.OPENCLOSE_EDITMENU : 
            return{
                ...state
                , openNclose_editMenu : action.condition
            }
        
        case types.EDITMENU_VALUE :
            return{
                ...state
                ,editMenuValue: action.value 
            }
        case types.SELECT_SECTIONS : 
            if(action.selectedSections != undefined){
                
                if(action.toggleYN){
                    return { ...state , 
                        selectedSections : [ action.selectedSections , ...state.selectedSections ]}
                }
                else{
                    return {
                        ...state , 
                        selectedSections : [ ...state.selectedSections.filter( s => { return s != action.selectedSections ;}) ]
                    }
                }

                
            }else
            return state
        default : return state;     
    }
}
