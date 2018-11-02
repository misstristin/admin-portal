import React from "react";
import "./Nav.css";

// Component for the Navbar

const SignupNav = props => (
  <nav role="navigation">
    <ul>
      <li><a id="brand" href="/">Admin Portal</a></li>
      <span className="navSpacer"></span>
      <li className="rightNav"><a onClick={props.goToLogin} href="#Login">Login</a></li>
    </ul>
  </nav>
);

export default SignupNav;
