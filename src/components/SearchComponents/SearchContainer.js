import React,{Component} from "react";
import "../../css/style.css";
import SearchItemTemplate from "./SearchItemTemplate";
import {Container,Row,Col} from "react-bootstrap";

class SearchContainer extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(uri){
        this.props.handlePlay(uri);
    }
    render(){
        return(
            <Container fluid className="searchContainer">
                <Row>
                    <Col className="artists">
                        <h2>Top Artist</h2>
                        <SearchItemTemplate size="8rem" circle={true} image={this.props.results.artists[0].images} name={""} title={this.props.results.artists[0].name} url={this.props.results.artists[0].url} uri={this.props.results.artists[0].uri} font="20px" handleSearchClick={this.handleClick} premium={this.props.premium}/>
                    </Col>
                    <Col className="tracks">
                        <h2>Songs</h2>
                        {this.props.results.tracks.map((track,i)=>
                        <SearchItemTemplate key={i} size="8rem" circle={false} image={track.images} name={track.title} title={track.artists} url={track.url} uri={track.uri} handleSearchClick={this.handleClick} font="15px" premium={this.props.premium}/>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col className="albums">
                        <h2>Albums</h2>
                        {this.props.results.albums.map((album,i)=>
                        <SearchItemTemplate key={i} size="8rem" circle={false} image={album.images} name={album.name} title={album.artists} url={album.url} uri={album.uri} handleSearchClick={this.handleClick} font="15px" premium={this.props.premium}/>
                        )}
                    </Col>
                    <Col className="playlists">
                        <h2>Playlists</h2>
                        {this.props.results.playlists.map((playlist,i)=>
                        <SearchItemTemplate key={i} size="8rem" circle={false} image={playlist.images} title={playlist.title} url={playlist.url} uri={playlist.uri} handleSearchClick={this.handleClick} font="15px" premium={this.props.premium}/>
                        )}                   
                    </Col>
                </Row>
            </Container>
        )    
    }
}
export default SearchContainer