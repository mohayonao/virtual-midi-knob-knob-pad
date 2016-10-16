import patch from "json-touch-patch";
import initState from "../../common/initState";
import * as types from "../../common/ActionTypes";
import { clamp } from "../../common/utils";

const custom = {
  ["@increment"](api, patch) {
    const value = api.get(patch.path);

    if (value === undefined) {
      return "error";
    }

    return api.replace(patch.path, clamp(value + patch.value, 0, 127));
  }
}

export default (state = initState, action) => {
  switch (action.type) {
  case types.VALUE_SET:
    return patch(state, [
      { op: "replace", path: `/data/${ action.row }/${ action.col }`, value: clamp(action.value, 0, 127) },
    ]);
  case types.VALUE_CHANGE:
    if (0 <= action.row && action.row <= 1) {
      return patch(state, [
        { op: "replace", path: `/data/${ action.row }/${ action.col }`, value: clamp(action.value, 0, 127) },
      ]);
    }
    break;
  case types.VALUE_SHIFT:
    return patch(state, [
      { op: "@increment", path: `/data/${ action.row }/${ action.col }`, value: action.shift },
    ], { custom });
  case types.CURSOR_VALUE_SET:
    return patch(state, [
      { op: "replace", path: `/cursor/${ action.index }`, value: action.value },
    ]);
  case types.TEMPLATE_VALUE_CHANGE:
    return patch(state, [
      { op: "replace", path: `/template`, value: action.value },
    ]);
  }

  return state;
};
