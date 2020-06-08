import React from "react";
import {Figure} from "react-bootstrap";
import "../../css/style.css";

const SearchItemTemplate = (props)=>{
    return(
        <Figure style={{width:'19rem',height:'19rem',margin:"1%",marginBottom:"3%"}}>
            <a href={props.url}>
            <Figure.Image rounded={true} className="card"
            width={302}
            height={302}
            src={props.image}
            alt="None"/>
            </a>
            <Figure.Caption>
                <h3 style={{margin:"0"}}>{props.title}</h3>
                <p>{props.name}</p>
            </Figure.Caption>
        </Figure>
    )
}
export default SearchItemTemplate;