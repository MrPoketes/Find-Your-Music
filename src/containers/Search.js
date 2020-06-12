import React, { Component } from "react";
import SearchBar from "../components/SearchComponents/SearchBar";
import SearchContainer from "../components/SearchComponents/SearchContainer";
import "../css/style.css";
import {connect} from "react-redux";
import {search,unmountSearch} from "../actions/index.js";
import * as SpotifyWebApi from "spotify-web-api-js";

var spotifyApi = new SpotifyWebApi();
let input="";
var accessToken = "";
class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            accessToken:this.props.accessToken
        }
        accessToken = this.props.accessToken;
        this.handleSearch = this.handleSearch.bind(this);
        spotifyApi.setAccessToken(accessToken);
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
    render(){
        return(
            <div className="app">
                {this.props.results?
                <div>
                    <SearchBar searchPress={this.handleSearch}/>
                    <h2>Results for: {input}</h2>
                    <SearchContainer results={this.props.results}/>
                </div> : <SearchBar searchPress={this.handleSearch}/>
            }
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
      results: state.searchResults.data
    };
  };
  const mapDispatchToProps = {
      search,
      unmountSearch
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Search);
  