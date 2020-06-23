import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import topTracksReducer from "./topTracksReducer";
import newAlbumsReducer from "./newAlbumsReducer";
import searchReducer from "./searchReducer";
import createPlaylistReducer from "./createPlaylistReducer";
import modifyTracksReducer from "./modifyTracksReducer";
import userPlaylistsReducer from "./userPlaylistsReducer";
import playerReducer from "./playerReducer";
import lyricsReducer from "./lyricsReducer";

export default combineReducers({
    userData:userDataReducer,
    topTracks:topTracksReducer,
    newReleases:newAlbumsReducer,
    searchResults:searchReducer,
    created:createPlaylistReducer,
    modifiedTracks:modifyTracksReducer,
    userPlaylist:userPlaylistsReducer,
    player:playerReducer,
    lyrics:lyricsReducer
});