import io from 'socket.io-client';
import {changeBallParameters, addNewBall} from '../actions/ball';
import {timePassed} from '../actions/time';
import reducers from '../reducers';
const server = io.connect('http://localhost:8081/');

const render = (element, {field: [fieldWidth, fieldHeight], balls}) => {
  element.innerHTML = `
      <div class="field" style="width: ${fieldWidth}px; height: ${fieldHeight}px;">
        ${balls.map(({position: [x, y], color}) =>
    `<div class="ball" style="left: ${x}px; top: ${y}px; background-color: ${color};"></div>`
  ).join('')}
      </div>
    `;
};

const randomColor = () => '#' + Array.from({length: 6})
  .map(() => '0123456789ABCDEF'[Math.floor(Math.random() * 16)])
  .join('');

server.on('connect', () => {
  const ball = {
    color: randomColor(),
    id: Date.now() + '' + Math.random()
  };
  let currentState = {};
  let lastCallTime = 0;
  const fieldContainer = document.querySelector('#field-container');

  const onNewState = state => {
    currentState = state;
    render(fieldContainer, state);
  };

  const predictNextState = (time) => {
    onNewState(reducers(currentState, timePassed(time - lastCallTime)));
    lastCallTime = time;
    requestAnimationFrame(predictNextState)
  };
  requestAnimationFrame(predictNextState);

  server.emit('action', addNewBall(ball));

  fieldContainer.addEventListener('mousemove', (e) => {
    const action = changeBallParameters({
      id: ball.id,
      direction: [e.offsetX, e.offsetY],
      speed: 100
    });
    server.emit('action', action);
    onNewState(reducers(currentState, action));
  });

  server.on('update', onNewState);
  server.on('action', action => onNewState(reducers(currentState, action)))
});