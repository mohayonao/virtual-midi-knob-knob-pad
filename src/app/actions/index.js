import * as types from "../../common/ActionTypes";

export function valueSet(row, col, value) {
  return { type: types.VALUE_SET, row, col, value };
}

export function cursorValueSet(index, value) {
  return { type: types.CURSOR_VALUE_SET, index, value };
}
