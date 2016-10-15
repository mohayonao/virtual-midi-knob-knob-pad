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
});
