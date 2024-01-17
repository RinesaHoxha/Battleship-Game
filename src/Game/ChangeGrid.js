import {
    BOARD_ROWS,
    BOARD_COLUMNS,
    coordsToIndex,
} from './layoutHelper';



export const getHighestValue = (grid) => {
    let highestValue = {x: 0, y: 0}; //Number.MIN_SAFE_INTEGER
    for(let x = 0; x < BOARD_ROWS; x++) {
        for(let y = 0; y < BOARD_COLUMNS; y++) {
            let indexFromCoords = coordsToIndex({x: x, y: y});
            if(grid[indexFromCoords] > highestValue) {
                highestValue = {x: x, y: y}
            }
        }
    }
    return highestValue;
}

export const divideGrid = (grid, divisor) => {
    return grid.map(value => value / divisor);
}

export const incrementCells = (grid, {x, y}, incrementedBy) => {
    let indexFromCoords = coordsToIndex({x: x, y: y});
    grid[indexFromCoords] += incrementedBy;
    return grid;
}

export const incrementAll = (grid) => {
    for(let x = 0; x < BOARD_ROWS; x++) {
        for(let y = 0; y < BOARD_COLUMNS; y++) {
            let indexFromCoords = coordsToIndex({x: x, y: y});
            grid[indexFromCoords] += 1;
        }
    }
    return grid;
};
