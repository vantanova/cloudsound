import { fetch } from "./csrf";
import { dispatch, getState } from "react-redux";

export function login({ credential, password }) {
  return async function (dispatch, getState) {
    const session = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    dispatch(setSessionUser(session.data.user));
    return session;
  };
}

export function setSessionUser(session) {
  return { type: "SET_SESSION_USER", session };
}

export function removeSessionUser(session) {
  return { type: "REMOVE_SESSION_USER", session };
}

const defaultState = { user: null };

export default function sessionReducer(state = defaultState, action) {
  let newState;
  switch (action.type) {
    case "SET_SESSION_USER":
      return { ...state, user: action.session };
    case "REMOVE_SESSION_USER":
      return { ...state, user: null };
    default:
      return state;
  }
}
