import axios from '../axios-base';

import {
    CHANGE_THEME,
    START_GAME,
    STOP_GAME,
    SCORE_UPDATE,
    SCORE_SETUP
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
    dispatch({
        type: STOP_GAME,
        payload: {score}
    });
    axios.get('/score.json')
        .then(response => {
            let id = Object.keys(response.data)
            let scores = response.data[id].top5scores
            dispatch({
                type: SCORE_SETUP,
                payload: {scores, id}
            });
        }).catch(error => {
            console.warn(error)
        });
}

export const saveTop5Scores = (scores) => dispatch => {
    dispatch({
        type: SCORE_UPDATE,
        payload: {scores}
    });
}