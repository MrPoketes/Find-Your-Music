import React, { Component } from 'react';
import "./css/style.css";
import queryString from 'query-string';
import {SpotifyApiContext} from "react-spotify-api";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchUserData} from "./actions/index.js";
import SignInButton from "./components/SignInButton";
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      serverData: null
    };
    this.handleSignIn = this.handleSignIn.bind(this);
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
  handleSignIn(e){
    e.preventDefault();
    window.location=window.location.href.includes('localhost') ? 'http://localhost:8888/login':'https://find-your-music-spotify.herokuapp.com/login'
  }
  render(){
      return (
        <div className="app">
          {this.props.userData ?
          <div>
            <h1 style={{'font-size': '54px'}}>
              {this.props.userData.display_name}'s Playlists
            </h1>
          </div> : <SignInButton handleSignIn={this.handleSignIn}/>
          }
        </div>
      );
  }
}
App.propTypes={
  fetchUserData:PropTypes.func.isRequired,
  userData:PropTypes.object
}
const mapStateToProps= state =>{
  return{
    userData: state.userData.data
  };
};
export default connect(mapStateToProps, {fetchUserData})(App);
{/* <button onClick={() => {
              window.location = window.location.href.includes('localhost') 
                ? 'http://localhost:8888/login' 
                : 'https://better-playlists-backend.herokuapp.com/login' }
            }
            style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}>Sign in with Spotify</button> */}