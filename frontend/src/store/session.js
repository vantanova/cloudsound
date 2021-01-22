import fetch from "./csrf";
import { dispatch, getState } from "react-redux";

function getSession() {
  return function (dispatch, getState) {
    return fetch("/api/session", "POST").then(function () {
      dispatch(setSessionUser(res.data));
    });
  };
}

export function setSessionUser(session) {
  return { type: "SET_SESSION_USER", session };
}

export function removeSessionUser(session) {
  return { type: "REMOVE_SESSION_USER", session };
}

const defaultState = { user: null };

export const sessionReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case "SET_SESSION_USER":
      return { ...state, user: action.session };
    case "REMOVE_SESSION_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};
