const initialState = {
    newPlaylist:null
}
const createPlaylistReducer = (state=initialState,action)=>{
    switch(action.type){
        case "CREATE_NEW_PLAYLIST":
            return{
                ...state,
                newPlaylist:action.payload
            }
        default:
            return state
    }
}
export default createPlaylistReducer;