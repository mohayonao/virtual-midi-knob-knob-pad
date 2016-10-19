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

    return api.replace(patch.path, velocity(value + patch.value));
  }
}

export default (state = initState, action) => {
  switch (action.type) {
  case types.VALUE_SET:
    return patch(state, [
      { op: "replace", path: `/data/${ action.row }/${ action.col }`, value: velocity(action.value) },
    ]);
  case types.VALUE_CHANGE:
    if (isKnob(action.row)) {
      return patch(state, [
        { op: "replace", path: `/data/${ action.row }/${ action.col }`, value: velocity(action.value) },
      ]);
    }
    break;
  case types.VALUE_SHIFT:
    return patch(state, [
      { op: "@increment", path: `/data/${ action.row }/${ action.col }`, value: action.value },
    ], { custom });
  case types.CURSOR_VALUE_SET:
    return patch(state, [
      { op: "replace", path: `/cursor/${ action.index }`, value: velocity(action.value) },
    ]);
  case types.TEMPLATE_VALUE_CHANGE:
    return patch(state, [
      { op: "replace", path: `/template`, value: action.value },
    ]);
  }

  return state;
};

export function velocity(value) {
  return clamp(value, 0, 127);
}

export function isKnob(row) {
  return row === 0 || row === 1;
}
