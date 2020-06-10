import React,{Component} from "react";
import "../css/style.css";
import * as SpotifyWebApi from "spotify-web-api-js";
import {search,addTrackToPlaylist,removeTrackFromPlaylist,fetchUserPlaylists,fetchPlaylistTracks,deletePlaylist,unmountUserPlaylist,unmountSearch} from "../actions/index.js";
import {connect} from "react-redux";
import SearchItemTemplate from "../components/SearchComponents/SearchItemTemplate";
import {Container,Row,Col,Button,Figure,Dropdown} from "react-bootstrap";
import PlaylistTrackTemplate from "../components/Playlists/PlaylistTrackTemplate";
import SearchBar from "../components/SearchComponents/SearchBar";
import {LinkContainer} from "react-router-bootstrap";
import PlaylistDropdown from "../components/Playlists/PlaylistDropdown";

// Global variables
var spotifyApi = new SpotifyWebApi();
var accessToken = "";
let id = "";
let playlistImage="";
let playlistTitle="";
let playlistDescription="";
let playlistOwner="";
let playlistId = "";

class PlaylistModify extends Component{
    constructor(props){
        super(props);
        this.state={
            areYouSure:false,
            leave:"/playlistMaker/modify",
        }
        accessToken = this.props.accessToken;
        spotifyApi.setAccessToken(accessToken);
        // Handler functions
        this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAddTrack = this.handleAddTrack.bind(this);
        this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
        this.handleRemovePlaylist = this.handleRemovePlaylist.bind(this);
        this.handleMerge = this.handleMerge.bind(this);
    }
    componentDidMount(){
        this.props.fetchUserPlaylists(spotifyApi,this.props.user.id)
    }
    componentWillUnmount(){
        this.props.unmountUserPlaylist();
        this.props.unmountSearch();
    }
    // Handling user selected playlist by fetching it's tracks and showing them
    handleSelectPlaylist(image,title,owner,uri,id,description){
        this.props.fetchPlaylistTracks(spotifyApi,id);
        playlistId = id;
        playlistImage=image;
        playlistTitle=title;
        playlistDescription=description;
        playlistOwner=owner;
    }
    // Handling user searched tracks by fetching searched tracks
    handleSearch(input){
        let value = input;
        if(value!==""){
            this.props.search(spotifyApi,value);
        }
    }
    // Handling adding a new track to playlist
    handleAddTrack(image,title,name,uri,id){
        this.props.addTrackToPlaylist(spotifyApi,[uri],playlistId);
        // Fetches modified playlist tracks to update the screen
        setTimeout(()=>{
            this.props.fetchPlaylistTracks(spotifyApi,playlistId);
        },500)
    }
    // Handling removing a track from playlist
    handleRemoveTrack(key,link){
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
        this.props.removeTrackFromPlaylist(spotifyApi,playlistId,tracks.tracks);
        // Fetches modified playlist tracks to update the screen
        setTimeout(()=>{
            this.props.fetchPlaylistTracks(spotifyApi,playlistId);
        },500);
    }
    // Handling removing/unfollowing a playlist
    handleRemovePlaylist(){
        if(this.state.areYouSure===false){
            this.setState({
                areYouSure:true,
                leave:"/"
            })
        }
        else if(this.state.areYouSure===true){
            this.props.deletePlaylist(spotifyApi,playlistId);
        }
    }
    // Handling merging playlists. Takes the track object from the selected object and then adds it to the current playlist.
    handleMerge(mergePlaylist,mergeId){
        if(mergePlaylist.items.length!==0){
            let uri=[];
            for(let i=0;i!==mergePlaylist.items.length;i++){
                if(mergeId!==playlistId){
                    uri.push(mergePlaylist.items[i].uri);
                }
            }
            this.props.addTrackToPlaylist(spotifyApi,uri,playlistId);
            // Fetches the new playlist tracks to update the screen
            setTimeout(()=>{
                this.props.fetchPlaylistTracks(spotifyApi,playlistId);
            },500)
        }
    }
    render(){
        return(
            <div className="app">
                {this.props.tracks ?
                <div>
                <Container fluid>
                    <Row>
                        <Col>
                        {/* Searching for tracks to add */}
                        <SearchBar searchPress={this.handleSearch}/>
                        {this.props.results ?
                        <div>
                            <h2>Click to add a track to your playlist</h2>
                           {this.props.results.tracks.map((track,i)=>
                            <SearchItemTemplate key={i} handleAdd={this.handleAddTrack} id={id} uri={track.uri} font="15px" size="10rem" image={track.images} name={track.title} title={track.artists}/>
                        )}
                        </div>:<div></div>
                        }
                        </Col>
                        <Col>
                        {/* Playlist showcase section */}
                            <div className="modify">
                                {/* Playlist Image */}
                                <Figure className="playlist-image" style={{margin:"0",padding:"0",marginTop:"1%"}}>
                                        <Figure.Image rounded={true} width={150} height={150} src={playlistImage} alt="None"/>
                                </Figure>
                                {/* Delete Button */}
                                <div style={{display:"inline"}}>
                                <LinkContainer style={{margin:"1%"}} exact to={this.state.leave}>
                                    <Button variant="success" onClick={this.handleRemovePlaylist}>{this.state.areYouSure ? "Are you Sure?":"Delete Playlist"}</Button>
                                </LinkContainer>
                                {/* Merge Dropdown */}
                                    <Dropdown style={{display:"inline"}}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Merge playlist with another
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {this.props.playlists.items.map((playlist,i)=>
                                            <PlaylistDropdown key={i} id={playlist.id} spotify={spotifyApi} handleSelect={this.handleMerge} name={playlist.name}/>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            {/* Playlist details */}
                            <h2>{playlistTitle}</h2>
                            <h4>{playlistDescription}</h4>
                            <h4>Created by: {playlistOwner}</h4>
                            {this.props.tracks ?
                            <div>
                                {this.props.tracks.items.map((item,i)=>
                                    <PlaylistTrackTemplate key={i} pos={i} remove={this.handleRemoveTrack} link={item.uri} image={item.images} title={item.title} name={item.artists}/>
                                )}
                                <LinkContainer exact to="/">
                                    <Button variant="success" size="lg">Save</Button>
                                </LinkContainer>
                            </div>:<div></div>
                        }
                        </Col>
                    </Row>
                </Container>
                </div>:
                <div>
                {this.props.playlists?
                <div>
                    {/* Playlist Select menu */}
                    {this.props.playlists.items.map((item,i)=>
                    <SearchItemTemplate key={i} size="19rem" handleAdd={this.handleSelectPlaylist} id={item.id} uri={item.uri} image={item.image} title={item.name} name={item.owner} description={item.description}/>
                    )}
                </div>:<div></div>   
            }
                </div>

            }

            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        user:state.userData.data,
        playlists:state.userPlaylist.playlists,
        tracks:state.userPlaylist.tracks,
        results:state.searchResults.data,
        modifiedTracks:state.modifiedTracks.items,
    }
}
const mapDispatchToProps = {
    search,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    fetchUserPlaylists,
    fetchPlaylistTracks,
    deletePlaylist,
    unmountUserPlaylist,
    unmountSearch
}
export default connect(mapStateToProps,mapDispatchToProps)(PlaylistModify);