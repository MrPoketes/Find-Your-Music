import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import topTracksReducer from "./topTracksReducer";
export default combineReducers({
    userData:userDataReducer,
    topTracks:topTracksReducer
});