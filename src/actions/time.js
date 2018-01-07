import {TIME} from '../constants';

export const timePassed = (time) => ({
  type: TIME,
  payload: {time}
});