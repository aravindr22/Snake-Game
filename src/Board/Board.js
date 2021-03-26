import React, {useState, useEffect, Fragment} from 'react';
import {
    randomIntFromIntervals,
    useInterval,
    reverseLinkedList
} from '../lib/utils';
import {
    getOppositeDirection,
    getCoordsInDirection,
    isOUtOfBounds,
    getDirectionFromKey,
    getNextNodeDirection,
    createBoard
} from './BoardHelpher';

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

const BOARD_SIZE = 15;

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
    const [board] = useState(createBoard(BOARD_SIZE));
    const [snake, setSnake] = useState(new  LinkedList(getStartingSnakeLLValue(board)));
    const [foodCell, setFoodCell] = useState(snake.head.value.value);
    const [snakeCells, setsnakeCells] = useState(new Set([snake.head.value.value]));
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [foodShouldReverseDirection, setFoodShouldReverseDirection] = useState(false);
    const [start, setstart] = useState(false);

    useEffect(() => {
        window.addEventListener('keydown', e => {
            const newDirection = getDirectionFromKey(e.key);
            const isValidDirection =  newDirection !== '';
            if(!isValidDirection) return;
            const snakeWillRunIntoItself = getOppositeDirection(newDirection) === direction && snakeCells.size > 1;
            if(snakeWillRunIntoItself) return;
            setDirection(newDirection);
        });
    }, [direction, snakeCells]);

    useInterval(() => {
        if(start){
            moveSnake();
        }
    }, 150);

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
            if(foodShouldReverseDirection) reverseSnake();
            handleFoodConsumption(newSnakeCells);
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

        const nextFoodShouldReverseDirection = Math.random() < 0.2;

        setScore(() => score + 1);
        setFoodShouldReverseDirection(nextFoodShouldReverseDirection);
        setFoodCell(nextFoodCell);
    }

    const handleGameOver = () => {
        setScore(0);
        const snakeLLStartingValue = getStartingSnakeLLValue(board);
        setSnake(new LinkedList(snakeLLStartingValue));
        setFoodCell(snakeLLStartingValue.value + 5);
        setsnakeCells(new Set([snakeLLStartingValue.cell]));
        setDirection(Direction.RIGHT);
        setstart(false);
    }

    const reverseSnake = () => {
        const tailNextNodeDirection = getNextNodeDirection(snake.tail, direction);
        const newDirection = getOppositeDirection(tailNextNodeDirection);
        setDirection(newDirection);

        reverseLinkedList(snake.tail);
        const snakeHead = snake.head;
        snake.head = snake.tail;
        snake.tail = snakeHead;
    }
    
    return (
        <Fragment>            
            <h2 className={classes.scoreTag}>Score: {score}</h2>
            <button onClick={() => setstart(true)}>Start</button>
            <div className={classes.board}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className={classes.row}>
                        {row.map((cellValue, cellIndex) => {
                            let cellClasses = [classes.cell];
                            if(snakeCells.has(cellValue)) cellClasses.push(classes.snakeCell);
                            if(cellValue === foodCell && foodShouldReverseDirection) cellClasses.push(classes.reverseCell)
                            else if(cellValue === foodCell) cellClasses.push(classes.foodCell);
                            //if(cellValue === snake.head.value) cellClasses = [classes.cell, classes.head]
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

export default Board;