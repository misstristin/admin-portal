import React from "react";
import "./Main.css";

// Component for the Navbar

const Main = props => (
  <div className="mainDiv">
  <div className="leftSidebar">
    [pic]
    <br />
    Profile Info Goes Here
  </div>

  <div className="feed">
    <form>
      <textarea placeholder="Connect with your peers."></textarea> <br />
      <button>Post</button>
    </form>
        [content goes here]
  </div>

  <div className="rightSidebar">
  [History info goes here]
  </div>
</div>

);

export default Main;
