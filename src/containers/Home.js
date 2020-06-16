import React, {Component} from 'react';
import "../css/style.css";
import {Button} from "react-bootstrap";
import * as SpotifyWebApi from "spotify-web-api-js";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchTopTracks,fetchNewAlbums,playTrack} from "../actions/index.js";
import SignInButton from "../components/SignInButton";
import MusicCards from "../components/Cards/MusicCards";

// Global variables
var spotifyApi = new SpotifyWebApi();

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShowAlbumsClicked:false,
      isShowNewClicked:false,
      premium:false
    };
    
    // Handle Functions
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleShowAlbumsClick = this.handleShowAlbumsClick.bind(this);
    this.handleNewReleasesClick = this.handleNewReleasesClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    spotifyApi.setAccessToken(this.props.access);
  }
  componentDidMount(){
    this.setState({
      accessToken:this.props.access
    })
    if(this.props.userData.product==="premium"){
      this.setState({
        premium:true
      })
    }
    this.props.fetchTopTracks(spotifyApi);
    this.props.fetchNewAlbums(spotifyApi);
  }
  // Redirects the user to the authentication site
  handleSignIn(e){
    e.preventDefault();
    window.location=window.location.href.includes('localhost') ? 'http://localhost:8888/login':'https://find-your-music-spotify.herokuapp.com/login'
  }
  // Handle function for toggling user Top Tracks
  handleShowAlbumsClick(e){
    e.preventDefault();
    if(!this.state.isShowNewClicked){
      this.setState({
        isShowAlbumsClicked:!this.state.isShowAlbumsClicked
      })
    }
    else{
      this.setState({
        isShowAlbumsClicked:!this.isShowAlbumsClicked,
        isShowNewClicked:false
      })
    }
  }
  // Handle function for toggling new releases
  handleNewReleasesClick(e){
    e.preventDefault();
    if(!this.state.isShowAlbumsClicked){
      this.setState({
        isShowNewClicked:!this.state.isShowNewClicked
      })
    }
    else{
      this.setState({
        isShowAlbumsClicked:false,
        isShowNewClicked:!this.state.isShowNewClicked
      })
    }
  }
  // Handle function for playing the selected song
  handlePlay(uri){
     this.props.playTrack(spotifyApi,uri);
  }
  render(){
      return (
        <div className="app">
          {/* Home section */}
          <div>
          {this.props.userData ?
          <div className="MainSection">

            <h1 style={{'fontSize': '40px', 'marginTop':'1%'}}>
              Welcome {this.props.userData.display_name} to Find Your Music
            </h1>
            {/* Buttons for Top Tracks and New Releases */}
            <Button style={{margin:"1%",fontFamily:'Raleway'}} variant="success" size="lg"  onClick={this.handleShowAlbumsClick}>{this.state.isShowAlbumsClicked? "Hide Your Top Tracks":"Show Your Top Tracks"}</Button>
            <Button style={{margin:"1%",fontFamily:'Raleway'}} variant="success" size="lg" onClick={this.handleNewReleasesClick}>{this.state.isShowNewClicked? "Hide New Releases":"Show New Releases"}</Button>
            {/* Handling clicking the buttons */}
            {this.state.isShowAlbumsClicked?
              <div>
                <MusicCards handlePlay={this.handlePlay} top={this.props.topTracks} premium={this.state.premium}/>
              </div>: <div></div>
            }
            {this.state.isShowNewClicked? 
            <div>
                <MusicCards handlePlay={this.handlePlay} top={this.props.newAlbums} premium={this.state.premium}/>
            </div>:<div></div>
          }
          {/* Authentication part */}
          </div> : <SignInButton handleSignIn={this.handleSignIn}/>
          }
          </div>
        </div>
      );
  }
}
// PropTypes
Home.propTypes={
  fetchTopTracks:PropTypes.func.isRequired,
  fetchNewAlbums:PropTypes.func.isRequired,
  userData:PropTypes.object,
  topTracks:PropTypes.object,
}

const mapStateToProps = (state) =>{
  return{
    userData: state.userData.data,
    topTracks: state.topTracks.tracks,
    newAlbums: state.newReleases.albums,
    playlists:state.userPlaylist.playlists,
  };
};
const mapDispatchToProps = {
    fetchTopTracks,
    fetchNewAlbums,
    playTrack
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
