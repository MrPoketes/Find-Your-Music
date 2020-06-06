const initialState={
    albums:null
}

const newAlbumsReducer = (state=initialState,action)=>{
    switch(action.type){
        case "FETCH_NEW_RELEASES":
            let newItems = [];
            for(let i=0;i!==action.payload.length;i++){
                let itemObj={};
                itemObj = Object.assign({},itemObj,action.payload[i]);
                let itemArtists = [];
                for(let j=0;j!==itemObj.artists.length;j++){
                    itemArtists.push(itemObj.artists[j].name);
                }
                var newObj = Object.assign({},newObj,{
                    artist:itemArtists,
                    url:itemObj.external_urls.spotify,
                    images:itemObj.images[0].url,
                    title:itemObj.name,
                    release_date:itemObj.release_date
                });
                newItems.push(newObj);
            }
            let outputObj = {};
            outputObj = Object.assign({},outputObj,{
                items:newItems
            })
            return{
                ...state,
                albums:outputObj
            }
        default:
            return state;
    }
}
export default newAlbumsReducer;