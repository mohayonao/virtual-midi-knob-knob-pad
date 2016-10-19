import "run-with-mocha";
import assert from "assert";
import * as actionCreators from "../../../src/client/actions";
import * as types from "../../../src/common/ActionTypes";

describe("actions", () => {
  it("setState should create SET_STATE action", () => {
    const actual = actionCreators.setState({ value: 100 });
    const expected = { type: types.SET_STATE, state: { value: 100 } };

    assert.deepEqual(actual, expected);
  });

  it("applyPatch should create APPLY_PATCH", () => {
    const actual = actionCreators.applyPatch([ { op: "add" } ]);
    const expected = { type: types.APPLY_PATCH, patch: [ { op: "add" } ] };

    assert.deepEqual(actual, expected);
  });

  it("valueChange should create VALUE_CHANGE", () => {
    const actual = actionCreators.valueChange(1, 2, 3);
    const expected = { type: types.VALUE_CHANGE, row: 1, col: 2, value: 3 };

    assert.deepEqual(actual, expected);
  });

  it("valueShift should create VALUE_SHIFT", () => {
    const actual = actionCreators.valueShift(1, 2, 3);
    const expected = { type: types.VALUE_SHIFT, row: 1, col: 2, value: 3 };

    assert.deepEqual(actual, expected);
  });

  it("cusorValueChange should create CURSOR_VALUE_CHANGE", () => {
    const actual = actionCreators.cusorValueChange(1, 2);
    const expected = { type: types.CURSOR_VALUE_CHANGE, index: 1, value: 2 };

    assert.deepEqual(actual, expected);
  });

  it("templateValueChange should create TEMPLATE_VALUE_CHANGE", () => {
    const actual = actionCreators.templateValueChange(1);
    const expected = { type: types.TEMPLATE_VALUE_CHANGE, value: 1 };

    assert.deepEqual(actual, expected);
  });

  it("selectKnob should create SELECT_KNOB", () => {
    const actual = actionCreators.selectKnob(1, 2);
    const expected = { type: types.SELECT_KNOB, row: 1, col: 2 };

    assert.deepEqual(actual, expected);
  });
});
