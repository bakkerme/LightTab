//actions
//UPDATE_PARAM
export const devParams = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PARAM':
      let newState = { ...state };
      newState[action.param] = action.value;
      return newState;
    default:
      return state;
  }
}