import React from "react";
import { shallow, mount } from "enzyme";
import CheckBoxWithLabel from "./CheckBoxWithLabel";
//import TestRenderer from "react-test-renderer"; // ES6

// enzyme.configure({ adapter: new Adapter() });
test("CheckboxWithLabel changes the text after click", () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<CheckBoxWithLabel labelOn="On" labelOff="Off" />);

  expect(checkbox.find("p.propresult").text()).toEqual("Off");

  checkbox.find("input").simulate("change");
  expect(checkbox.find("p.propresult").text()).toEqual("On");
});

test("Checkboxwith label has default props", () => {
  const checkbox = mount(<CheckBoxWithLabel labelOn="On" labelOff="Off" />);

  expect(checkbox.prop("labelOn")).toBe("On");
  expect(checkbox.prop("labelOff")).toBe("Off");
});

test("Checkboxlabel has <p> with class=hello with Hello World", () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<CheckBoxWithLabel labelOn="On" labelOff="Off" />);

  let msg = checkbox.find("p.hello").text();

  expect(msg).toEqual("Hello World");
});

test("Checkboxlabel has p with Hello World", () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<CheckBoxWithLabel labelOn="On" labelOff="Off" />);
  checkbox.first();
  let msg = checkbox.find("p.hello").text();

  expect(msg).toEqual("Hello World");
});
