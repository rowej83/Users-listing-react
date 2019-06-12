// import React from "react";
// import { shallow } from "enzyme";
// import CheckBoxWithLabel from "./CheckBoxWithLabel";

const sum = (x, y) => x + y;
describe("SUM Function", () => {
  test("2+2=4", () => {
    expect(sum(2, 2)).toBe(4);
  });

  test("4+4=8", () => {
    expect(sum(4, 4)).toBe(8);
  });
});

test("outside sum", () => {
  expect(sum(1, 1)).toBe(2);
});
