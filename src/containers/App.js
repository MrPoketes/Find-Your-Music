import React, {Component} from 'react';
import "../css/style.css";
import {Button} from "react-bootstrap";
import queryString from 'query-string';
import * as SpotifyWebApi from "spotify-web-api-js";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchUserData,fetchTopTracks} from "../actions/index.js";
import SignInButton from "../components/SignInButton";
import SearchBar from "../components/SearchBar";
import MusicCards from "../components/Cards/MusicCards";
var spotifyApi = new SpotifyWebApi();

let accessToken="";
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShowAlbumsClicked:false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleShowAlbumsClick = this.handleShowAlbumsClick.bind(this);
  }
  componentDidMount(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if(!accessToken){
      return;
    }
    this.setState({
      accessToken:accessToken
    })
    spotifyApi.setAccessToken(accessToken);
    this.props.fetchUserData(spotifyApi);
    this.props.fetchTopTracks(spotifyApi);

    // fetch('https://api.spotify.com/v1/me/playlists', {
    //   headers: {'Authorization': 'Bearer ' + accessToken}
    // }).then(response => response.json())
    // .then(data => this.setState({
    //   playlists: data.items.map(item => {
    //     console.log(data.items)
    //     return {
    //       name: item.name,
    //       imageUrl: item.images[0].url, 
    //       songs: []
    //     }
    // })
    // }))
  }
  handleSignIn(e){
    e.preventDefault();
    window.location=window.location.href.includes('localhost') ? 'http://localhost:8888/login':'https://find-your-music-spotify.herokuapp.com/login'
  }
  handleShowAlbumsClick(e){
    e.preventDefault();
    console.log(this.props.topTracks);
    this.setState({
      isShowAlbumsClicked:!this.state.isShowAlbumsClicked
    })
  }
  render(){
      return (
        <div className="app">
          {this.props.userData ?
          <div>
            <h1 style={{'fontSize': '40px', 'marginTop':'1%'}}>
              Welcome {this.props.userData.display_name} to Find Your Music
            </h1>
            <SearchBar/>
          <Button variant="success" size="lg" onClick={this.handleShowAlbumsClick}>{this.state.isShowAlbumsClicked? "Hide Your Top Tracks":"Show Your Top Tracks"}</Button>
            {this.state.isShowAlbumsClicked ?
              <div>
              <MusicCards top={this.props.topTracks}/>
              </div>:<div></div>
            }
          </div> : <SignInButton handleSignIn={this.handleSignIn}/>
          }
        </div>
      );
  }
}
App.propTypes={
  fetchUserData:PropTypes.func.isRequired,
  fetchTopTracks:PropTypes.func.isRequired,
  userData:PropTypes.object,
  topTracks:PropTypes.object,
}

const mapStateToProps = (state) =>{
  return{
    userData: state.userData.data,
    topTracks: state.topTracks.tracks
  };
};
const mapDispatchToProps = {
    fetchUserData,
    fetchTopTracks
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
