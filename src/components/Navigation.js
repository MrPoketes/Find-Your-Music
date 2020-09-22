import React,{Component} from "react";
import {Navbar,Nav,NavDropdown} from "react-bootstrap";
import {BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
import App from "../containers/App";
import Search from "../containers/Search";
import PlaylistCreate from "../containers/PlaylistCreate";
import PlaylistModify from "../containers/PlaylistModify.js";
import { LinkContainer } from "react-router-bootstrap";
import "../css/style.css";

// Global variables
var accessToken="";

export default class Navigation extends Component{
  constructor(props){
    super(props);
    accessToken = this.props.access;
  }
    render(){
        return(
          <Router>
            <Navbar variant="dark" className="navigation-bar">
            <Navbar.Brand >Find Your Music</Navbar.Brand>
            <Nav className="mr-auto">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
              <NavLink className="nav-link" exact to="/search">Search</NavLink>
              <NavDropdown title="Playlists" id="basic-nav-dropdown">
                <LinkContainer exact to="/playlistMaker/create">
                  <NavDropdown.Item>Create Playlist</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer exact to="/playlistMaker/modify">
                  <NavDropdown.Item>Modify Playlist</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavLink className="nav-link" exact to="/lyrics">Lyrics</NavLink>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <App accessToken={this.props.access}/>
            </Route>
            <Route exact path="/playlistMaker/create">
              <PlaylistCreate accessToken={accessToken}/>
            </Route>
            <Route exact path="/search">
              <Search accessToken={accessToken}/>
            </Route>
            <Route exact path="/playlistMaker/modify">
              <PlaylistModify accessToken={accessToken}/>
            </Route>
          </Switch>
          </Router>
        )
    }
}