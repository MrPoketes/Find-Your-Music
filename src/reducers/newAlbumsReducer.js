const initialState={
    albums:{},
    items:{},
    artist:{},
    url:{},
    images:{},
    name:{},
    release_data:{}
}
const newAlbumReducer = (state=initialState,action)=>{
    switch(action.type){
        case "FETCH_NEW_ALBUMS":
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
                    images:itemObj.images,
                    name:itemObj.name,
                    release_date:itemObj.release_data
                });
                newItems.push(newObj);
            }
            return Object.assign({},initialState.albums,{
                items:newItems
            });
        default:
            return state;
    }
}
export default newAlbumReducer;
