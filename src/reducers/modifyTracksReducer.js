const initialState={
    items:null
}
const modifyTracksReducer = (state=initialState,action)=>{
    switch(action.type){
        case "ADD_TRACK_TO_PLAYLIST":
            return{
                ...state,
                items:action.payload
            };
        case "REMOVE_TRACK_FROM_PLAYLIST":
            return{
                ...state,
                items:action.payload
            }
        default:
            return state;
    }
}
export default modifyTracksReducer;