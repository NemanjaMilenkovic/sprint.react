import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";

import App from "../components/App";
import { listObjects, getSingleObject } from "../utils/";

import AllPhotos from "../components/AllPhotos";
import Navbar from "../components/Navbar";
import SinglePhoto from "../components/SinglePhoto";

jest.mock("../utils/");

describe("The App component", () => {
  let componentDidMountSpy;
  let getSingleObjectSpy;
  let listObjectsSpy;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App currentView="AllPhotos" />);
  });

  it("renders the App component to the DOM", () => {
    expect(wrapper.find(".app").exists()).toEqual(true);
  });

  it("sets an initial state containing a currentView string, photos array, and selectedPhoto string which defaults to undefined", () => {
    expect(wrapper.state().currentView).toEqual("AllPhotos");
    expect(Array.isArray(wrapper.state().photos)).toEqual(true);
    expect(wrapper.state().selectedPhoto).toEqual(undefined);
  });

  it("makes a call to the componentDidMount lifecycle method", () => {
    sinon.spy(App.prototype, "componentDidMount");
    wrapper = mount(<App currentView="AllPhotos" />);
    expect(App.prototype.componentDidMount.calledOnce).toEqual(true);
  });

  it("makes a call to the listObjects and getSingleObject utility methods when mounted, adding the array of photos from S3 into the component's state", () => {
    expect(wrapper.state("photos")).toEqual([
      "First TestReturnString",
      "Second TestReturnString"
    ]);
  });

  it("renders the Navbar component", () => {
    expect(
      wrapper
        .find(".app")
        .children()
        .find(Navbar)
        .exists()
    ).toEqual(true);
  });

  it("passes two functions into the Navbar component as props", () => {
    expect(
      Object.keys(
        wrapper
          .find(".app")
          .children()
          .find(Navbar)
          .props()
      ).length
    ).toEqual(2);
  });

  it("gives the Navbar component a callback titled getPhotos", () => {
    expect(
      wrapper
        .find(".app")
        .children()
        .find(Navbar)
        .props()
        .hasOwnProperty("getPhotos")
    ).toEqual(true);
    expect(
      typeof wrapper
        .find(".app")
        .children()
        .find(Navbar)
        .props().getPhotos
    ).toEqual("function");
  });

  it("modifies its own state, setting the photos property to an array of received items when the getPhotos callback if the Navbar is invoked", () => {
    wrapper = mount(<App currentView="AllPhotos" />);
    wrapper.setState({ photos: [] });
    expect(wrapper.state().photos).toEqual([]);
    wrapper
      .find(Navbar)
      .props()
      .getPhotos();
    setTimeout(() => {
      expect(wrapper.state().photos).toEqual([
        "First TestReturnString",
        "Second TestReturnString"
      ]);
    }, 500);
  });

  it("gives the Navbar component a callback titled goHome", () => {
    expect(
      wrapper
        .find(".app")
        .children()
        .find(Navbar)
        .props()
        .hasOwnProperty("goHome")
    ).toEqual(true);
    expect(
      typeof wrapper
        .find(".app")
        .children()
        .find(Navbar)
        .props().goHome
    ).toEqual("function");
  });

  it("modifies its own state, setting the currentView property to AllPhotos when the goHome callback of Navbar is invoked", () => {
    wrapper.setState({
      currentView: "SinglePhoto",
      selectedPhoto: "test"
    });

    wrapper
      .find(".app")
      .children()
      .find(Navbar)
      .props()
      .goHome();

    expect(wrapper.state().currentView).toEqual("AllPhotos");
  });

  it("renders the AllPhotos component by default when the currentView prop is set to AllPhotos", () => {
    expect(
      wrapper
        .find(".app")
        .children()
        .find(AllPhotos)
        .exists()
    ).toEqual(true);
  });

  it("passes two props to the AllPhotos component", () => {
    expect(
      Object.keys(
        wrapper
          .find(".app")
          .children()
          .find(AllPhotos)
          .props()
      ).length
    ).toEqual(2);
  });

  it("passes the photos array in its own state as a prop to the AllPhotos component", () => {
    expect(
      wrapper
        .find(".app")
        .children()
        .find(AllPhotos)
        .props().photos
    ).toEqual(wrapper.state().photos);
  });

  it("passes a selectPhoto callback to the AllPhotos component as a prop", () => {
    expect(
      typeof wrapper
        .find(".app")
        .children()
        .find(AllPhotos)
        .props().selectPhoto
    ).toEqual("function");
  });

  it("modifies its own state, setting the currentView property to SinglePhoto and assign it a photo based on its index in the array when the selectPhoto callback of AllPhotos is invoked", () => {
    wrapper
      .find(".app")
      .children()
      .find(AllPhotos)
      .props()
      .selectPhoto(1);

    expect(wrapper.state().currentView).toEqual("SinglePhoto");
    expect(wrapper.state().selectedPhoto).toEqual("Second TestReturnString");
  });

  it("does NOT render the SinglePhoto component by default", () => {
    expect(
      wrapper
        .find(".app")
        .children()
        .find(SinglePhoto)
        .exists()
    ).toEqual(false);
  });

  it("renders the SinglePhoto component if the currentView prop is set to SinglePhoto", () => {
    wrapper.setState({ currentView: "SinglePhoto", selectedPhoto: "test" });
    expect(
      wrapper
        .find(".app")
        .children()
        .find(SinglePhoto)
        .exists()
    ).toEqual(true);
  });

  it("passes the selectedPhoto value in its own state as a prop to the SinglePhoto component", () => {
    wrapper.setState({ currentView: "SinglePhoto", selectedPhoto: "test" });
    expect(
      wrapper
        .find(".app")
        .children()
        .find(SinglePhoto)
        .props().selectedPhoto
    ).toEqual(wrapper.state().selectedPhoto);
  });

  it("does NOT render the AllPhotos component if the currentView prop is set to singlePhoto", () => {
    wrapper.setState({ currentView: "SinglePhoto", selectedPhoto: "test" });
    expect(
      wrapper
        .find(".app")
        .children()
        .find(AllPhotos)
        .exists()
    ).toEqual(false);
  });
});
