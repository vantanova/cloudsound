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
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  dispatch(setSessionUser(response.data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeSessionUser());
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setSessionUser(res.data.user));
  return res;
};

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
