# Battleship AI with MCTS

## Introduction
Battleship-Game is an interactive game where players compete against a computer to win in the classic game of Battleship. Utilizing the Monte Carlo Tree Search (MCTS) algorithm, the computer makes strategic moves based on the current state of the game. Currently using a 10x10 Battleship board, but the program is versatile and can scale to accommodate different board sizes.

## Specifications
This project is created with:
- React: 17
- JavaScript
- Deployed using Netlify

## Setup
You can access [the game](https://battleship-gr1.netlify.app/) or by installing it locally on your device with npm.

## How To Play
1. Start the game: Open the [deployed app](https://battleship-gr1.netlify.app/) or run the application locally, and you will be greeted by the Welcome screen.
2. Click Play to go to the Playing interface.
3. You can click the different ship types to place them on your board.
4. Once all the player ships are placed, you can click "Start game" to start playing against the Computer.
4. Make your moves and watch the computer respond using the MCTS algorithm.
5. The game ends when all ships of one player are sunk.

## Game Rules
-Setup: Each player has a 10x10 grid where they secretly arrange a fleet of ships.
-Ships: Each fleet typically includes a mix of battleships, destroyers, submarines, and other vessels.
-Turns: Players take turns guessing grid coordinates to 'fire' at the opponent's fleet.
-Hits and Misses: If a ship occupies the coordinate, it's a hit; otherwise, it's a miss.
-Sinking Ships: A ship is sunk when all its segments are hit.
-Winning: The first player to sink all of the opponent's ships wins the game.
