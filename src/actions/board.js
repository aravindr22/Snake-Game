import axios from '../axios-base';

import {
    CHANGE_THEME,
    START_GAME,
    STOP_GAME,
    SCORE_UPDATE
} from '../actions/types';

export const changeTheme = () => dispatch => {
    dispatch({
        type: CHANGE_THEME
    });
}

export const startGame = (boardS, gameS, specialF) => dispatch => {
    dispatch({
        type: START_GAME,
        payload: {boardS, gameS, specialF}
    });
}

export const stopGame = (score) => dispatch => {
    // axios.get('/score.json')
    //     .then(response => {
    //     }).catch(error => {
    //         console.warn(error)
    //     });
    dispatch({
        type: STOP_GAME,
        payload: {score}
    });
}

export const saveTop5Scores = (scores) => dispatch => {
    dispatch({
        type: SCORE_UPDATE,
        payload: {scores}
    });
}