const initialState ={
    playback:null
}
const playerReducer = (state=initialState,action) =>{
    switch(action.type){
        case "GET_PLAYBACK":
            return{
                ...state,
                playback:action.payload
            }
        case "PLAY":
            return{
                ...state,
            }
        case "GET_CURRENT_PLAYING_TRACK":
            let newObj = {};
            newObj = Object.assign({},newObj,{
                image:action.payload.item.album.images[0].url,
                artist:action.payload.item.artists[0].name,
                title:action.payload.item.name
            })
            return{
                ...state,
                track:newObj
            }
        default:
            return state
    }
}
export default playerReducer;