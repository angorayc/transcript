import Enzyme from "enzyme";
import { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";
import { stub, spy } from 'sinon';
import App from "../index.js";

Enzyme.configure({ adapter: new Adapter() });


describe("Transcript", () => {
  it("should render", () => {
    const app = shallow(<App />);
    expect(app.props().children.length).toEqual(2);
  });

  it("should render next page button", () => {
    const app = shallow(<App />);
    expect(app.find('.btn').length).toEqual(1);
  })

  it("shoule loadMore on button clicked", () => {
    spy(App.prototype, '_handleNextPage');
    const wrapper = shallow(<App  />);
    wrapper.find('button').simulate('click');
    expect(App.prototype._handleNextPage).toHaveProperty('callCount', 1);
  })

  it("should render correct numbers of paragarph", () => {
    const wrapper = shallow(<App  />);
    wrapper.setState({
      transcript: {
        2: [
          { name: 'Emma', para: 'p2-0' },
          { name: 'Woodhouse', para: 'p2-0' }
        ],
        3: [
          { name: 'She', para: 'p3-0' },
          { name: 'was', para: 'p3-1' }
        ]
      },
      currentPage: 3
    });
    expect(wrapper.find('.list-para').props().children).toHaveLength(3);
  })
});
