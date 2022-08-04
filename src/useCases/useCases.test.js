import { intitializeBoard, getPrettyPlayer, findLowestEmptyIndex, togglePlayerTurn } from './useCases';

describe('Testing intitialize Board', () => {
  const board = intitializeBoard();
  test('Initial board with 42 points equals null', () => {

    expect(board).toEqual([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
  });
  test('Initial board with empty array of points', () => {
    expect(board).not.toEqual([]);
  });
})

describe('Testing get Pretty Player function', () => {
  test('Get Pretty Player no player', () => {
    expect(getPrettyPlayer(null)).toBe("noPlayer");
  });
  test('Get Pretty Player playerOne', () => {
    expect(getPrettyPlayer(1)).toBe("playerOne");
  });
  test('Get Pretty Player playerTwo', () => {
    expect(getPrettyPlayer(2)).toBe("playerTwo");
  });
  test('Get Pretty Player wrong value', () => {
    expect(getPrettyPlayer(' ')).not.toBe("playerTwo");
  });
})

describe('Toggle Player Turn function', () => {
  test('If player 1 expect return player 2', () => {
    expect(togglePlayerTurn(1)).toBe(2);
  });
  test('If player 2 expect return player 1', () => {
    expect(togglePlayerTurn(2)).toBe(1);
  });
})

describe('Toggle Player Turn function', () => {
  test('If player 1 expect return player 2', () => {
    expect(togglePlayerTurn(1)).toBe(2);
  });
  test('If player 2 expect return player 1', () => {
    expect(togglePlayerTurn(2)).toBe(1);
  });
})
