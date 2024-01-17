import {
    generateEmptyLayout,
    SQUARE_STATE,
    BOARD_ROWS,
    BOARD_COLUMNS,
    putEntityInLayout,
    canBePlaced,
    indexToCoords,
  } from './layoutHelper';
  
  import {
    AVAILABLE_SHIPS,
  } from './Game';
  
  const totalIndex = BOARD_ROWS * BOARD_COLUMNS;
  export const validDeterminization = (informationGrid, possibleGrid) => {
   for(let index = 0; index < totalIndex; index++) {
    if(informationGrid[index] === SQUARE_STATE.hit) {
      if(!(possibleGrid[index] === SQUARE_STATE.ship)) {
        return false;
      }
    } else if(informationGrid[index] === SQUARE_STATE.miss) {
      if(possibleGrid[index] === SQUARE_STATE.ship) {
        return false;
      }
    }
   }
    return true;
  };
  
  export const reproduceShots = (informationGrid, possibleGrid) => {
    for(let index = 0; index < totalIndex; index++) {
      if(informationGrid[index] === SQUARE_STATE.hit) 
        {
         possibleGrid[index] = SQUARE_STATE.hit;
        } else if(informationGrid[index] === SQUARE_STATE.miss) 
        possibleGrid[index] = SQUARE_STATE.miss;
    }
    return possibleGrid;
  };
  
  export const makeRandomDeterminization = (informationGrid) => {
  let possibleGrid = generateEmptyLayout();
  possibleGrid = reproduceShots(informationGrid, possibleGrid);
  
  let availShips = AVAILABLE_SHIPS.slice();
  for (let index = 0; index < totalIndex; index++) {
      if(informationGrid[index] === SQUARE_STATE.hit && (possibleGrid[index] === SQUARE_STATE.empty)) {
        if (availShips.length === 0) {
          return possibleGrid;
        }
  
        let randomShipIndex = Math.floor(Math.random() * availShips.length);
        let ship = availShips[randomShipIndex];
        let shipEntity = null;
  
        for(let shipOrient = 0; shipOrient < 2; shipOrient++) {
          shipEntity = {...ship, position : indexToCoords(index), orientation : Math.floor(Math.random() * 2) === 1 ? 'vertical' : 'horizontal'};
          const canPlaceCurrentShip = canBePlaced(shipEntity, possibleGrid);
  
          if (canPlaceCurrentShip) {
            possibleGrid = putEntityInLayout(possibleGrid, shipEntity, SQUARE_STATE.ship);
            availShips.splice(randomShipIndex, 1);
          }
  
          break;
        }
      }
  }
  
  while(availShips.length > 0) { // send help OMG
    let randomIndex = Math.floor(Math.random() * totalIndex);
  
    if (possibleGrid[randomIndex] !== SQUARE_STATE.ship) {
      let randomShipIndex = Math.floor(Math.random() * availShips.length);
      let ship = availShips[randomShipIndex];
      let shipEntity = {...ship, position : indexToCoords(randomIndex), orientation : Math.floor(Math.random() * 2) === 1 ? 'horizontal' : 'vertical'};
  
      const canPlaceCurrentShip = canBePlaced(shipEntity, possibleGrid);
  
      if (canPlaceCurrentShip) {
        possibleGrid = putEntityInLayout(possibleGrid, shipEntity, SQUARE_STATE.ship);
        availShips.splice(randomShipIndex, 1);
      }
    }
  }
  return possibleGrid;
  };
  
  export const makePossibleDeterminization = (informationGrid, depth = 0) => {
    const MAX_DEPTH = 50; 
    if (depth > MAX_DEPTH) {
      //return informationGrid; //cheating ai
      return makeRandomDeterminization(informationGrid);// duct tape fix
    } // why did that even work??
  
    let possibleGrid = makeRandomDeterminization(informationGrid);
  
    if (validDeterminization(informationGrid, possibleGrid)) {
      return possibleGrid;
    }
  
    return makePossibleDeterminization(informationGrid, depth + 1); //recursive
  }
  
  export const makeDeterminization = (currentCompFires, iterations) => {
  let determinization = [];
  const startTime = new Date(); // idk so it doesn't take too long.
  
  for(let i = 0; i < iterations; i++) {
    let informationGrid = currentCompFires;
    let possibleGrid = makePossibleDeterminization(informationGrid);
    determinization.push(possibleGrid);
  
    const endTime = new Date();
    const timePassed = endTime.getTime() - startTime.getTime(); // is in ms
  
    if (timePassed > 1000) {
      break;
    }
  }
  
  return determinization;
  }
  