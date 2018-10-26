import React from "react";
import "../Main/Main.css";


// Component for the Sign Up page
const SignUp = props => (
    <div className="mainDiv">
        <div className="loginSignupDiv">
            <h1>Join the Portal</h1>
            <form id="signUpForm" onSubmit={props.signUp} >
                <input className="joinForm" type="text" placeholder="Username"></input>
                <input className="joinForm" type="password" placeholder="Password"></input>
                <input className="joinForm" type="text" placeholder="Email"></input>
                <input className="joinForm" type="text" placeholder="Industry"></input>
                <input className="joinForm" type="text" placeholder="Years' Experience"></input>
                <input className="joinForm" type="text" placeholder="Geo Area"></input>
                <button>Sign Up</button>
            </form>
        </div>
    </div>
);

export default SignUp;





