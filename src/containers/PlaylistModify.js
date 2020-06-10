import React,{Component} from "react";
import "../css/style.css";
import * as SpotifyWebApi from "spotify-web-api-js";
import {search,addTrackToPlaylist,removeTrackFromPlaylist,fetchUserPlaylists,fetchPlaylistTracks} from "../actions/index.js";
import {connect} from "react-redux";
import SearchItemTemplate from "../components/SearchComponents/SearchItemTemplate";
import {Container,Row,Col,Button, Figure} from "react-bootstrap";
import PlaylistTrackTemplate from "../components/Playlists/PlaylistTrackTemplate";
import SearchBar from "../components/SearchComponents/SearchBar";
import {LinkContainer} from "react-router-bootstrap";
// Global variables
var spotifyApi = new SpotifyWebApi();
var accessToken = "";
let id = "";
let playlistImage="";
let playlistTitle="";
let playlistDescription="";
let playlistOwner="";
let playlistId = "";
// let songs = null;

class PlaylistModify extends Component{
    constructor(props){
        super(props);
        accessToken = this.props.accessToken;
        spotifyApi.setAccessToken(accessToken);
        this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAddTrack = this.handleAddTrack.bind(this);
        this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
    }
    componentDidMount(){
        this.props.fetchUserPlaylists(spotifyApi,this.props.user.id)
    }
    handleSelectPlaylist(image,title,owner,uri,id,description){
        let songObj= {};
        let songItems=[];
        setTimeout(()=>{
            this.props.fetchPlaylistTracks(spotifyApi,id);
        },500)
        playlistId = id;
        playlistImage=image;
        playlistTitle=title;
        playlistDescription=description;
        playlistOwner=owner;
    }
    handleSearch(input){
        let value = input;
        if(value!==""){
            this.props.search(spotifyApi,value);
        }
    }
    handleAddTrack(image,title,name,uri,id){
        this.props.addTrackToPlaylist(spotifyApi,uri,playlistId);
        setTimeout(()=>{
            this.props.fetchPlaylistTracks(spotifyApi,playlistId);
        },500)
    }
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
        setTimeout(()=>{
            this.props.fetchPlaylistTracks(spotifyApi,playlistId);
        },500)
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
                            <Figure style={{margin:"0",padding:"0",marginTop:"1%"}}>
                                <Figure.Image rounded={true} width={100} height={100} src={playlistImage} alt="None"/>
                            </Figure>
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
}
export default connect(mapStateToProps,mapDispatchToProps)(PlaylistModify);