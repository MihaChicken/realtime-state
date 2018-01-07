import {ADD_NEW_BALL, CHANGE_BALL_PARAMETERS, TIME} from '../constants'

export const getDistance = ([x1, y1], [x2, y2]) => Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)

export const moveWithSpeed = ([pX, pY], [dX, dY], speed, time) => {
  const secondsPast = time / 1000;
  const distanceToGo = secondsPast * speed;

  if (distanceToGo === 0) {
    return [pX, pY];
  }

  const directionDistance = getDistance([pX, pY], [dX, dY]);
  const distanceRelation = distanceToGo / directionDistance;

  return [
    pX + ((dX - pX) * distanceRelation),
    pY + ((dY - pY) * distanceRelation)
  ];
};

const defaultValues = {
  position: [1, 1],
  direction: [0, 1],
  speed: 1, // per second
  color: '#A00'
};

export default (state, {type, payload}, globalState) => {
  if (type === TIME) {
    const {time} = payload;
    const {position, direction, speed} = state;
    const {field} = globalState; // TODO prevent ball to cross field borders

    return {...state, position: moveWithSpeed(position, direction, speed, time)}
  }

  if (payload.id && payload.id === state.id) {
    if (type === ADD_NEW_BALL) {
      return {...defaultValues, ...payload}
    }

    if (type === CHANGE_BALL_PARAMETERS) {
      const {speed, direction} = payload;
      return {...state, speed, direction}
    }
  }

  return state;
}