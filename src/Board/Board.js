import React, {useState, useEffect, Fragment} from 'react';
import {
    randomIntFromIntervals,
    useInterval
} from '../lib/utils';

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

const BOARD_SIZE = 10;

const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
};

const getStartingSnakeLLValue = board => {
    const rowSize = board.length;
    const colSize = board[0].length;
    const startingRow = Math.round(rowSize/3);
    const startingCol = Math.round(colSize/3);
    const startingCell = board[startingRow][startingCol];
    return {
        row: startingRow,
        col: startingCol,
        value: startingCell
    };
}

const Board = () => {

    const [score, setScore] = useState(0); 
    const [board, setBoard] = useState(createBoard(BOARD_SIZE));
    const [snake, setSnake] = useState(new  LinkedList(getStartingSnakeLLValue(board)));
    const [foodCell, setFoodCell] = useState(snake.head.value.value);
    const [snakeCells, setsnakeCells] = useState(new Set([snake.head.value.value]));
    const [direction, setDirection] = useState(Direction.RIGHT);

    useEffect(() => {
        window.addEventListener('keydown', e => {
            handleKeydown(e);
        });
    }, []);

    useInterval(() => {
        moveSnake();
    }, 250);

    const handleKeydown = e => {
        const newDirection = getDirectionFromKey(e.key);
        const isValidDirection =  newDirection !== '';
        if(!isValidDirection) return;
        const snakeWillRunIntoItself = getOppositeDirection(newDirection) === direction && snakeCells.size > 1;
        if(snakeWillRunIntoItself) return;
        setDirection(newDirection);
    }

    function moveSnake() {
        const currentHeadCoords = {
            row: snake.head.value.row,
            col: snake.head.value.col
        }
        
        const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);
        if(isOUtOfBounds(nextHeadCoords, board)){
            handleGameOver();
            return;
        }
        const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
        if(snakeCells.has(nextHeadCell)){
            handleGameOver();
            return;
        }

        
        const newHead = new LinkListNode({
            row: nextHeadCoords.row, 
            col: nextHeadCoords.col, 
            value: nextHeadCell
        });
        
        const currentHead = snake.head;
        snake.head = newHead;
        currentHead.next = newHead;
        
        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.delete(snake.tail.value.value);
        newSnakeCells.add(nextHeadCell);
        
        snake.tail = snake.tail.next;
        if(snake.tail === null) snake.tail = snake.head;

        const foodConsumed = nextHeadCell === foodCell;
        if(foodConsumed){
            growSnake(newSnakeCells);
            handleFoodConsumption(newSnakeCells)
        }
            
        setsnakeCells(newSnakeCells);
    }

    const growSnake = newSnakeCells => {
        const growthNodeCoords = getGrowthNodeCoords(snake.tail, direction);
        if(isOUtOfBounds(growthNodeCoords, board)) return;

        const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col];
        const newTail = new LinkListNode({
            row: growthNodeCoords.row,
            col: growthNodeCoords.col,
            value: newTailCell
        });
        const currentTail = snake.tail;
        snake.tail = newTail;
        snake.tail.next = currentTail;
        
        newSnakeCells.add(newTailCell); 
    }

    const handleFoodConsumption = newSnakeCells => {
        const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;
        let nextFoodCell;
        while(true){
            nextFoodCell = randomIntFromIntervals(1, maxPossibleCellValue);
            if(newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell) continue;
            break;
        }
        setScore(() => score + 1);
        setFoodCell(nextFoodCell);
    }

    const handleGameOver = () => {
        setScore(0);
        const snakeLLStartingValue = getStartingSnakeLLValue(board);
        setSnake(new LinkedList(snakeLLStartingValue));
        setFoodCell(snakeLLStartingValue.value + 5);
        setsnakeCells(new Set([snakeLLStartingValue.cell]));
        setDirection(Direction.RIGHT);
    }

    return (
        <Fragment>
            <h1>Score: {score}</h1>
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

const getGrowthNodeCoords = ( snakeTail, currentDirection ) => {
    const tailNextNodeDirection = getNextNodeDirection(snakeTail, currentDirection);
    const growthDirection = getOppositeDirection(tailNextNodeDirection);
    const currentTailCoords = {
        row: snakeTail.value.row,
        col: snakeTail.value.col
    };
    const growthNodeCoords = getCoordsInDirection(currentTailCoords, growthDirection);
    return growthNodeCoords;
}

const getCoordsInDirection = (coords, direction) => {
    if (direction === Direction.UP) {
      return {
        row: coords.row - 1,
        col: coords.col,
      };
    }
    if (direction === Direction.RIGHT) {
      return {
        row: coords.row,
        col: coords.col + 1,
      };
    }
    if (direction === Direction.DOWN) {
      return {
        row: coords.row + 1,
        col: coords.col,
      };
    }
    if (direction === Direction.LEFT) {
      return {
        row: coords.row,
        col: coords.col - 1,
      };
    }
};

const getNextNodeDirection = (node, currentDirection) => {
    if (node.next === null) return currentDirection;
    const {row: currentRow, col: currentCol} = node.value;
    const {row: nextRow, col: nextCol} = node.next.value;
    if (nextRow === currentRow && nextCol === currentCol + 1) {
      return Direction.RIGHT;
    }
    if (nextRow === currentRow && nextCol === currentCol - 1) {
      return Direction.LEFT;
    }
    if (nextCol === currentCol && nextRow === currentRow + 1) {
      return Direction.DOWN;
    }
    if (nextCol === currentCol && nextRow === currentRow - 1) {
      return Direction.UP;
    }
    return '';
};

const getOppositeDirection = direction => {
    if (direction === Direction.UP) return Direction.DOWN;
    if (direction === Direction.RIGHT) return Direction.LEFT;
    if (direction === Direction.DOWN) return Direction.UP;
    if (direction === Direction.LEFT) return Direction.RIGHT;
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

const isOUtOfBounds = (coords, board) => {
    const {row, col} = coords;
    if(row < 0 || col < 0) return true;
    if(row >= board.length || col >= board[0].length) return true;
    return false;
};

const getDirectionFromKey = key => {
    if(key === 'ArrowUp') return Direction.UP;
    if(key === 'ArrowDown') return Direction.DOWN;
    if(key === 'ArrowRight') return Direction.RIGHT;
    if(key === 'ArrowLeft') return Direction.LEFT;
    return '';
}

export default Board;