import * as types from "../../common/ActionTypes";

export function setState(state) {
  return { type: types.SET_STATE, state };
}

export function applyPatch(patch) {
  return { type: types.APPLY_PATCH, patch };
}

export function valueChange(row, col, value) {
  return { type: types.VALUE_CHANGE, row, col, value };
}

export function valueShift(row, col, value) {
  return { type: types.VALUE_SHIFT, row, col, value };
}

export function cusorValueChange(index, value) {
  return { type: types.CURSOR_VALUE_CHANGE, index, value };
}

export function templateValueChange(value) {
  return { type: types.TEMPLATE_VALUE_CHANGE, value };
}

export function selectKnob(row, col) {
  return { type: types.SELECT_KNOB, row, col };
}
