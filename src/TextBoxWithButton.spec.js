import React from "react";
import { shallow, mount } from "enzyme";
import TextBoxWithButton from "./TextBoxWithButton";
import { fireEvent, render } from "@testing-library/react";

describe("Tests for TexBoxWithButton", () => {
  it("Has initial values for state", () => {
    const textbox = render(<TextBoxWithButton />);

    // expect(textbox.state().input).toBe("initial state");
  });

  it("Has default props that load", () => {
    const tempProps = {
      name: "Jason",
      age: 21
    };
    const tempArray = [];
    const textbox = mount(<TextBoxWithButton {...tempProps} />);
    expect(textbox.props()).toMatchObject(tempProps);
    expect(textbox.find("p.inputcheck").text()).toBe("Jason");
  });
});
