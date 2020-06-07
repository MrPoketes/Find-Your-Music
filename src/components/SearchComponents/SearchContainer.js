import React,{Component} from "react";
import "../../css/style.css";
import SearchItemTemplate from "./SearchItemTemplate";

export default class SearchContainer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="SearchContainer">
                <div className="artists">
                    <div className="line"></div>
                    <h2>Top Artist</h2>
                    <div className="line"></div>
                    <SearchItemTemplate image={this.props.results.artists[0].images} name={""} title={this.props.results.artists[0].name} url={this.props.results.artists[0].url}/>
                </div>
                <div className="line"></div>
                <div className="tracks">
                    <h2>Tracks</h2>
                    <div className="line"></div>
                    {this.props.results.tracks.map((track,i)=>
                    <SearchItemTemplate key={i} image={track.images} name={track.title} title={track.artists} url={track.url}/>
                    )}
                </div>
                <div className="line"></div>
                <div className="albums">
                    <h2>Albums</h2>
                    <div className="line"></div>
                    {this.props.results.albums.map((album,i)=>
                    <SearchItemTemplate key={i} image={album.images} name={album.name} title={album.artists} url={album.url}/>
                    )}
                </div>
                <div className="line"></div>
                <div className="Playlists">
                    <h2>Playlists</h2>
                    <div className="line"></div>
                    {this.props.results.playlists.map((playlist,i)=>
                    <SearchItemTemplate key={i} image={playlist.images} name={playlist.title} url={playlist.url}/>
                    )}
                </div>
            </div>
        )
    }
}