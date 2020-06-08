
export const fetchUserData = (spotify) => (dispatch) =>{
    spotify.getMe(function(err,data){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"FETCH_USER_DATA",
                payload:data
            })
        }
    })
}

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

export const search = (spotify,input) => (dispatch) =>{
    spotify.search(input,['album','playlist','track','artist'],{limit:4},function(err,searchData){
        if(err){
            console.log(err);
        }
        else{
            dispatch({
                type:"SEARCH",
                payload:searchData
            })
        }
    })
}
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
    spotify.addTracksToPlaylist(playlistId,[uri],function(err,add){
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





