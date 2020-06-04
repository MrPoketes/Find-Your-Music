import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import newAlbumReducer from "./newAlbumsReducer";

export default combineReducers({
    userData:userDataReducer,
    newAlbum:newAlbumReducer
});