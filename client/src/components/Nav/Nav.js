import React from "react";
import "./Nav.css";

// Component for the Navbar

const Nav = props => (
  <nav role="navigation">
    <ul>
      <li><a id="brand" href="/">Admin Portal</a></li>
      <span className="navSpacer"></span>
      <li className="rightNav"><a onClick={props.logout}>Logout</a></li>
      <li className="rightNav"><a href="/profile">Profile</a></li>
      <li className="rightNav"><a href="/later">Later</a></li>
      <li className="rightNav"><a href="/now">Now</a></li>
    </ul>
  </nav>
);

export default Nav;
