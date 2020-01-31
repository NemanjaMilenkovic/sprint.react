import { createStore } from "redux";

const initialState = {
  currentView: "ALL_PHOTOS",
  photos: [],
  selectedPhoto: "",
  loading: ""
};
const reducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "SET_PHOTOS":
      newState.photos = action.photos;
      newState.currentView = "ALL_PHOTOS";
      return newState;
    case "SET_VIEW":
      newState.currentView = action.view;
      return newState;
    case "SET_LOADING":
      newState.loading = action.loading;
      newState.currentView = "LOADING";
      return newState;
    case "SET_SELECTED_PHOTO":
      newState.selectedPhoto = action.photo;
      newState.currentView = "SINGLE_PHOTO";
      return newState;
    default:
      return newState;
  }
};

export function createSetPhotosAction(photos) {
  return { type: "SET_PHOTOS", photos };
}
export function createSetLoadingAction(loading) {
  return { type: "SET_LOADING", loading };
}
export function createSetViewAction(view) {
  return { type: "SET_VIEW", view };
}
export function createSetSelectedPhotoAction(photo) {
  return { type: "SET_SELECTED_PHOTO", photo };
}
export const store = createStore(reducer, initialState);
