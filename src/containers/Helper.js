import React,{Component} from "react";
import {connect} from "react-redux";
import * as SpotifyWebApi from "spotify-web-api-js";
import Navigation from "../components/Navigation";
import {getPlayback,playTrack} from "../actions/index.js";
import SpotifyPlayer from 'react-spotify-web-playback';
var spotifyApi = new SpotifyWebApi();
var accessToken = "";
class Helper extends Component{
    constructor(props){
      super(props);
      accessToken = this.props.accessToken;
      this.state={
        accessToken:this.props.accessToken,
      }
      spotifyApi.setAccessToken(this.props.accessToken);
    }
    componentDidMount(){
    }
    render(){
      return(
        <div>
            <Navigation access={this.props.accessToken}/>
            {accessToken ?
            <div className="player">
                <SpotifyPlayer token={this.props.accessToken}/>
            </div>:<div></div>
        }
        </div>
      )
    }
  }
  const mapStateToProps = (state) =>{
    return{
        playback:state.player.playback,
    };
  };
  const mapDispatchToProps = {
    getPlayback,
    playTrack
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Helper);