import initState from "../../common/initState";
import * as types from "../../common/ActionTypes";

const _initState = { ...initState, ...{
  knob: [ -1, -1, -1, -1, -1, -1, -1, -1 ]
} };

export default (state = _initState, action) => {
  switch (action.type) {
  case types.SET_STATE:
    return { ...state, ...action.state };
  case types.SELECT_KNOB:
    return { ...state, knob: [].concat(state.knob.slice(0, action.col), action.row, state.knob.slice(action.col + 1)) };
  }
  return state;
};
