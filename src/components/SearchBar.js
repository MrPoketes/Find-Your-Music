import React, { Component } from "react";
import {InputGroup,FormControl,Button} from "react-bootstrap";
export default class SearchBar extends Component{
    render(){
        return(
            <div className="center search-div">
                <h2>Search for music</h2>
                <InputGroup className="mb-3 search">
                    <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
                    <InputGroup.Append>
                        <Button variant="success"><i className="fas fa-search"></i></Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}
