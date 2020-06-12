import React from "react";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/signIn.css";
const SignInButton = (props)=>{
    return(
        <div className="sign-in">
            <h2 className="welcome-text">Welcome to Find Your Music</h2>
            <Button style={{fontFamily:'Raleway'}} variant="success" size="lg" onClick={props.handleSignIn} >Sign in With Spotify</Button>
        </div>
        
    )
    
}
export default SignInButton;