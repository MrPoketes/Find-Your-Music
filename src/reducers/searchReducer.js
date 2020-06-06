const initialState={
    data:null
}
const searchReducer = (state=initialState,action) =>{
    switch(action.type){
        case "SEARCH":
            return{
                ...state,
                data:action.payload
            }
        default:
            return state
    }
}
export default searchReducer;