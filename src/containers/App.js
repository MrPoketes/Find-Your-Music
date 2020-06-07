import React, {Component} from 'react';
import "../css/style.css";
import {Button} from "react-bootstrap";
import queryString from 'query-string';
import * as SpotifyWebApi from "spotify-web-api-js";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchUserData,fetchTopTracks,fetchNewAlbums,search} from "../actions/index.js";
import SignInButton from "../components/SignInButton";
import SearchBar from "../components/SearchComponents/SearchBar";
import MusicCards from "../components/Cards/MusicCards";
import SearchContainer from "../components/SearchComponents/SearchContainer";
import Navigation from "../components/Navigation";
// Global variables
var spotifyApi = new SpotifyWebApi();
let accessToken="";
let input = "";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShowAlbumsClicked:false,
      isShowNewClicked:false
    };
    // Handle Functions
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleShowAlbumsClick = this.handleShowAlbumsClick.bind(this);
    this.handleNewReleasesClick = this.handleNewReleasesClick.bind(this);
    this.handleSearch= this.handleSearch.bind(this);
  }
  componentDidMount(){
    // Getting the accessToken
    let parsed = queryString.parse(window.location.search);
    accessToken = parsed.access_token;
    if(!accessToken){
      return;
    }
    this.setState({
      accessToken:accessToken
    })
    //Setting the access token to the spotifyApi so I could then pass it to the actions to fetch data
    spotifyApi.setAccessToken(accessToken);
    this.props.fetchUserData(spotifyApi);
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
  // Handle function for the searchbar
  handleSearch(value){
    input = value;
    if(input!==""){
      this.props.search(spotifyApi,input);
    }
  }
  render(){
      return (
        <div className="app">
          <Navigation/>
          {/* Search results render section */}
          {this.props.results ?
          <div className="SearchSection">
            <SearchBar searchPress={this.handleSearch}/>
            <h2>Results for: {input}</h2>
            <SearchContainer results={this.props.results}/>
          </div>:
          // Home section
          <div>
          {this.props.userData ?
          <div className="MainSection">

            <h1 style={{'fontSize': '40px', 'marginTop':'1%'}}>
              Welcome {this.props.userData.display_name} to Find Your Music
            </h1>

            <SearchBar searchPress={this.handleSearch}/>

            {/* Buttons for Top Tracks and New Releases */}
            <Button style={{"margin":"1%"}} variant="success" size="lg" onClick={this.handleShowAlbumsClick}>{this.state.isShowAlbumsClicked? "Hide Your Top Tracks":"Show Your Top Tracks"}</Button>
            <Button style={{"margin":"1%"}} variant="success" size="lg" onClick={this.handleNewReleasesClick}>{this.state.isShowNewClicked? "Hide New Releases":"Show New Releases"}</Button>
            {/* Handling clicking the buttons */}
            {this.state.isShowAlbumsClicked?
              <div>
                <MusicCards top={this.props.topTracks}/>
              </div>: <div></div>
            }
            {this.state.isShowNewClicked? 
            <div>
                <MusicCards top={this.props.newAlbums}/>
            </div>:<div></div>
          }
          {/* Authentication part */}
          </div> : <SignInButton handleSignIn={this.handleSignIn}/>
          }
          </div>
        }
        </div>
      );
  }
}
// PropTypes
App.propTypes={
  fetchUserData:PropTypes.func.isRequired,
  fetchTopTracks:PropTypes.func.isRequired,
  userData:PropTypes.object,
  topTracks:PropTypes.object,
}

const mapStateToProps = (state) =>{
  return{
    userData: state.userData.data,
    topTracks: state.topTracks.tracks,
    newAlbums: state.newReleases.albums,
    results: state.searchResults.data
  };
};
const mapDispatchToProps = {
    fetchUserData,
    fetchTopTracks,
    fetchNewAlbums,
    search
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
