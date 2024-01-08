export const BOARD_ROWS = 10;
export const BOARD_COLUMNS = 10;
export const BOARD = BOARD_COLUMNS * BOARD_ROWS;



export const isWithinBounds = (entity) => {
    return (
      (entity.orientation === 'vertical' &&
        entity.position.y + entity.length <= BOARD_ROWS) ||
      (entity.orientation === 'horizontal' &&
        entity.position.x + entity.length <= BOARD_COLUMNS)
    );
  };

export const putEntityInLayout = (oldLayout, entity, type) => {
    let newLayout = oldLayout.slice();
  
    if (type === 'ship') {
      entityIndices(entity).forEach((idx) => {
        newLayout[idx] = SQUARE_STATE.ship;
      });
    }
  
    if (type === 'forbidden') {
      entityIndices(entity).forEach((idx) => {
        newLayout[idx] = SQUARE_STATE.forbidden;
      });
    }
  
    if (type === 'hit') {
      newLayout[coordsToIndex(entity.position)] = SQUARE_STATE.hit;
    }
  
    if (type === 'miss') {
      newLayout[coordsToIndex(entity.position)] = SQUARE_STATE.miss;
    }
  
    if (type === 'ship-sunk') {
      entityIndices(entity).forEach((idx) => {
        newLayout[idx] = SQUARE_STATE.ship_sunk;
      });
    }
  
    return newLayout;
  };


  export const calculateOverhang = (entity) =>
  Math.max(
    entity.orientation === 'vertical'
      ? entity.position.y + entity.length - BOARD_ROWS
      : entity.position.x + entity.length - BOARD_COLUMNS,
    0
  );

// Gets the neighboring squares to a successful computer hit probably useful for MCTS
export const getNeighbors = (coords) => {
  let firstRow = coords.y === 0;
  let lastRow = coords.y === 9;
  let firstColumn = coords.x === 0;
  let lastColumn = coords.x === 9;

  let neighbors = [];

  // coords.y === 0;  
  if (firstRow) {
    neighbors.push(
      { x: coords.x + 1, y: coords.y },
      { x: coords.x - 1, y: coords.y },
      { x: coords.x, y: coords.y + 1 }
    );
  }

  // coords.y === 9;
  if (lastRow) {
    neighbors.push(
      { x: coords.x + 1, y: coords.y },
      { x: coords.x - 1, y: coords.y },
      { x: coords.x, y: coords.y - 1 }
    );
  }
  // coords.x === 0
  if (firstColumn) {
    neighbors.push(
      { x: coords.x + 1, y: coords.y }, // right
      { x: coords.x, y: coords.y + 1 }, // down
      { x: coords.x, y: coords.y - 1 } // up
    );
  }

  // coords.x === 9
  if (lastColumn) {
    neighbors.push(
      { x: coords.x - 1, y: coords.y }, // left
      { x: coords.x, y: coords.y + 1 }, // down
      { x: coords.x, y: coords.y - 1 } // up
    );
  }

  if (!lastColumn || !firstColumn || !lastRow || !firstRow) {
    neighbors.push(
      { x: coords.x - 1, y: coords.y }, // left
      { x: coords.x + 1, y: coords.y }, // right
      { x: coords.x, y: coords.y - 1 }, // up
      { x: coords.x, y: coords.y + 1 } // down
    );
  }

  let filteredResult = [
    ...new Set(
      neighbors
        .map((coords) => coordsToIndex(coords))
        .filter((number) => number >= 0 && number < BOARD)
    ),
  ];

  return filteredResult;
};
