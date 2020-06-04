
export const fetchUserData= (accessToken) => dispatch =>{
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
