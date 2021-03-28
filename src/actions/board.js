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

export const startGame = (boardS, gameS) => dispatch => {
    dispatch({
        type: START_GAME,
        payload: {boardS, gameS}
    });
}

export const stopGame = () => dispatch => {
    dispatch({
        type: STOP_GAME
    });
}
