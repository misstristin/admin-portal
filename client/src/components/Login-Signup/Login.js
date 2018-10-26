import React from "react";
import "../Main/Main.css";

// Component for the Login page

const Login = props => (
    <div className="mainDiv">
        <div className="loginSignupDiv">
            <h1>Connect. Share. Grow.</h1>
            <h2>Welcome to Admin Portal</h2>
            <form id="loginForm" onSubmit={props.login}>
                <input className="signInForm" type="text" placeholder="Username"></input>
                <input className="signInForm" type="password" placeholder="Password"></input>
                <button>Login</button>
            </form>
        </div>
    </div>
);

export default Login;





