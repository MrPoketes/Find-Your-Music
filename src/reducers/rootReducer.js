import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import topTracksReducer from "./topTracksReducer";
import newAlbumsReducer from "./newAlbumsReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
    userData:userDataReducer,
    topTracks:topTracksReducer,
    newReleases:newAlbumsReducer,
    searchResults:searchReducer
});