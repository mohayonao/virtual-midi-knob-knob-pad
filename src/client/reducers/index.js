import patch from "json-touch-patch";
import initState from "../../common/initState";
import * as types from "../../common/ActionTypes";

const _initState = { ...initState, ...{
  knob: [ -1, -1, -1, -1, -1, -1, -1, -1 ]
} };

export default (state = _initState, action) => {
  switch (action.type) {
  case types.SET_STATE:
    return { ...state, ...action.state };
  case types.APPLY_PATCH:
    return patch(state, action.patch);
  case types.SELECT_KNOB:
    return patch(state, [
      { op: "replace", path: `/knob/${ action.col }`, value: action.row },
    ]);
  }
  return state;
};
