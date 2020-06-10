var image = require('../images/missingImage.PNG')
const initialState = {
    playlists:null,
    tracks:null,
    merge:null
}
const userPlaylistsReducer = (state=initialState,action)=>{
    switch(action.type){
        case "FETCH_USER_PLAYLISTS":
            let newItems=[];
            for(let i=0;i!==action.payload.length;i++){
                let itemObj = {};
                itemObj = Object.assign({},itemObj,action.payload[i]);
                let newObj = {};
                let imageCheck = "";
                if(itemObj.images.length===0){
                    imageCheck=image;
                }
                else{
                    imageCheck=itemObj.images[0].url
                }
                newObj = Object.assign({},newObj,{
                    uri:itemObj.uri,
                    name:itemObj.name,
                    id:itemObj.id,
                    image:imageCheck,
                    owner:itemObj.owner.display_name,
                    tracks:itemObj
                });
                newItems.push(newObj);
            }
            let playlistObj = {};
            playlistObj = Object.assign({},playlistObj,{
                items:newItems,
            })
            return{
                ...state,
                playlists:playlistObj
            }
        case "FETCH_PLAYLIST_TRACKS":
            let newItemsTracks = [];
            if(action.payload.length===0){
                return{
                    ...state,
                    tracks:{items:newItemsTracks}
                }
            }
            for(let i=0;i!==action.payload.length;i++){
                let itemObj = {};
                itemObj = Object.assign({},itemObj,action.payload[i]);
                let itemArtists = "";
                for(let j=0;j!==itemObj.track.artists.length;j++){
                    if(j!==itemObj.track.artists.length-1){
                        itemArtists+=itemObj.track.artists[j].name+", ";
                    }
                    else{
                        itemArtists+=itemObj.track.artists[j].name;
                    }
                }
                let newObj = {};
                newObj = Object.assign({},newObj,{
                    title: itemObj.track.name,
                    artists: itemArtists,
                    uri: itemObj.track.uri,
                    images:itemObj.track.album.images[0].url,
                    description:itemObj.description
                });
                newItemsTracks.push(newObj);
            }
            let trackObj = {};
            trackObj = Object.assign({},trackObj,{
                items:newItemsTracks
            });
            return{
                ...state,
                tracks:trackObj
            }
        case "FETCH_MERGE_TRACKS":
            let mergeItemsTracks = [];
            if(action.payload.length===0){
                return{
                    ...state,
                    merge:{items:mergeItemsTracks}
                }
            }
            for(let i=0;i!==action.payload.length;i++){
                let itemObj = {};
                itemObj = Object.assign({},itemObj,action.payload[i]);
                let itemArtists = "";
                for(let j=0;j!==itemObj.track.artists.length;j++){
                    if(j!==itemObj.track.artists.length-1){
                        itemArtists+=itemObj.track.artists[j].name+", ";
                    }
                    else{
                        itemArtists+=itemObj.track.artists[j].name;
                    }
                }
                let newObj = {};
                newObj = Object.assign({},newObj,{
                    title: itemObj.track.name,
                    artists: itemArtists,
                    uri: itemObj.track.uri,
                    images:itemObj.track.album.images[0].url,
                    description:itemObj.description
                });
                mergeItemsTracks.push(newObj);
            }
            let mergeObj = {};
            mergeObj = Object.assign({},mergeObj,{
                items:mergeItemsTracks
            });
            return{
                ...state,
                merge:mergeObj
            }
        case "UNMOUNT_USER_PLAYLIST":
            return{
                ...state,
                playlists:null,
                tracks:null,
                merge:null
            }
        default:
            return state
    }
}
export default userPlaylistsReducer;