import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import topTracksReducer from "./topTracksReducer";
import newAlbumsReducer from "./newAlbumsReducer";
import searchReducer from "./searchReducer";
import createPlaylistReducer from "./createPlaylistReducer";
import addedTracksReducer from "./addedTracksReducer";

export default combineReducers({
    userData:userDataReducer,
    topTracks:topTracksReducer,
    newReleases:newAlbumsReducer,
    searchResults:searchReducer,
    created:createPlaylistReducer,
    addedTracks:addedTracksReducer
});