import React,{Component} from "react";
import "../../css/style.css";
import SearchItemTemplate from "./SearchItemTemplate";
import {Container,Row,Col} from "react-bootstrap";

const SearchContainer = (props) =>{
    return(
        <Container fluid className="searchContainer">
            <Row>
                <Col className="artists">
                    <h2>Top Artist</h2>
                    <SearchItemTemplate size="8rem" circle={true} image={props.results.artists[0].images} name={""} title={props.results.artists[0].name} url={props.results.artists[0].url} font="20px"/>
                </Col>
                <Col className="tracks">
                    <h2>Songs</h2>
                    {props.results.tracks.map((track,i)=>
                    <SearchItemTemplate key={i} size="8rem" circle={false} image={track.images} name={track.title} title={track.artists} url={track.url} font="15px"/>
                    )}
                </Col>
            </Row>
            <Row>
                <Col className="albums">
                    <h2>Albums</h2>
                    {props.results.albums.map((album,i)=>
                    <SearchItemTemplate key={i} size="8rem" circle={false} image={album.images} name={album.name} title={album.artists} url={album.url} font="15px"/>
                    )}
                </Col>
                <Col className="playlists">
                    <h2>Playlists</h2>
                    {props.results.playlists.map((playlist,i)=>
                    <SearchItemTemplate key={i} size="8rem" circle={false} image={playlist.images} title={playlist.title} url={playlist.url} font="15px"/>
                    )}                   
                </Col>
            </Row>
        </Container>
    )
}
export default SearchContainer