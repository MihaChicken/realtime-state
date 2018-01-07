import {ADD_NEW_BALL, CHANGE_BALL_PARAMETERS} from '../constants'

export const addNewBall = payload => ({type: ADD_NEW_BALL, payload});
export const changeBallParameters = payload => ({type: CHANGE_BALL_PARAMETERS, payload});