const initialState={
    data:null
}

function assigning(items,type){
    let newItems = [];
    if(type==="artists"){
        let itemObj = {};
        itemObj = Object.assign({},itemObj,items[0]);
        let newObj = {};
        newObj = Object.assign({},newObj,{
            name:itemObj.name,
            url:itemObj.external_urls.spotify,
            images:itemObj.images[0].url
        })
        newItems.push(newObj)
    }
    else{
        for(let i=0;i!==items.length;i++){
            let itemObj = {};
            itemObj = Object.assign({},itemObj,items[i]);
            let itemArtists = "";
            if(type==="albums" || type==="tracks"){
                for(let j=0;j!==itemObj.artists.length;j++){
                    if(j!==itemObj.artists.length-1){
                        itemArtists+=itemObj.artists[j].name+", ";
                    }
                    else{
                        itemArtists+=itemObj.artists[j].name;
                    }
                }
            }
            let newObj = {};
            if(type==="albums"){
                newObj = Object.assign({},newObj,{
                    artists:itemArtists,
                    url:itemObj.external_urls.spotify,
                    images:itemObj.images[0].url,
                    name:itemObj.name,
                    release_date:itemObj.release_date
                })
            }
            else if(type==="artists"){
                newObj = Object.assign({},newObj,{
                    name:itemObj.name,
                    url:itemObj.external_urls.spotify,
                    images:itemObj.images[0]
                })
            }
            else if(type==="playlists"){
                newObj = Object.assign({},newObj,{
                    description:itemObj.description,
                    images:itemObj.images[0].url,
                    title:itemObj.name,
                    url:itemObj.external_urls.spotify
                })
            }
            else if(type==="tracks"){
                newObj = Object.assign({},newObj,{
                    artists:itemArtists,
                    url:itemObj.external_urls.spotify,
                    images:itemObj.album.images[0].url,
                    title:itemObj.name,
                    uri:itemObj.uri
                })
            }
            newItems.push(newObj);
        }
    }
    return newItems
}

const searchReducer = (state=initialState,action) =>{
    switch(action.type){
        case "SEARCH":
            let itemsAlbums = assigning(action.payload.albums.items,"albums");
            let itemsPlaylists = assigning(action.payload.playlists.items,"playlists");
            let itemsTracks = assigning(action.payload.tracks.items,"tracks");
            let itemsArtists = assigning(action.payload.artists.items,"artists");
            let obj = {};
            obj = Object.assign({},obj,{
                albums:itemsAlbums,
                artists:itemsArtists,
                playlists:itemsPlaylists,
                tracks:itemsTracks
            })
            return{
                ...state,
                data:obj
            }
            
        default:
            return state
    }
}
export default searchReducer;