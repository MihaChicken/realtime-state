
import {createStore} from 'redux';
import io from 'socket.io';
import reducers from '../reducers';

import {timePassed} from '../actions/time';

const store = createStore(reducers);
const UPDATE_INTERVAL = 1000;
let lastUpdate = Date.now();
const sockets = [];

const timeUpdate = () => {
  const now = Date.now();
  store.dispatch(timePassed(now - lastUpdate));
  lastUpdate = now;
};


io(8081, {serveClient: false}).on('connection', socket => {
  sockets.push(socket);
  socket.on('action', action => {
    socket.broadcast.emit('action', action);
    timeUpdate();
    store.dispatch(action);
  });
});

setInterval(() => {
    timeUpdate();
    sockets.forEach(socket => socket.emit('update', store.getState()));
}, UPDATE_INTERVAL);
