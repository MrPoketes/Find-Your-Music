import React,{Component} from "react";
import {Navbar,Nav} from "react-bootstrap";
import {BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
import App from "../index.js";
import PlaylistContainer from "../containers/PlaylistContainer";
import Search from "../containers/Search";
var accessToken="";
export default class Navigation extends Component{
  constructor(props){
    super(props);
    accessToken = this.props.access;
  }
  componentDidMount(){
  }
    render(){
        return(
          <Router>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand >Find Your Music</Navbar.Brand>
            <Nav className="mr-auto">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
              <NavLink className="nav-link" exact to="/search">Search</NavLink>
              <NavLink className="nav-link" exact to="/playlistMaker">Playlist Maker</NavLink>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <App/>
            </Route>
            <Route exact path="/playlistMaker">
              <PlaylistContainer/>
            </Route>
            <Route exact path={`/search`}>
              <Search accessToken={accessToken}/>
            </Route>
          </Switch>
          </Router>
        )
    }
}