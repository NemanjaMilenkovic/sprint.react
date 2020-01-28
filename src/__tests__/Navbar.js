jest.mock("../utils/");

import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";

import { saveObject } from "../utils/";

import Navbar from "../components/Navbar";
import Upload from "../components/Upload";

describe("The Navbar component", () => {
  const mockGetPhotosFunction = sinon.spy();
  const mockGoHomeFunction = sinon.spy();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Navbar
        getPhotos={() => mockGetPhotosFunction()}
        goHome={() => mockGoHomeFunction()}
      />
    );
  });

  it("renders the Navbar component to the DOM", () => {
    expect(wrapper.find(Navbar).exists()).toEqual(true);
  });

  it("renders a header with an onClick event", () => {
    expect(typeof wrapper.find(".navbar-header").props().onClick).toEqual(
      "function"
    );
  });

  it("invokes the goHome callback given to it as a prop when the header is clicked", () => {
    wrapper.find(".navbar-header").simulate("click");
    expect(mockGoHomeFunction.called).toEqual(true);
  });

  it("renders an <Upload /> component", () => {
    expect(wrapper.find(Upload).exists()).toEqual(true);
  });

  it("assigns a callback function to the Upload component as a prop titled receiveFiles", () => {
    expect(typeof wrapper.find(Upload).props().receiveFiles).toEqual(
      "function"
    );
  });

  it("invokes the getPhotos callback given to it as a prop when the receiveFiles callback of the Upload component is invoked", () => {
    spyOn(Navbar.prototype, "receiveFiles");
    wrapper = mount(
      <Navbar
        getPhotos={() => mockGetPhotosFunction()}
        goHome={() => mockGoHomeFunction()}
      />
    );
    wrapper
      .find(Upload)
      .props()
      .receiveFiles("test");
    setTimeout(() => {
      expect(Navbar.prototype.receiveFiles.called).toEqual(true);
    }, 500);
  });
});
