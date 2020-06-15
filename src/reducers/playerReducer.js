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
        default:
            return state
    }
}
export default playerReducer;