import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./stores/configureStore";
import "./css/style.css";
import queryString from 'query-string';
import {BrowserRouter as Router} from "react-router-dom";
import Helper from "./containers/Helper";

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
          <Helper accessToken={accessToken}/>
      </Provider>  
    </div>
  </Router>,

  document.getElementById('root')
);

