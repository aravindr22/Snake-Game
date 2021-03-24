import React, {useState} from 'react';

import classes from './Board.module.css';

const BOARD_SIZE = 10;

const Board = () => {

    const [board, setBoard] = useState(
        new Array(BOARD_SIZE).fill(0).map(eachRow => new Array(BOARD_SIZE).fill(0))
    );

    return (
        <div className={classes.board}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className={classes.row}>
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={classes.cell}></div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
