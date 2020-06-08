const initialState={
    items:null
}
const addedTracksReducer = (state=initialState,action)=>{
    switch(action.type){
        case "ADD_TRACK_TO_PLAYLIST":
            return{
                ...state,
                items:action.payload
            };
        default:
            return state;
    }
}
export default addedTracksReducer;