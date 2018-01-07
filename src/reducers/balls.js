import {ADD_NEW_BALL} from '../constants'

export default (state = [], action) => {
  if (action.type === ADD_NEW_BALL) {
    return [...state, {id: action.payload.id}]
  }

  return state;
}