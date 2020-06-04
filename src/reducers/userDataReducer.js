const initialState={
    data:null
}

const userDataReducer = (state=initialState,action)=>{
    switch(action.type){
        case "FETCH_USER_DATA":
            return{
                ...state,
                data:action.payload
            };
        default:
            return state;
    }
}
export default userDataReducer;