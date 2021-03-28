import {
    CHANGE_THEME,
    START_GAME,
    STOP_GAME
} from '../actions/types';

const initialState = {
    boardSize: 15,
    darkTheme: false,
    startGame: false,
    gameSpeed: 150
};

export default function(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case CHANGE_THEME:
            localStorage.setItem('darkTheme', !state.darkTheme)
            return {
                ...state,
                darkTheme: !state.darkTheme
            }
        case START_GAME:
            return {
                ...state,
                startGame: true,
                boardSize: payload.boardS,
                gameSpeed: payload.gameS
            }
        case STOP_GAME:
            return {
                ...state,
                startGame: false
            }

        default:
            return state;
    }
}