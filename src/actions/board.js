import {
    CHANGE_THEME,
    START_GAME,
    STOP_GAME
} from '../actions/types';

export const changeTheme = () => dispatch => {
    dispatch({
        type: CHANGE_THEME
    });
}

export const startGame = (boardS, gameS, specialF) => dispatch => {
    console.warn(specialF)
    dispatch({
        type: START_GAME,
        payload: {boardS, gameS, specialF}
    });
}

export const stopGame = () => dispatch => {
    dispatch({
        type: STOP_GAME
    });
}
