import {
    CHANGE_THEME
} from '../actions/types';

const initialState = {
    boardSize: 15,
    darkTheme: false
};

export default function(state = initialState, action){
    switch(action.type){
        case CHANGE_THEME:
            return {
                ...state,
                darkTheme: !state.darkTheme
            }
        default:
            return state;
    }
}