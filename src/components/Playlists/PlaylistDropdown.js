import React,{Component} from "react";
import {Dropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {fetchMergeTracks} from "../../actions/index.js";

class PlaylistDropdown extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.fetchMergeTracks(this.props.spotify,this.props.id);
        setTimeout(()=>{this.props.handleSelect(this.props.merged,this.props.id);},1000)
    }
    render(){
        return(
            <Dropdown.Item style={{fontFamily:'Raleway'}} onClick={this.handleClick}>{this.props.name}</Dropdown.Item>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        merged:state.userPlaylist.merge,
    }
}
const mapDispatchToProps = {
    fetchMergeTracks,
}
export default connect(mapStateToProps,mapDispatchToProps)(PlaylistDropdown);