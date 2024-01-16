


const clearChanceGrid = () => {
    chancesGrid = Array(totalIndex).fill(0);
}

export const setRoot = (node) => {
    root = node;
}

export const setMaxIterations = (newMaxIterations) => {
    maxIterations = newMaxIterations;
};

export const uctValue = (totalPlaysParent, totalWinsCurrent, totalPlaysCurrent) => {
    if (totalPlaysCurrent == 0) {
        return Number.MAX_SAFE_INTEGER;
    }
    return (totalWinsCurrent /  totalPlaysCurrent) + Math.sqrt(2 * Math.log(totalPlaysParent) / totalPlaysCurrent);
}
export const selectBestNode = (node) => {
    if ((node.children.length === 0) || (node.parent == null)) {
        return node;
    }

    let bestNode = node;
    let bestUct = Number.MIN_SAFE_INTEGER;

    for(let child of node.children) {
        let uct = uctValue(node.parent.plays, child.wins, child.plays);
        if (uct === Number.MAX_SAFE_INTEGER) {
            return node;
        }
        if(uct > bestUct) {
            bestNode = child;
            bestUct = uct;
        }
    }
    return selectBestNode(bestNode);
};
export const run = (node) => {
    for(let child of node.children) {
        backPropagate(child, simulateGamePlayForNode(child));
    }

    return root.children;
};

export const getAllPossibleMoves = (informationGrid) => {
    let possibleMoves = [];

    for(let index = 0; index < totalIndex; index ++) {
        if(informationGrid[index] != SQUARE_STATE.hit && informationGrid[index] != SQUARE_STATE.ship_sunk
            && informationGrid[index] != SQUARE_STATE.miss) {
            possibleMoves.push(index);
        }
    }
    return possibleMoves;
};

