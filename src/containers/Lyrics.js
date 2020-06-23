import React,{Component} from "react";
import * as SpotifyWebApi from "spotify-web-api-js";
import {connect} from "react-redux";
import "../css/style.css";
import {currentPlayingTrack,getLyrics} from "../actions/index.js";
import {Image,Container,Row,Col} from "react-bootstrap";
import LyricsSearch from "../components/LyricsItems/LyricsSearch";

// Global variables
var spotifyApi = new SpotifyWebApi();

class Lyrics extends Component{
    constructor(props){
        super(props);
        this.state={
            artist:null,
            title:null,
        }
        this.handleSearch = this.handleSearch.bind(this);
        spotifyApi.setAccessToken(this.props.accessToken);
    }
    handleSearch(artist,title){
        let nArtist = artist.charAt(0).toUpperCase() + artist.slice(1);
        let nTitle = title.charAt(0).toUpperCase() + title.slice(1);
        this.setState({
            artist:nArtist,
            title:nTitle
        })
        this.props.getLyrics(artist,title);
    }
    render(){
        return(
            <div className="app">
                <Container fluid>
                    <Row>
                        <Col>
                            <LyricsSearch search={this.handleSearch}/>
                        </Col>
                        <Col style={{marginBottom:"5%"}}>
                            {this.state.artist?
                            <div style={{marginTop:"2%"}}>
                                <h2>{this.state.artist}</h2>
                                <h2>{this.state.title}</h2>  
                            </div>:<div></div>
                            }
                            {this.props.lyrics ?
                            <div style={{marginBottom:"5%",marginTop:"1%",textAlign:"left"}}>
                                {this.props.lyrics.map((line,i)=>
                                    <h5 key={i}>{line}</h5>
                                )}
                            </div>:
                            <div></div>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        currentTrack: state.player.track,
        lyrics: state.lyrics.lyrics
    };
  };

const mapDispatchToProps = {
    currentPlayingTrack,
    getLyrics
  }
export default connect(mapStateToProps,mapDispatchToProps)(Lyrics);