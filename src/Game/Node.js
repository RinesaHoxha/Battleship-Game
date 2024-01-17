import {
    generateEmptyLayout,
    SQUARE_STATE,
    coordsToIndex,
  } from './layoutHelper';

class Node {
    constructor(parent = null, move = null, aiGrid = generateEmptyLayout(), playerGrid = generateEmptyLayout(), children = []) {
        this.parent = parent;
        this.move = move;
        this.aiGrid = aiGrid.slice(); //clones
        this.playerGrid = playerGrid.slice();//possiblegrid from determ.
        this.children = children;
        this.plays = 0;
        this.wins = 0;
    }
    playNextMove(move) {
        this.move = move;
        let hasHit = false;

        if (this.aiGrid[move] === SQUARE_STATE.ship) {
            this.aiGrid[move] = SQUARE_STATE.hit;
            hasHit = true;
        } else {
            this.aiGrid[move] = SQUARE_STATE.miss;
        }

        return hasHit;
    }
    randomChild() {
        if(this.children.length === 0) return this;
        return this.children[Math.floor(Math.random() * this.children.length)];
    }
    getWinChance() {
        return this.wins / this.plays;
    }
}

export default Node;
