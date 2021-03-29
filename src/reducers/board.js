import {
    CHANGE_THEME,
    START_GAME,
    STOP_GAME
} from '../actions/types';

const initialState = {
    boardSize: 15,
    darkTheme: false,
    startGame: false,
    gameSpeed: 150,
    specialFruitFrequency: 0
};

export default function asd(state = initialState, action){
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
                gameSpeed: payload.gameS,
                specialFruitFrequency: payload.specialF
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