import {
    CHANGE_THEME,
    START_GAME,
    STOP_GAME, 
    SCORE_UPDATE,
    SCORE_SETUP
} from '../actions/types';

const initialState = {
    boardSize: 17,
    darkTheme: false,
    startGame: false,
    gameSpeed: 150,
    specialFruitFrequency: 0,
    score: 0,
    scoreFirebaseId: "",
    loading: false,
    top5scores: [
        {name: "ccc", score: 10},
        {name: "ddd", score: 8},
        {name: "eee", score: 5},
        {name: "bbb", score: 2},
        {name: "aaa", score: 1},
    ]
};

export default function asd(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case CHANGE_THEME:
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
                score: payload.score,
                loading: true
            }
        case SCORE_SETUP:
            return {
                ...state,
                top5scores: payload.scores,
                scoreFirebaseId: payload.id,
                loading: false
            }
        case SCORE_UPDATE:
            return {
                ...state,
                top5scores: payload.scores,
            }

        default:
            return state;
    }
}