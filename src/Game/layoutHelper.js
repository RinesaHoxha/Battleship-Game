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
