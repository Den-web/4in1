
const intitializeBoard = require('./useCases');

describe('Testing intitialize Board', () => {
  test('Initial board with 42 points equals null', () => {
    expect(intitializeBoard()).toBe([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
  });
})
