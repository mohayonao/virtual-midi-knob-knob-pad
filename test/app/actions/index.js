import "run-with-mocha";
import assert from "assert";
import * as actionCreators from "../../../src/app/actions";
import * as types from "../../../src/common/ActionTypes";

describe("actions", () => {
  it("valueSet should create VALUE_SET action", () => {
    const actual = actionCreators.valueSet(1, 2, 3);
    const expected = { type: types.VALUE_SET, row: 1, col: 2, value: 3 };

    assert.deepEqual(actual, expected);
  });

  it("cursorValueSet should create CURSOR_VALUE_SET action", () => {
    const actual = actionCreators.cursorValueSet(1, 2);
    const expected = { type: types.CURSOR_VALUE_SET, index: 1, value: 2 };

    assert.deepEqual(actual, expected);
  });
});
