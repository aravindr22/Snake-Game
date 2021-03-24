import React, {useState, useEffect, Fragment} from 'react';
import {randomIntFromIntervals} from '../lib/utils';

import classes from './Board.module.css';

class LinkListNode{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(value){
        const node = new LinkListNode(value);
        this.head = node;
        this.tail = node;
    }
}

class Cell {
    constructor(row, col, value){
        this.row = row;
        this.col = col;
        this.value = value;
    }
}

const BOARD_SIZE = 10;

const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
};

const Board = () => {

    const [board, setBoard] = useState(createBoard(BOARD_SIZE));
    const [snakeCells, setsnakeCells] = useState(new Set([44]));
    const [foodCell, setFoodCell] = useState(48);
    const [snake, setSnake] = useState(new LinkedList(new Cell(4, 3, 44)));
    const [direction, setDirection] = useState(Direction.RIGHT);

    useEffect(() => {
        window.addEventListener('keydown', e => {
            const newDirection = getDirectionFromKey(e.key);
            const isValidDirection =  newDirection !== '';
            if(isValidDirection) setDirection(newDirection); 
        });
    }, []);

    function moveSnake() {
        const currentHeadCoords = {
            row: snake.head.value.row,
            col: snake.head.value.col
        }
        console.log(currentHeadCoords);
        
        const nextHeadCoords = getNextHeadCoords(currentHeadCoords, direction);
        const nextHeadValue = board[nextHeadCoords.row][nextHeadCoords.col];

        if(nextHeadValue === foodCell) handleFoodConsumption();

        const newHead = new LinkListNode(
            new Cell(nextHeadCoords.row, nextHeadCoords.col, nextHeadValue)
        );

        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.delete(snake.tail.value.value);
        newSnakeCells.add(nextHeadValue);

        snake.head = newHead;
        snake.tail = snake.tail.next;
        if(snake.tail === null) snake.tail = snake.head;

        setsnakeCells(newSnakeCells);
    }

    const getNextHeadCoords = (currentHeadCoords, direction) => {
        if(direction === Direction.UP){
            return {
                row: currentHeadCoords.row - 1,
                col: currentHeadCoords.col
            };
        }
        if(direction === Direction.RIGHT){
            return {
                row: currentHeadCoords.row,
                col: currentHeadCoords.col + 1
            };
        }
        if(direction === Direction.DOWN){
            return {
                row: currentHeadCoords.row + 1,
                col: currentHeadCoords.col
            };
        }
        if(direction === Direction.UP){
            return {
                row: currentHeadCoords.row,
                col: currentHeadCoords.col - 1
            };
        }
    }

    const handleFoodConsumption = () => {
        const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;
        let nextFoodCell;
        while(true){
            nextFoodCell = randomIntFromIntervals(1, maxPossibleCellValue);
            if(snakeCells.has(nextFoodCell) || foodCell === nextFoodCell) continue;
            break;
        }

        setFoodCell(nextFoodCell);
    }

    return (
        <Fragment>
            <button onClick={moveSnake}>Move</button>
            <div className={classes.board}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className={classes.row}>
                        {row.map((cellValue, cellIndex) => {
                            let cellClasses = [classes.cell];
                            if(snakeCells.has(cellValue)) cellClasses.push(classes.snakeCell);
                            if(cellValue === foodCell) cellClasses.push(classes.foodCell)                
                            return(
                                <div 
                                    key={cellIndex} 
                                    className={cellClasses.join(' ')}>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

const createBoard = boardSize => {
    let counter = 1;
    const board = [];
    for(let row = 1; row <= boardSize; row++){
        const currentRow = [];
        for(let col = 1; col <= boardSize; col++){
            currentRow.push(counter++);
        }
        board.push(currentRow);
    }
    return board;
}

const getDirectionFromKey = key => {
    if(key === 'ArrowUp') return Direction.UP;
    if(key === 'ArrowDown') return Direction.DOWN;
    if(key === 'ArrowRight') return Direction.RIGHT;
    if(key === 'ArroLeft') return Direction.LEFT;
    return '';
}

export default Board;