const initialState ={
    tracks:{},
}
const topTracksReducer = (state=initialState,action)=>{
    switch(action.type){
        case "FETCH_TOP_TRACKS":
            let newItems = [];
            for(var i=0;i!==action.payload.length;i++){
                let itemObj = {};
                let itemArtists = [];
                itemObj = Object.assign({},itemObj,action.payload[i]);
                for(var j=0;j!==itemObj.album.artists.length;j++){
                    itemArtists.push(itemObj.album.artists[j].name);
                }
                let newObj = {};
                newObj = Object.assign({},newObj,{
                    artists:itemArtists,
                    url: itemObj.external_urls.spotify,
                    images:itemObj.album.images[0].url,
                    title:itemObj.name,
                    release_data:itemObj.album.release_date
                });
                newItems.push(newObj);

            }
            let tracksObj = {};
            tracksObj = Object.assign({},tracksObj,{
                items:newItems})
            return{
                ...state,
                tracks:tracksObj
            }

        default:
            return state;
    }
}
export default topTracksReducer;