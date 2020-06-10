import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./stores/configureStore";
import Navigation from "./components/Navigation";
import "./css/style.css";
import queryString from 'query-string';
import SignInButton from "./components/SignInButton";
import Home from './containers/Home';
import {BrowserRouter as Router} from "react-router-dom";
import {connect} from "react-redux";
import * as SpotifyWebApi from "spotify-web-api-js";
import {fetchUserData} from "./actions/index.js";
//Global variables
var spotifyApi = new SpotifyWebApi();
let accessToken="";
let isAccessToken = false;
let parsed = queryString.parse(window.location.search);
if(parsed.access_token){
  accessToken = parsed.access_token;
}

class App extends Component {
  constructor(props){
    super(props);
    spotifyApi.setAccessToken(this.props.access);
    this.props.fetchUserData(accessToken);
  }
  componentDidMount(){
    // Getting the accessToken
    // let parsed = queryString.parse(window.location.search);
    // accessToken = parsed.access_token;
    if(!accessToken){
      return;
    }
    this.setState({
      accessToken:accessToken
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
              <Home access={accessToken}/>
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
  
ReactDOM.render(
  <Router>
    <div>
    <Provider store={store} >
      <Navigation access={accessToken}/>
    </Provider>     
    </div>
  </Router>,

  document.getElementById('root')
);

