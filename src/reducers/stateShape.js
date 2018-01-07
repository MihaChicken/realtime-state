export const objectOf = shape => (state = {}, action, globalState = state) =>
  Object.keys(shape)
    .reduce(
      (nextState, key) =>
        Object.assign(nextState, {[key]: shape[key](state[key], action, globalState)}),
      {}
    );

export const array = (collectionShape) => ({
  of: shape =>
    (state = [], action, globalState = state) =>
      collectionShape(state, action, globalState, shape)
        .map(item => shape(item, action, globalState))
});
