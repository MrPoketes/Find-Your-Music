import React from "react";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/signIn.css";

const SignInButton = (props)=>{
    return(
        <div className="sign-in">
            <h2 className="welcome-text">Welcome to Find Your Music</h2>
            <Button style={{fontFamily:'Raleway'}} variant="success" size="lg" onClick={props.handleSignIn} >Sign in With Spotify</Button>
            <p style={{marginTop:"33%"}}>Disclaimer: The player only works for Spotify premium users. If you don't have premium, the player will not work and when clicking on tracks/albums/playlists/artists you will be redirected to the official Spotify website.</p>
        </div>   
    )
    
}
export default SignInButton;