import React,{Component} from "react";
import "../css/style.css";
import * as SpotifyWebApi from "spotify-web-api-js";
import {fetchUserData,createNewPlaylist,search,addTrackToPlaylist,fetchPlaylist} from "../actions/index.js";
import {connect} from "react-redux";
import {Container,Row,Col} from "react-bootstrap";
import SearchBar from "../components/SearchComponents/SearchBar";
// import queryString from 'query-string';
import SearchItemTemplate from "../components/SearchComponents/SearchItemTemplate";
import PlaylistForm from "../components/Playlists/PlaylistForm";
import PlaylistTrackTemplate from "../components/Playlists/PlaylistTrackTemplate";

var spotifyApi = new SpotifyWebApi();
let input = "";
var accessToken = "";
let songs = {};
let newItems = [];
class PlaylistCreate extends Component{
    constructor(props){
        super(props);
        this.state={
            isCreateClicked:false,
            isModifyClicked:false,
        }
        accessToken = this.props.accessToken;
        spotifyApi.setAccessToken(accessToken);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    componentDidMount(){
        this.props.fetchUserData(spotifyApi);
    }
    handleFormSubmit(name,description){
        this.props.createNewPlaylist(spotifyApi,this.props.user.id,name,description)
    }
    handleSearch(value){   
        input = value;
        if(input!==""){
          this.props.search(spotifyApi,input);
        }
    }
    handleAdd(image,name,title,uri){
        this.props.addTrackToPlaylist(spotifyApi,uri,this.props.playlist.id);
        this.props.fetchPlaylist(spotifyApi,this.props.playlist.id);
        let newObj = {};
        newObj = Object.assign({},newObj,{
            image:image,
            name:name,
            title:title,
            uri:uri,
        })
        newItems.push(newObj);
        songs = Object.assign({},songs,{
            items:newItems
        })
    }
    handleRemove(key){
        console.log(songs);
        let items = [];
        for(let i=0;i!==songs.items.length;i++){
            if(key!==i){
                items.push(songs.items[i]);
            }
        }
        songs = Object.assign({},songs,{
            items:items
        })
    }
    render(){
        return(
            <div className="app">
                {this.props.playlist ?
                <Container fluid>
                    <Row>
                        <Col>
                        <SearchBar searchPress={this.handleSearch}/>
                        {this.props.results ?
                        <div>
                            <h2>Click to add a track to your playlist</h2>
                           {this.props.results.tracks.map((track,i)=>
                            <SearchItemTemplate key={i} handleAdd={this.handleAdd} uri={track.uri} font="15px" size="10rem" image={track.images} name={track.title} title={track.artists}/>
                        )}
                        </div>:<div></div>
                        }
                        </Col>
                        <Col>
                            <h1>Playlist</h1>
                            <h2>{this.props.playlist.name}</h2>
                            <h4>{this.props.playlist.description}</h4>
                            <h4>Created by: {this.props.user.display_name}</h4>
                            {this.props.addedTracks ?
                            <div>
                                {songs.items.map((item,i)=>
                                    <PlaylistTrackTemplate remove={this.handleRemove} key={i} pos={i} uri={item.uri} image={item.image} title={item.title} name={item.name}/>
                                )}
                            </div>:<div></div>
                        }
                        </Col>
                    </Row>
                </Container>:
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
        addedTracks:state.addedTracks.items,
        addedPlaylist:state.created.newPlaylist
    }
}
const mapDispatchToProps = {
    fetchUserData,
    createNewPlaylist,
    search,
    addTrackToPlaylist,
    fetchPlaylist
}
export default connect(mapStateToProps,mapDispatchToProps)(PlaylistCreate);