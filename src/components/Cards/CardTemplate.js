import React,{Component} from "react";
import "../../css/style.css";
import {Card} from "react-bootstrap";

class CardTemplate extends Component{
    constructor(props){
        super(props);
        this.handleCardClick = this.handleCardClick.bind(this);
    }
    handleCardClick(){
        this.props.handleClick(this.props.uri)
    }
    render(){
        return(
            <div style={{display:"inline"}}>
                {this.props.premium ?
                    <Card className="card" onClick={this.handleCardClick} style={{ width: '19rem', height:'19rem',color:"black",margin:"2%",marginTop:"3%",display:"inline-block",backgroundColor:"white"}}>
                            <Card.Img variant="top" src={this.props.image}/>
                            <Card.ImgOverlay>
                                <Card.Body className="card-text">
                                    <i className="fas fa-play cardPlay"></i>
                                </Card.Body>
                            </Card.ImgOverlay>
                    </Card>:
                    <Card className="card" style={{ width: '19rem', height:'19rem',color:"black",margin:"2%",marginTop:"3%",display:"inline-block",backgroundColor:"white"}}>
                        <a href={this.props.url}>
                            <Card.Img variant="top" src={this.props.image}/>
                            <Card.ImgOverlay>
                                <Card.Body className="card-text">
                                    <i className="fas fa-play cardPlay"></i>
                                </Card.Body>
                            </Card.ImgOverlay>
                        </a>
                    </Card>
            
            }
            </div>
            )
    }
}
export default CardTemplate;