// import React, {Component} from 'react';
// import "../css/style.css";
// import queryString from 'query-string';
// import SignInButton from "../components/SignInButton";
// import Home from './Home';
// import {BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
// import Search from "./Search";
// // Global variables
// let accessToken="";
// let isAccessToken = false;

// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//     };
//   }
//   componentDidMount(){
//     // Getting the accessToken
//     let parsed = queryString.parse(window.location.search);
//     accessToken = parsed.access_token;
//     if(!accessToken){
//       return;
//     }
//     this.setState({
//       accessToken:accessToken
//     })
//     isAccessToken = true;
//   }
//   // Redirects the user to the authentication site
//   handleSignIn(e){
//     e.preventDefault();
//     window.location=window.location.href.includes('localhost') ? 'http://localhost:8888/login':'https://find-your-music-spotify.herokuapp.com/login'
//   }
//   render(){
//       return (
//         <div className="app">
//           {isAccessToken ?
//           <div>
//             <div>
//               <Home access={accessToken}/>
//             </div>
//           </div> : <SignInButton handleSignIn={this.handleSignIn}/>
//           }
//           </div>
        
//       );
//     }
//   }

// export default App;
