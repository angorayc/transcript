/* eslint-env jest */

import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";

import App from "../index.js";

Enzyme.configure({ adapter: new Adapter() });

describe("with enzyme", () => {
  it("contains a header element with the correct class names", () => {
    const app = shallow(<App />);
    expect(app.find("header").hasClass("stage-colours step-0")).toBeTruthy();
  });
});

describe("with snapshot testing", () => {
  it("matches the snapshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
