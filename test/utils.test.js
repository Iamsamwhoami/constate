import {
  mapSetStateToActions,
  mapArgumentToFunctions,
  parseUpdater
} from "../src/utils";

test("mapSetStateToActions", () => {
  const setState = jest.fn(fn => fn(2));
  const actionsMap = {
    foo: n => state => ({ n: state + n })
  };
  const result = mapSetStateToActions(setState, actionsMap);
  expect(result.foo(2)).toEqual({ n: 4 });
  expect(setState).toHaveBeenCalledWith(expect.any(Function), undefined, "foo");
});

test("mapArgumentToFunctions", () => {
  const state = { foo: 1 };
  const selectorsMap = {
    foo: n => s => s.foo + n
  };
  const result = mapArgumentToFunctions(state, selectorsMap);
  expect(result.foo(1)).toBe(2);
});

test("mapArgumentToFunctions with argument as function", () => {
  const argument = jest.fn();
  const fn = () => () => {};
  const fnMap = { fn };
  const result = mapArgumentToFunctions(argument, fnMap);
  result.fn();
  expect(argument).toHaveBeenCalledWith(fn, "fn");
});

test("parseUpdater", () => {
  expect(parseUpdater({ foo: "bar" })).toEqual({ foo: "bar" });
  expect(
    parseUpdater(state => ({ count: state.count + 1 }), { count: 10 })
  ).toEqual({ count: 11 });
});
