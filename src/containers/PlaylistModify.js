import React,{Component} from "react";
import "../css/style.css";
import * as SpotifyWebApi from "spotify-web-api-js";
import {search,addTrackToPlaylist,removeTrackFromPlaylist,fetchUserPlaylists,fetchPlaylistTracks,deletePlaylist,unmountUserPlaylist,unmountSearch,updatePlaylistDetails,playTrack} from "../actions/index.js";
import {connect} from "react-redux";
import SearchItemTemplate from "../components/SearchComponents/SearchItemTemplate";
import {Container,Row,Col,Button,Dropdown,Image} from "react-bootstrap";
import PlaylistTrackTemplate from "../components/Playlists/PlaylistTrackTemplate";
import SearchBar from "../components/SearchComponents/SearchBar";
import {LinkContainer} from "react-router-bootstrap";
import PlaylistDropdown from "../components/Playlists/PlaylistDropdown";
import PlaylistDetails from "../components/Playlists/PlaylistDetails";

// Global variables
var spotifyApi = new SpotifyWebApi();
var accessToken = "";
let id = "";
let playlistId = "";

class PlaylistModify extends Component{
    constructor(props){
        super(props);
        this.state={
            areYouSure:false,
            clicked:false,
            leave:"/playlistMaker/modify",
            playlistTitle:"",
            playlistDescription:"",
            playlistOwner:"",
            playlistImage:"",
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
        this.handleDetailUpdate = this.handleDetailUpdate.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }
    componentDidMount(){
        this.props.fetchUserPlaylists(spotifyApi,this.props.user.id)
    }
    // Unmounting
    componentWillUnmount(){
        this.props.unmountUserPlaylist();
        this.props.unmountSearch();
    }
    // Handling user selected playlist by fetching it's tracks and showing them
    handleSelectPlaylist(image,title,owner,uri,id,description){
        this.props.fetchPlaylistTracks(spotifyApi,id);
        playlistId = id;
        this.setState({
            clicked:true,
            playlistTitle:title,
            playlistDescription:description,
            playlistOwner:owner,
            playlistImage:image,
        })
        // playlistTitle=title;
    }
    // Handling user searched tracks by fetching searched tracks
    handleSearch(input){
        let value = input;
        if(value!==""){
            this.props.search(spotifyApi,value,12);
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
    // Updating playlist details
    handleDetailUpdate(title,description){
        let data = {};
        data = Object.assign({},data,{
            name:title,
            description:description
        });
        this.props.updatePlaylistDetails(spotifyApi,data,playlistId);
        this.setState({
            playlistTitle:title,
            playlistDescription:description
        })
    }
    handlePlay(uri){
        this.props.playTrack(spotifyApi,uri);
    }
    render(){
        return(
            <div className="app">
                <h2 style={{margin:"1%"}}>{this.state.clicked ? "Modify Playlist":"Select a playlist to modify"}</h2>
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
                            <SearchItemTemplate key={i} circle={false} handleAdd={this.handleAddTrack} id={id} uri={track.uri} font="15px" size="10rem" image={track.images} name={track.title} title={track.artists} handlePlay={this.handlePlay}/>
                        )}
                        </div>:<div></div>
                        }
                        </Col>
                        <Col>
                        {/* Playlist showcase section */}
                            <div className="modify">

                                {/* Playlist Image */}
                                <Image className="image" rounded={true} src={this.state.playlistImage}/>
                                {/* Playlist details */}
                                <PlaylistDetails title={this.state.playlistTitle} description={this.state.playlistDescription} owner={this.state.playlistOwner} updateDetails={this.handleDetailUpdate}/>

                                {/* Delete Button */}
                                <div style={{display:"inline"}}>
                                <LinkContainer style={{margin:"1%",fontFamily:'Raleway'}} exact to={this.state.leave}>
                                    <Button variant="success" onClick={this.handleRemovePlaylist}>{this.state.areYouSure ? "Are you Sure?":"Delete Playlist"}</Button>
                                </LinkContainer>
                                {/* Merge Dropdown */}
                                    <Dropdown style={{display:"inline",fontFamily:'Raleway'}}>
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
                            {this.props.tracks ?
                            <div>
                                {this.props.tracks.items.map((item,i)=>
                                    <PlaylistTrackTemplate key={i} pos={i} remove={this.handleRemoveTrack} link={item.uri} image={item.images} title={item.title} name={item.artists}/>
                                )}
                                <LinkContainer style={{fontFamily:'Raleway',marginTop:"1%",marginBottom:"1%"}} exact to="/">
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
    unmountSearch,
    updatePlaylistDetails,
    playTrack
}
export default connect(mapStateToProps,mapDispatchToProps)(PlaylistModify);