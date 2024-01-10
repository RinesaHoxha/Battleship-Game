import React from 'react';
import {
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  SQUARE_STATE,
  indexToCoords,
  updateSunkShips,
} from './layoutHelpers';

export const ComputerBoard = ({
    computerShips,
    gameState,
    hitsByPlayer,
    setHitsByPlayer,
    handleComputerTurn,
    checkIfGameOver,
    setComputerShips,
    playSound,
  }) => {
    // Ships on an empty layout
    let compLayout = computerShips.reduce(
      (prevLayout, currentShip) =>
        putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
      generateEmptyLayout()
    );
  
    //  Add hits dealt by player
    compLayout = hitsByPlayer.reduce(
      (prevLayout, currentHit) =>
        putEntityInLayout(prevLayout, currentHit, currentHit.type),
      compLayout
    );
