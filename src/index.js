import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {SpotifyApiContext} from "react-spotify-api";

const token = "77bc4e4e978f41118495b164c0db7bd6";
ReactDOM.render(
  <SpotifyApiContext.Provider value={token}>
      <App/>
  </SpotifyApiContext.Provider>,
  document.getElementById('root')
);

