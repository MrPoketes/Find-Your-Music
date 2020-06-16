import React, { Component } from "react";
import SearchBar from "../components/SearchComponents/SearchBar";
import SearchContainer from "../components/SearchComponents/SearchContainer";
import "../css/style.css";
import {connect} from "react-redux";
import {search,unmountSearch,playTrack} from "../actions/index.js";
import * as SpotifyWebApi from "spotify-web-api-js";

// Global variables

var spotifyApi = new SpotifyWebApi();
let input="";
var accessToken = "";

class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            accessToken:this.props.accessToken,
            premium:false,
        }
        accessToken = this.props.accessToken;
        spotifyApi.setAccessToken(accessToken);
        // Handle function
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }
    componentDidMount(){
        if(this.props.userData.product==="premium"){
            this.setState({
              premium:true
            })
          }
    }
    componentWillUnmount(){
        this.props.unmountSearch();
    }
    handleSearch(value){   
        input = value;
        if(input!==""){
          this.props.search(spotifyApi,input,4);
        }
    }
    // Handle function for playing the selected song
    handlePlay(uri){
        this.props.playTrack(spotifyApi,uri);
    }
    render(){
        return(
            <div className="app">
                {this.props.results?
                <div>
                    <SearchBar searchPress={this.handleSearch}/>
                    <h2>Results for: {input}</h2>
                    <SearchContainer premium={this.state.premium} handlePlay={this.handlePlay} results={this.props.results}/>
                </div> : <SearchBar searchPress={this.handleSearch}/>
            }
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        userData: state.userData.data,
        results: state.searchResults.data
    };
  };
  const mapDispatchToProps = {
      search,
      unmountSearch,
      playTrack
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Search);
  