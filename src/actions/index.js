
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






