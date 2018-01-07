import {array, objectOf} from './stateShape';
import balls from './balls'
import ball from './ball'

export default objectOf({
  field: () => [400, 400],
  balls: array(balls).of(ball)
})