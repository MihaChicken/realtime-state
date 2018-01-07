import {changeBallParameters, addNewBall} from '../actions/ball';
import startClient from './client'

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

const ball = {
  color: randomColor(),
  id: Date.now() + '' + Math.random()
};

window.addEventListener('load', () => {
  const fieldContainer = document.querySelector('#field-container');
  const publishAction = startClient(state => render(fieldContainer, state));

  publishAction(addNewBall(ball));

  fieldContainer.addEventListener('mousemove', (e) => {
    const action = changeBallParameters({
      id: ball.id,
      direction: [e.offsetX, e.offsetY],
      speed: 100
    });
    publishAction(action);
  });
});