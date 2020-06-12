import React from "react";
import "../../css/style.css";
import {Card} from "react-bootstrap";

const CardTemplate = (props)=>{
    return(
        <Card className="card" style={{ width: '19rem', height:'19rem',color:"black",margin:"2%",marginTop:"3%",display:"inline-block",backgroundColor:"white"}}>
            <a href={props.url}>
                <Card.Img variant="top" src={props.image}/>
                <Card.ImgOverlay>
                <Card.Body className="card-text">
                    <i className="fas fa-play cardPlay"></i>
                </Card.Body>
                </Card.ImgOverlay>
            </a>
        </Card>
        )


}
export default CardTemplate;