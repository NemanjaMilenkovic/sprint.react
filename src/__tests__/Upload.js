import React from "react";
import { mount } from "enzyme";

import Upload from "../components/Upload";

describe("The Upload component", () => {
  const mockFunction = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Upload receiveFiles={(file) => mockFunction(file)} />);
  });

  it("renders the Upload component to the DOM", () => {
    expect(wrapper.find(Upload).exists());
  });

  it("renders a button element", () => {
    expect(wrapper.find(".button").exists()).toEqual(true);
  });

  it("renders an input element whose type is set to accept files", () => {
    expect(wrapper.find(".file-upload-input").exists()).toEqual(true);
  });

  it("renders an input element with a ref set to fileInput", () => {
    expect(typeof wrapper.instance().fileInput).toEqual("object");
  });

  it("should call the receiveFiles function given to it as a prop when a file has been uploaded to the component", () => {
    wrapper.find(".file-upload-input").simulate("change", {
      target: {
        files: "testvalue",
      },
    });

    expect(mockFunction).toHaveBeenCalledWith("testvalue");
  });
});
