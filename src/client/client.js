
import io from 'socket.io-client';
import {timePassed} from '../actions/time';
import reducers from '../reducers';

let currentState = {};
let lastCallTime = 0;

export default (onStateUpdate) => {
  const server = io.connect('http://localhost:8081/');
  const predictNextState = time => {
    onNewState(reducers(currentState, timePassed(time - lastCallTime)));
    lastCallTime = time;
    requestAnimationFrame(predictNextState)
  };
  const onNewState = state => {
    currentState = state;
    onStateUpdate(state);
  };

  server.on('connect', () => {
    lastCallTime = Date.now();
    requestAnimationFrame(predictNextState);

    server.on('update', onNewState);
    server.on('action', action => onNewState(reducers(currentState, action)))
  });

  const publishAction = action => {
    server.emit('action', action);
    onNewState(reducers(currentState, action))
  };

  return publishAction;
}
