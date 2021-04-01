const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
};

export const getOppositeDirection = direction => {
    if (direction === Direction.UP) return Direction.DOWN;
    if (direction === Direction.RIGHT) return Direction.LEFT;
    if (direction === Direction.DOWN) return Direction.UP;
    if (direction === Direction.LEFT) return Direction.RIGHT;
};

export const getCoordsInDirection = (coords, direction) => {
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

export const isOUtOfBounds = (coords, board) => {
    const {row, col} = coords;
    if(row < 0 || col < 0) return true;
    if(row >= board.length || col >= board[0].length) return true;
    return false;
};

export const getDirectionFromKey = key => {
    if(key === 'ArrowUp') return Direction.UP;
    if(key === 'ArrowDown') return Direction.DOWN;
    if(key === 'ArrowRight') return Direction.RIGHT;
    if(key === 'ArrowLeft') return Direction.LEFT;
    return '';
}

export const getNextNodeDirection = (node, currentDirection) => {
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

export const createBoard = boardSize => {
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