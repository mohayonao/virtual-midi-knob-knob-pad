import "run-with-mocha";
import assert from "assert";
import clone from "clone";
// import * as actionCreators from "../../../src/client/actions";
import reducer from "../../../src/app/reducers";

describe("reducer", () => {
  it("init state", () => {
    const initState = clone(reducer(undefined, {}));

    assert(typeof initState === "object");
  });
});