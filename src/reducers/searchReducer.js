var image = require('../images/missingImage.PNG')
const initialState={
    data:null
}

function assigning(items,type){
    let newItems = [];
    if(items.length===0){
        return null;
    }
    if(type==="artists"){
        let itemObj = {};
        itemObj = Object.assign({},itemObj,items[0]);
        let newObj = {};
        let checkImage="";
        if( itemObj.images===undefined){
            checkImage=image;
        }
        else{
            checkImage=itemObj.images[0].url
        }
        newObj = Object.assign({},newObj,{
            name:itemObj.name,
            url:itemObj.external_urls.spotify,
            images:checkImage
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
                let checkImage="";
                if(itemObj.images[0].url===undefined){
                    checkImage=image;
                }
                else{
                    checkImage=itemObj.images[0].url
                }
                newObj = Object.assign({},newObj,{
                    artists:itemArtists,
                    url:itemObj.external_urls.spotify,
                    images:checkImage,
                    name:itemObj.name,
                    release_date:itemObj.release_date
                })
            }
            else if(type==="playlists"){
                let checkImage="";
                if(itemObj.images[0].url===undefined){
                    checkImage=image;
                }
                else{
                    checkImage=itemObj.images[0].url
                }
                newObj = Object.assign({},newObj,{
                    description:itemObj.description,
                    images:checkImage,
                    title:itemObj.name,
                    url:itemObj.external_urls.spotify
                })
            }
            else if(type==="tracks"){
                let checkImage="";
                if(itemObj.album.images[0].url===undefined){
                    checkImage=image;
                }
                else{
                    checkImage=itemObj.album.images[0].url
                }
                newObj = Object.assign({},newObj,{
                    artists:itemArtists,
                    url:itemObj.external_urls.spotify,
                    images:checkImage,
                    title:itemObj.name,
                    uri:itemObj.uri,
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
            if(itemsAlbums!==null || itemsPlaylists!==null || itemsTracks!==null || itemsArtists!==null){
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
            }
            else{
                return state
            }
        case "UNMOUNT_SEARCH":
            return{
                ...state,
                data:null
            }
        default:
            return state
    }
}
export default searchReducer;