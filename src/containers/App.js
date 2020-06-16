import React, {Component} from 'react';
import "../css/style.css";
import SignInButton from "../components/SignInButton";
import Home from './Home';
import {fetchUserData} from "../actions/index.js";
import {connect} from "react-redux";
import * as SpotifyWebApi from "spotify-web-api-js";

// Global variables
var spotifyApi = new SpotifyWebApi();
let accessToken="";
let isAccessToken = false;

class App extends Component {
    constructor(props){
      super(props);
      accessToken=this.props.accessToken;
      spotifyApi.setAccessToken(this.props.accessToken);
      this.props.fetchUserData(this.props.accessToken);
    }
    componentDidMount(){
      if(!this.props.accessToken){
        return;
      }
      this.setState({
        accessToken:this.props.accessToken
      })
      isAccessToken = true;
    }
    // Redirects the user to the authentication site
    handleSignIn(e){
      e.preventDefault();
      window.location=window.location.href.includes('localhost') ? 'http://localhost:8888/login':'https://find-your-music-spotify.herokuapp.com/login'
    }
    render(){
        return (
          <div className="app">
            {isAccessToken && this.props.userData ?
            <div>
              <div>
                <Home access={accessToken} changeUri={this.props.changeUri}/>
              </div>
            </div> : <SignInButton handleSignIn={this.handleSignIn}/>
            }
            </div>
          
        );
      }
    }
  const mapStateToProps = (state) =>{
      return{
        userData: state.userData.data,
      };
    };
  const mapDispatchToProps = {
        fetchUserData,
    }
  export default connect(mapStateToProps, mapDispatchToProps)(App);
