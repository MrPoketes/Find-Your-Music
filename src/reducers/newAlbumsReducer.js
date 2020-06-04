const initialState={
    albums:null
}

const newAlbumReducer = (state=initialState,action)=>{
    switch(action.type){
        case "FETCH_NEW_ALBUMS":
            return{
                ...state,
                albums:action.payload
            };
        default:
            return state;
    }
}
export default newAlbumReducer;