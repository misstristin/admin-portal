import React from "react";
import "./Nav.css";

// Component for the Navbar

const LoginNav = props => (
  <nav role="navigation">
    <ul>
      <li><a id="brand" href="/">Admin Portal</a></li>
      <span className="navSpacer"></span>
      <li className="rightNav"><a onClick={props.goToSignUp} >Sign Up</a></li>
    </ul>
  </nav>
);

export default LoginNav;
