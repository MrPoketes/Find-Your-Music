const initialState = {
    lyrics:null
};

const lyricsReducer = (state=initialState,action) =>{
    switch(action.type){
        case "GET_LYRICS":
            if(action.payload.error==="No lyrics found"){
                let notFound = ["Not Found"];
                return {
                    ...state,
                    lyrics:notFound
                }
            }
            let newStringA = action.payload.lyrics.split('\n');
            return{
                ...state,
                lyrics:newStringA
            }
        default:
            return state;
    }
}
export default lyricsReducer;