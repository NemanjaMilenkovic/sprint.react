import React from "react";
import { mount } from "enzyme";

import AllPhotos from "../components/AllPhotos";

jest.mock("../utils/");

describe("The AllPhotos component", () => {
  const mockFunction = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <AllPhotos
        photos={["test", "strings"]}
        selectPhoto={index => mockFunction(index)}
      />
    );
  });

  it("renders an array of images based on the length of the photos array assigned to it as a prop", () => {
    expect(wrapper.find(".imageCell").length).toEqual(2);
  });

  it("makes a callback to its selectPhoto prop when an image has been clicked", () => {
    wrapper
      .find(".image")
      .at(1)
      .simulate("click");
    expect(mockFunction).toHaveBeenCalledWith(1);
  });
});
