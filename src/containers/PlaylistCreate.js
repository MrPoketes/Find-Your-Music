import React,{Component} from "react";
import "../css/style.css";
import * as SpotifyWebApi from "spotify-web-api-js";
import {createNewPlaylist,search,addTrackToPlaylist,removeTrackFromPlaylist,unmountCreated,unmountSearch,updatePlaylistDetails,playTrack} from "../actions/index.js";
import {connect} from "react-redux";
import {Container,Row,Col,Button} from "react-bootstrap";
import SearchBar from "../components/SearchComponents/SearchBar";
import SearchItemTemplate from "../components/SearchComponents/SearchItemTemplate";
import PlaylistForm from "../components/Playlists/PlaylistForm";
import PlaylistTrackTemplate from "../components/Playlists/PlaylistTrackTemplate";
import { LinkContainer } from "react-router-bootstrap";
import PlaylistDetails from "../components/Playlists/PlaylistDetails";
// Global variables
var spotifyApi = new SpotifyWebApi();
let input = "";
var accessToken = "";
let songs = {};
let newItems = [];
class PlaylistCreate extends Component{
    constructor(props){
        super(props);
        accessToken = this.props.accessToken;
        spotifyApi.setAccessToken(accessToken);
        // Handler functions
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDetailUpdate = this.handleDetailUpdate.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }
    componentWillUnmount(){
        songs={};
        this.props.unmountCreated();
        this.props.unmountSearch();
    }
    // Form Submit
    handleFormSubmit(name,description){
        this.props.createNewPlaylist(spotifyApi,this.props.user.id,name,description)
    }
    // SearchBar function
    handleSearch(value){   
        input = value;
        if(input!==""){
          this.props.search(spotifyApi,input,12);
        }
    }
    // Handling adding a track to a playlist
    handleAdd(image,name,title,link){
        this.props.addTrackToPlaylist(spotifyApi,[link],this.props.playlist.id);
        // Assigning the track to a variable so it can be shown
        let newObj = {};
        let songObj = {};
        newObj = Object.assign({},newObj,{
            image:image,
            name:name,
            title:title,
            uri:link,
        })
        newItems.push(newObj);
        songs = newItems;
        songObj = Object.assign({},songObj,{
            items:newItems
        })
        songs = songObj
    }
    // Handling removing a track from a playlist
    handleRemove(key,link){
        // Removing the item from songs object so it can render the correct tracks
        let songObj = {}
        let songsItems = [];
        for(let i=0;i!==songs.items.length;i++){
            if(key!==i){
                let obj = {};
                obj = Object.assign({},obj,{
                    image:songs.items[i].image,
                    name:songs.items[i].name,
                    title:songs.items[i].title,
                    uri:songs.items[i].uri
                })
                songsItems.push(obj);
            }
        }
        newItems.splice(key,1);
        songObj=Object.assign({},songObj,{
            items:songsItems
        })
        songs = songObj;
        // For making the remove
        let items = []
        let tracks = {};
        let obj = {};
        obj = Object.assign({},obj,{
            uri:link,
            positions:[key]
        })
        items.push(obj)
        tracks = Object.assign({},tracks,{
            tracks:items
        })
        // Calling remove
        this.props.removeTrackFromPlaylist(spotifyApi,this.props.playlist.id,tracks.tracks);
    }
    // Updating playlist details
    handleDetailUpdate(title,description){
        let data = {};
        data = Object.assign({},data,{
            name:title,
            description:description
        });
        this.props.updatePlaylistDetails(spotifyApi,data,this.props.playlist.id);
    }
    handlePlay(uri){
        this.props.playTrack(spotifyApi,uri);
    }
    render(){
        return(
            <div className="app">
                <h2 style={{margin:"1%"}}>Create a new playlist</h2>
                {this.props.playlist ?
                <Container fluid>
                    <Row>
                        <Col>
                        {/* Searching for tracks to add */}
                        <SearchBar searchPress={this.handleSearch}/>
                        {this.props.results ?
                        <div>
                            <h2>Click to add a track to your playlist</h2>
                           {this.props.results.tracks.map((track,i)=>
                                <SearchItemTemplate key={i} circle={false} handleAdd={this.handleAdd} uri={track.uri} font="15px" size="10rem" image={track.images} name={track.title} title={track.artists} fullArtists={track.fullArtists} fullTitle={track.fullTitle} handlePlay={this.handlePlay}/>
                        )}
                        </div>:<div></div>
                        }
                        </Col>
                        <Col>
                        {/* Playlist showcase section */}
                            <h1 style={{margin:"1%"}}>Playlist</h1>
                            <PlaylistDetails title={this.props.playlist.name} description={this.props.playlist.description} owner={this.props.user.display_name} updateDetails={this.handleDetailUpdate}/>
                            {this.props.modifiedTracks ?
                            <div>
                                {songs.items.map((item,i)=>
                                    <PlaylistTrackTemplate remove={this.handleRemove} key={i} pos={i} link={item.uri} image={item.image} title={item.title} name={item.name}/>
                                )}
                                <LinkContainer style={{fontFamily:'Raleway',marginTop:"1%",marginBottom:"1%"}} exact to="/">
                                    <Button variant="success" size="lg">Save</Button>
                                </LinkContainer>
                            </div>:<div></div>
                        }
                        </Col>
                    </Row>
                </Container>:
                // The form to create a playlist
                <div className="formCenter">
                    <PlaylistForm submitForm={this.handleFormSubmit}/>
                </div>
            }
            </div>

        )
    }
}
const mapStateToProps = (state)=>{
    return{
        user:state.userData.data,
        playlist:state.created.newPlaylist,
        results:state.searchResults.data,
        modifiedTracks:state.modifiedTracks.items,
    }
}
const mapDispatchToProps = {
    createNewPlaylist,
    search,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    unmountCreated,
    unmountSearch,
    updatePlaylistDetails,
    playTrack,
}
export default connect(mapStateToProps,mapDispatchToProps)(PlaylistCreate);