import React, { useState, useRef } from 'react';

//available ships here
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
