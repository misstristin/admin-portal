import React from "react";
import "./Nav.css";

// Component for the Navbar

const Nav = props => (
  <nav role="navigation">
    <ul>
      <li><a id="brand" href="/">Admin Portal</a></li>
      <span className="navSpacer"></span>
      <li className="rightNav"><a onClick={props.logout}  href="/">Logout</a></li>
      <li className="rightNav"><a onClick={props.displayProfile}  href="#Profile">Profile</a></li>
      <li className="rightNav"><a onClick={props.goToLater}  href="#Later">Later</a></li>
      <li className="rightNav"><a onClick={props.goToNow}  href="#Now">Now</a></li>
    </ul>
  </nav>
);

export default Nav;
