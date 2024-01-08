import React, { useState, useRef } from 'react';

const AVAILABLE_SHIPS = [
  {
    name: 'carrier',
    length: 5,
    placed: null,
  },
  {
    name: 'battleship',
    length: 4,
    placed: null,
  },
  {
    name: 'cruiser',
    length: 3,
    placed: null,
  },
  {
    name: 'submarine',
    length: 3,
    placed: null,
  },
  {
    name: 'destroyer',
    length: 2,
    placed: null,
  },
];

export const Game = () => {
    const [gameState, setGameState] = useState('placement');
    const [winner, setWinner] = useState(null);

    //game functions here

    return (//everything needed to update game view here
        <React.Fragment>
            <GameView>
            
            </GameView>
        </React.Fragment>
    )
}
