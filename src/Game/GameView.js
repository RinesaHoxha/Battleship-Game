import React from 'react';

import { PlayerFleet } from './PlayerFleet';
import { PlayerBoard } from './PlayerBoard';
import { ComputerBoard } from './ComputerBoard';
import { PlayerTips } from './PlayerTips';

export const GameView = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  startTurn,
  computerShips,
  gameState,
  changeTurn,
  hitComputer,
  hitsByPlayer,
  setHitsByPlayer,
  hitsByComputer,
  handleComputerTurn,
  checkIfGameOver,
  winner,
  startAgain,
  setComputerShips,
  playSound,
}) => {
  return (
  
        />
      ) : (
       
      )}

   </section>
  );
};
