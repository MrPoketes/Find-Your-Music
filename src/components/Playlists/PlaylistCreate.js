import React,{Component} from "react";
import "../../css/style.css";
import {Button} from "react-bootstrap";
import * as SpotifyWebApi from "spotify-web-api-js";
import queryString from 'query-string';
import PlaylistForm from "./PlaylistForm";

var spotifyApi = new SpotifyWebApi();
let input="";
var accessToken = "";
export default class PlaylistCreate extends Component{
    constructor(props){
        super(props);
        this.state={
            isCreateClicked:false,
            isModifyClicked:false
        }
    }
    componentDidMount(){
        let parsed = queryString.parse(window.location.search);
        accessToken = parsed.access_token;
    }
    render(){
        return(
                <div className="app">
                    <div className="formCenter">
                        <PlaylistForm/>
                    </div>
            </div>

        )
    }
}