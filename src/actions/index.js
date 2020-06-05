
export const fetchUserData = (accessToken) => (dispatch) =>{
    fetch('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer ' + accessToken}})
            .then(response => response.json())
            .then(data => 
                dispatch({
                    type:"FETCH_USER_DATA",
                    payload: data
          })
        );
};
export const fetchNewAlbums = (accessToken) => dispatch =>{
    fetch('https://api.spotify.com/v1/browse/new-releases?limit=5',{
        headers:{'Authorization': 'Bearer ' + accessToken}})
            .then(res => res.json())
            .then(albums =>
                dispatch({
                    type:"FETCH_NEW_ALBUMS",
                    payload:albums.albums.items
            })
        );
}

