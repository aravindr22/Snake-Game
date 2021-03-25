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

const BOARD_SIZE = 15;

const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
};

const Board = () => {

    const [score, setScore] = useState(0); 
    const [board, setBoard] = useState(createBoard(BOARD_SIZE));
    const [snakeCells, setsnakeCells] = useState(new Set([44]));
    const [foodCell, setFoodCell] = useState(48);
    const [snake, setSnake] = useState(new LinkedList(new Cell(4, 3, 44)));
    const [direction, setDirection] = useState(Direction.RIGHT);

    useEffect(() => {
        window.addEventListener('keydown', e => {
            handleKeydown(e);
        });
    }, []);

    const handleKeydown = e => {
        console.warn(e.key);
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
        console.log(currentHeadCoords);
        
        const nextHeadCoords = getNextHeadCoords(currentHeadCoords, direction);
        if(isOUtOfBounds(nextHeadCoords, direction)){
            return;
        }
        const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
        if(snakeCells.has(nextHeadCell)){
            return;
        }

        const foodConsumed = nextHeadCell === foodCell;
        if(foodConsumed) handleFoodConsumption();

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

        if(!foodConsumed){
            snake.tail = snake.tail.next;
            if(snake.tail === null) snake.tail = snake.head;
        }

        setsnakeCells(newSnakeCells);
    }

    const growSnake = () => {
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
        
        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.add(newTailCell);

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
        setScore(() => score + 1);
        setFoodCell(nextFoodCell);
    }

    return (
        <Fragment>
            <h1>Score: {score}</h1>
            <button onClick={moveSnake}>Move</button>
            <button onClick={growSnake}>Grow Snake</button>
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
    console.log(tailNextNodeDirection);
    const growthDirection = getOppositeDirection(tailNextNodeDirection);
    const currentTailCoords = {
        row: snakeTail.value.row,
        col: snakeTail.value.col
    };
    console.log(currentTailCoords); 
    const growthNodeCoords = getCoordsInDirection(currentTailCoords, growthDirection);
    console.log(growthNodeCoords);
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
    if(row >= board.legnth || col >= board[0].legnth) return true;
    return false;
};

const getDirectionFromKey = key => {
    if(key === 'ArrowUp') return Direction.UP;
    if(key === 'ArrowDown') return Direction.DOWN;
    if(key === 'ArrowRight') return Direction.RIGHT;
    if(key === 'ArroLeft') return Direction.LEFT;
    return '';
}

export default Board;