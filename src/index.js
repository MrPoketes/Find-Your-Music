import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./stores/configureStore";
import "./css/style.css";
import queryString from 'query-string';
import {BrowserRouter as Router} from "react-router-dom";
import SpotifyPlayer from 'react-spotify-web-playback';
import Navigation from "./components/Navigation";
//Global variables
let accessToken="";
let parsed = queryString.parse(window.location.search);
if(parsed.access_token){
  accessToken = parsed.access_token;
}

ReactDOM.render(
  <Router>
    <div>
        <Provider store={store}>
          <Navigation access={accessToken}/>
              {accessToken ?
              <div className="player">
                  <SpotifyPlayer token={accessToken} name="Find Your Music Player" styles={{bgColor:"#282c34",trackArtistColor:"white",trackNameColor:"white",color:"white",sliderColor:"limegreen",sliderHandleColor:"white"}}/>
              </div>:<div></div>
          }
      </Provider>  
    </div>
  </Router>,

  document.getElementById('root')
);

