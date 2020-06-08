// import React,{Component} from "react";
// import "../css/style.css";
// import {Button} from "react-bootstrap";
// import * as SpotifyWebApi from "spotify-web-api-js";
// import queryString from 'query-string';
// import { LinkContainer } from "react-router-bootstrap";
// import PlaylistCreate from "../components/Playlists/PlaylistCreate";
// var spotifyApi = new SpotifyWebApi();
// let input="";
// var accessToken = "";
// export default class PlaylistContainer extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             isCreateClicked:false,
//             isModifyClicked:false
//         }
//     }
//     componentDidMount(){
//         let parsed = queryString.parse(window.location.search);
//         accessToken = parsed.access_token;
//     }
//     render(){
//         return(
//                 <div className="app">
//                     <div>
//                         <h1 style={{'fontSize': '40px', 'marginTop':'1%'}}>What would you like to do?</h1>
//                         <LinkContainer style={{margin:"1%"}}  exact to="/playlistMaker/create" component={PlaylistCreate}>
//                             <Button variant="success" size="lg">Create a playlist</Button>
//                         </LinkContainer>
//                         <LinkContainer style={{margin:"1%"}}  exact to="/playlistMaker/modify">
//                             <Button variant="success" size="lg">Modify a playlist</Button>
//                         </LinkContainer>
//                     </div>
//             </div>

//         )
//     }
// }