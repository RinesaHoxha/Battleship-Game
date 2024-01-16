export const BOARD_ROWS = 10;
export const BOARD_COLUMNS = 10;
export const BOARD = BOARD_COLUMNS * BOARD_ROWS;

export const SQUARE_STATE = {
  empty: 'empty',
  ship: 'ship',
  hit: 'hit',
  miss: 'miss',
  ship_sunk: 'ship-sunk',
  forbidden: 'forbidden',
  awaiting: 'awaiting',
};

export const stateToClass = {
  [SQUARE_STATE.empty]: 'empty',
  [SQUARE_STATE.ship]: 'ship',
  [SQUARE_STATE.hit]: 'hit',
  [SQUARE_STATE.miss]: 'miss',
  [SQUARE_STATE.ship_sunk]: 'ship-sunk',
  [SQUARE_STATE.forbidden]: 'forbidden',
  [SQUARE_STATE.awaiting]: 'awaiting',
};

// Returns an empty board
export const generateEmptyLayout = () => {
  return new Array(BOARD_ROWS * BOARD_COLUMNS).fill(SQUARE_STATE.empty);
};
// Returns the index of a clicked square from coordinates and viceversa
export const coordsToIndex = (coordinates) => {
  const { x, y } = coordinates;

  return y * BOARD_ROWS + x;
};

export const indexToCoords = (index) => {
  return {
    x: index % BOARD_ROWS,
    y: Math.floor(index / BOARD_ROWS),
  };
};
// Returns the indices that entity would take up
export const entityIndices = (entity) => {
  let position = coordsToIndex(entity.position);

  let indices = [];

  for (let i = 0; i < entity.length; i++) {
    indices.push(position);
    position = entity.orientation === 'vertical' ? position + BOARD_ROWS : position + 1;
  }

  return indices;
};

// Alternative take
export const entityIndices2 = (entity) => {
  let indices = [];
  for (let i = 0; i < entity.length; i++) {
    const position =
      entity.orientation === 'vertical'
        ? coordsToIndex({ y: entity.position.y + i, x: entity.position.x })
        : coordsToIndex({ y: entity.position.y, x: entity.position.x + i });
    indices.push(position);
  }

  return indices;
};
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

  export const isPlaceFree = (entity, layout) => {
  let shipIndices = entityIndices2(entity);

  return shipIndices.every((idx) => layout[idx] === SQUARE_STATE.empty);
 };
  export const calculateOverhang = (entity) =>
  Math.max(
    entity.orientation === 'vertical'
      ? entity.position.y + entity.length - BOARD_ROWS
      : entity.position.x + entity.length - BOARD_COLUMNS,
    0
  );

export const canBePlaced = (entity, layout) =>
  isWithinBounds(entity) && isPlaceFree(entity, layout);

// Generates layout and assigns each comp ship a random orientation and set of coordinates; returns all placed ships
export const placeAllComputerShips = (computerShips) => {
  let compLayout = generateEmptyLayout();

  return computerShips.map((ship) => {
    while (true) {
      let decoratedShip = randomizeShipProps(ship);

      if (canBePlaced(decoratedShip, compLayout)) {
        compLayout = putEntityInLayout(compLayout, decoratedShip, SQUARE_STATE.ship);
        return { ...decoratedShip, placed: true };
      }
    }
  });
};

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

// Give ships a sunk flag to update their color
export const updateSunkShips = (currentHits, opponentShips) => {
  let playerHitIndices = currentHits.map((hit) => coordsToIndex(hit.position));

  let indexWasHit = (index) => playerHitIndices.includes(index);

  let shipsWithSunkFlag = opponentShips.map((ship) => {
    let shipIndices = entityIndices2(ship);
    if (shipIndices.every((idx) => indexWasHit(idx))) {
      return { ...ship, sunk: true };
    } else {
      return { ...ship, sunk: false };
    }
  });

  return shipsWithSunkFlag;
};


  export const generateRandomOrientation = () => {
    let randomNumber = Math.floor(Math.random() * Math.floor(2));
  
    return randomNumber === 1 ? 'vertical' : 'horizontal';
  };
  
  export const generateRandomIndex = (value = BOARD) => {
    return Math.floor(Math.random() * Math.floor(value));
  };

  export const placeCompShipInLayout = (ship, compLayout) => {
    let newCompLayout = compLayout.slice();
  
    entityIndices2(ship).forEach((idx) => {
      newCompLayout[idx] = SQUARE_STATE.ship;
    });
    return newCompLayout;
  };

  export const randomizeShipProps = (ship) => {
    let randomStartIndex = generateRandomIndex(); 

    return {
        ...ship,
        position: indexToCoords(randomStartIndex),
        orientation: generateRandomOrientation(),
      };
    };