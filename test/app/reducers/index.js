import "run-with-mocha";
import assert from "assert";
import reducer from "../../../src/app/reducers";
import { velocity, isKnob } from "../../../src/app/reducers";
import * as types from "../../../src/common/ActionTypes";

describe("reducer", () => {
  it("init state", () => {
    const initState = reducer(undefined, {});

    assert(typeof initState === "object");
  });

  it("VALUE_SET", () => {
    const state = { data: [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ] };
    const action = { type: types.VALUE_SET, row: 1, col: 2, value: 3 };
    const nextState = reducer(state, action);
    const expected = { data: [ [ 0, 0, 0 ], [ 0, 0, 3 ], [ 0, 0, 0 ] ] };

    assert(state !== nextState);
    assert.deepEqual(nextState, expected);
  });

  it("VALUE_CHANGE", () => {
    const state = { data: [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ] };
    const action = { type: types.VALUE_CHANGE, row: 1, col: 2, value: 3 };
    const nextState = reducer(state, action);
    const expected = { data: [ [ 0, 0, 0 ], [ 0, 0, 3 ], [ 0, 0, 0 ] ] };

    assert(state !== nextState);
    assert.deepEqual(nextState, expected);
  });

  it("VALUE_SHIFT", () => {
    const state = { data: [ [ 10, 10, 10 ], [ 10, 10, 10 ], [ 10, 10, 10 ] ] };
    const action = { type: types.VALUE_SHIFT, row: 1, col: 2, value: 3 };
    const nextState = reducer(state, action);
    const expected = { data: [ [ 10, 10, 10 ], [ 10, 10, 13 ], [ 10, 10, 10 ] ] };

    assert(state !== nextState);
    assert.deepEqual(nextState, expected);
  });

  it("CURSOR_VALUE_SET", () => {
    const state = { cursor: [ 0, 0, 0, 0 ] };
    const action = { type: types.CURSOR_VALUE_SET, index: 1, value: 2 };
    const nextState = reducer(state, action);
    const expected = { cursor: [ 0, 2, 0, 0 ] };

    assert(state !== nextState);
    assert.deepEqual(nextState, expected);
  });

  it("TEMPLATE_VALUE_CHANGE", () => {
    const state = { template: 0 };
    const action = { type: types.TEMPLATE_VALUE_CHANGE, value: 2 };
    const nextState = reducer(state, action);
    const expected = { template: 2 };

    assert(state !== nextState);
    assert.deepEqual(nextState, expected);
  });

  describe("velocity", () => {
    it("range", () => {
      assert(velocity( -1) ===   0);
      assert(velocity(  0) ===   0);
      assert(velocity(127) === 127);
      assert(velocity(128) === 127);
    });
  });

  describe("isKnob", () => {
    it("range", () => {
      assert(isKnob(0) === true);
      assert(isKnob(1) === true);
      assert(isKnob(2) === false);
    });
  });
});
