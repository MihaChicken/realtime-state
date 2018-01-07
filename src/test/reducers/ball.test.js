import {getDistance, moveWithSpeed} from '../../reducers/ball'


test('getDistance', () => {
  expect(getDistance([0, 0], [0, 1])).toBe(1);
  expect(getDistance([0, 0], [1, 0])).toBe(1);
  expect(getDistance([0, 0], [3, 4])).toBe(5);
});

test('moveWithSpeed basic', () => {
  expect(moveWithSpeed([0, 0], [0, 1], 1, 1000)).toEqual([0, 1]);
  expect(moveWithSpeed([0, 0], [1, 0], 1, 1000)).toEqual([1, 0]);

  expect(moveWithSpeed([0, 1], [0, 0], 1, 1000)).toEqual([0, 0]);
  expect(moveWithSpeed([1, 0], [0, 0], 1, 1000)).toEqual([0, 0]);

  expect(moveWithSpeed([3, 4], [0, 0], 5, 1000)).toEqual([0, 0]);
});

test('moveWithSpeed time values', () => {
  expect(moveWithSpeed([0, 0], [0, 1], 1, 500)).toEqual([0, 0.5]);
});

test('moveWithSpeed speed values', () => {
  expect(moveWithSpeed([0, 0], [0, 1], 0.5, 1000)).toEqual([0, 0.5]);
});

test('moveWithSpeed negative values', () => {
  expect(moveWithSpeed([0, 0], [0, -1], 0.5, 1000)).toEqual([0, -0.5]);
  expect(moveWithSpeed([0, -1], [0, 0], 0.5, 1000)).toEqual([0, -0.5]);
});


