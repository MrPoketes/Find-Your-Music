import React, { Component } from 'react';
import "../css/style.css";
import queryString from 'query-string';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchUserData,fetchNewAlbums} from "../actions/index.js";
import SignInButton from "../components/SignInButton";
import SearchBar from "../components/SearchBar";
import MusicCard from "../components/MusicCard";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      serverData: null
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleCl = this.handleCl.bind(this);
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

    this.props.fetchUserData(accessToken);

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
  handleCl(e){
    e.preventDefault();
    this.props.fetchNewAlbums(this.state.accessToken);
    console.log(this.props.album);
  }
  handleSignIn(e){
    e.preventDefault();
    window.location=window.location.href.includes('localhost') ? 'http://localhost:8888/login':'https://find-your-music-spotify.herokuapp.com/login'
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
            <h2 onClick={this.handleCl}>Show</h2>
            <MusicCard newAlbums={this.props.fetchNewAlbums} />

          </div> : <SignInButton handleSignIn={this.handleSignIn}/>
          }
        </div>
      );
  }
}
App.propTypes={
  fetchUserData:PropTypes.func.isRequired,
  fetchNewAlbums:PropTypes.func.isRequired,
  userData:PropTypes.object,
  album:PropTypes.object
}
const mapStateToProps = (state) =>{
  return{
    userData: state.userData.data,
    album: state.newAlbum.albums
  };
};
const mapDispatchToProps = {
  fetchUserData,
  fetchNewAlbums
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
