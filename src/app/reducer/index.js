import initState from "../../common/initState";
import * as types from "../../common/ActionTypes";
import { NUMBER_OF_ROWS, NUMBER_OF_COLS } from "../../common/constants";
import { clamp } from "../../common/utils";

export default (state = initState, action) => {
  switch (action.type) {
  case types.VALUE_CHANGE:
    if (0 <= action.row && action.row < (NUMBER_OF_ROWS - 1)) {
      if (0 <= action.col && action.col < NUMBER_OF_COLS) {
        const value = clamp(action.value, 0, 127);
        if (state.data[action.row][action.col] !== value) {
          return { ...state, data: state.data.map((row, i) => {
            return action.row !== i ? row : [].concat(row.slice(0, action.col), value, row.slice(action.col + 1))
          })};
        }
      }
    }
    break;
  case types.VALUE_SHIFT:
    if (0 <= action.row && action.row < (NUMBER_OF_ROWS - 1)) {
      if (0 <= action.col && action.col < NUMBER_OF_COLS) {
        const value = clamp(state.data[action.row][action.col] + action.shift, 0, 127);
        if (state.data[action.row][action.col] !== value) {
          return { ...state, data: state.data.map((row, i) => {
            return action.row !== i ? row : [].concat(row.slice(0, action.col), value, row.slice(action.col + 1))
          })};
        }
      }
    }
    break;
  case types.VALUE_SET:
    if (0 <= action.row && action.row < NUMBER_OF_ROWS) {
      if (0 <= action.col && action.col < NUMBER_OF_COLS) {
        const value = clamp(action.value, 0, 127);
        if (state.data[action.row][action.col] !== value) {
          return { ...state, data: state.data.map((row, i) => {
            return action.row !== i ? row : [].concat(row.slice(0, action.col), value, row.slice(action.col + 1))
          })};
        }
      }
    }
    break;
  case types.CURSOR_VALUE_SET:
    if (0 <= action.index && action.index < state.cursor.length) {
      if (state.cursor[action.index] !== action.value) {
        return { ...state, cursor: [].concat(state.cursor.slice(0, action.index), action.value, state.cursor.slice(action.index + 1)) };
      }
    }
    break;
  case types.TEMPLATE_VALUE_CHANGE:
    if (state.template !== action.value) {
      return { ...state, template: action.value };
    }
    break;
  }

  return state;
};
