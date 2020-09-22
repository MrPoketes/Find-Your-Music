// User
export const fetchUserData = (accessToken) => (dispatch) =>{
    fetch('https://api.spotify.com/v1/me',{
        headers:{'Authorization':'Bearer '+ accessToken}})
        .then(res=>res.json())
        .then(data=>
            dispatch({
                type:"FETCH_USER_DATA",
                payload:data
            }))
}

// Main menu

export const fetchTopTracks = (spotify) => (dispatch) =>{
    spotify.getMyTopTracks({limit:12},function(err,tracks){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"FETCH_TOP_TRACKS",
                payload:tracks.items
            })
        }
    })
}
export const fetchNewAlbums = (spotify) => (dispatch) =>{
    spotify.getNewReleases({limit:12},function(err,albums){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"FETCH_NEW_RELEASES",
                payload:albums.albums.items
            })
        }
    })
}

// Search

export const search = (spotify,input,limit) => (dispatch) =>{
    spotify.search(input,['album','playlist','track','artist'],{limit:limit},function(err,searchData){
        if(err){
            return;
        }
        else{
            dispatch({
                type:"SEARCH",
                payload:searchData
            })
        }
    })
}

// Playlist actions

export const createNewPlaylist = (spotify,user_id,name,description) => (dispatch) =>{
    spotify.createPlaylist(user_id,{name:name,description:description},function(err,playlist){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"CREATE_NEW_PLAYLIST",
                payload:playlist
            })
        }
    })
}
export const addTrackToPlaylist = (spotify,uri,playlistId) => (dispatch) =>{
    spotify.addTracksToPlaylist(playlistId,uri,function(err,add){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"ADD_TRACK_TO_PLAYLIST",
                payload:add
            })
        }
    })
}
export const removeTrackFromPlaylist = (spotify,playlistId,uri) => (dispatch) =>{
        spotify.removeTracksFromPlaylist(playlistId,uri,function(err,removed){
            if(err){
                console.log(err);
            }
            else{
                dispatch({
                    type:"REMOVE_TRACK_FROM_PLAYLIST",
                    payload:removed
                })
            }
        })
    }
export const fetchUserPlaylists = (spotify,userId) => (dispatch) =>{
    spotify.getUserPlaylists(userId,{limit:50},function(err,playlists){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"FETCH_USER_PLAYLISTS",
                payload:playlists.items
            })
        }
    })
}
export const fetchPlaylistTracks = (spotify,playlistId) => (dispatch) =>{
    spotify.getPlaylistTracks(playlistId,function(err,tracks){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"FETCH_PLAYLIST_TRACKS",
                payload:tracks.items
            })
        }
    })
}
export const deletePlaylist = (spotify,playlistId) => (dispatch) =>{
    spotify.unfollowPlaylist(playlistId,function(err,unfollow){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"DELETE_PLAYLIST",
                payload:unfollow
            })
        }
    })
}
export const fetchMergeTracks = (spotify,playlistId) => (dispatch) =>{
    spotify.getPlaylistTracks(playlistId,function(err,tracks){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"FETCH_MERGE_TRACKS",
                payload:tracks.items
            })
        }
    })
}
export const updatePlaylistDetails = (spotify,data,playlistId) => (dispatch) =>{
    spotify.changePlaylistDetails(playlistId,data,function(err,update){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"UPDATE_DETAILS",
                payload:update
            })
        }
    })
}
// Player
export const playTrack = (spotify,uri) => (dispatch) =>{
    if(uri.includes("track")){
        spotify.play({uris:[uri]},function(err,play){
            if(err){
                console.log(err);
            }
            else{
                dispatch({
                    type:"PLAY",
                })
            }
        })
    }
    else{
        spotify.play({context_uri:uri},function(err,play){
            if(err){
                console.log(err);
            }
            else{
                dispatch({
                    type:"PLAY",
                })
            }
        })
    }
}

export const currentPlayingTrack = (spotify) => (dispatch)=>{
    spotify.getMyCurrentPlayingTrack(function(err,track){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"GET_CURRENT_PLAYING_TRACK",
                payload:track
            })
        }
    })
}

// Unmounting

export const unmountSearch = () => (dispatch) =>{
    dispatch({
        type:"UNMOUNT_SEARCH"
    })
}
export const unmountUserPlaylist = () => (dispatch) =>{
    dispatch({
        type:"UNMOUNT_USER_PLAYLIST"
    })
}
export const unmountCreated = () => (dispatch) =>{
    dispatch({
        type:"UNMOUNT_CREATED"
    })
}



