import React,{Component} from "react";
import {Navbar,Nav,Form,FormControl,Button} from "react-bootstrap";
export default class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Find Your Music</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Coming Soon</Nav.Link>
              <Nav.Link href="#pricing">Coming Soon</Nav.Link>
            </Nav>
          </Navbar>
        )
    }
}