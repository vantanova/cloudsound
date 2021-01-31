import { fetch } from "./csrf";
import { dispatch, getState } from "react-redux";

const musicArr = [];

export function getSongs() {
  return musicArr;
}

export function addSong(song) {
  musicArr.push(song);
  return { type: "ADD_SONG", song };
}

const defaultState = { songs: null };

export default function songReducer(state = defaultState, action) {
  switch (action.type) {
    case "ADD_SONG":
      return { ...state, songs: musicArr };
    default:
      return state;
  }
}
