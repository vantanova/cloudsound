import { fetch } from "./csrf";
import { dispatch, getState } from "react-redux";

export function profilePageFetch(userId) {
  return async function (dispatch, getState) {
    const profile = await fetch(`/api/profile/${userId}`);
    dispatch(setSessionProfile(profile.data));
    return profile;
  };
}

export const remove = () => async (dispatch) => {
  console.log("inside thunk");
  dispatch(removeSessionProfile());
};

export function setSessionProfile(profile = null) {
  return { type: "SET_SESSION_PROFILE", profile };
}

export function removeSessionProfile() {
  console.log("inside action creator");
  return { type: "REMOVE_SESSION_PROFILE", payload: "" };
}

const defaultState = { profile: null };

export default function profileReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case "SET_SESSION_PROFILE":
      return { ...state, profile: action.profile };
    case "REMOVE_SESSION_PROFILE":
      console.log("hit");
      newState.profile = null;
      return newState;
    default:
      return state;
  }
}
