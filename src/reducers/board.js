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
    specialFruitFrequency: 0,
    score: 0,
    top5scores: [
        {name: "aaa", score: 15},
        {name: "bbb", score: 12},
        {name: "ccc", score: 10},
        {name: "ddd", score: 8},
        {name: "eee", score: 5},
    ]
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
                specialFruitFrequency: payload.specialF,
                score: 0
            }
        case STOP_GAME:
            return {
                ...state,
                startGame: false,
                score: payload.score
            }

        default:
            return state;
    }
}