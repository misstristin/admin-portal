import React from "react";
import "../Main/Main.css";
import defimg from '../../components/adminDefault.jpg'

// Component for the LeftSidebar

const LeftSidebar = props => (
    <div className="leftSidebar">
    <img image={props.image} src={defimg} alt="placeholder" className="profilePic" />
    <br />

    {/* Pulls from user data in Mongo */}
    {/* These are placeholders */}

    <span className="sidebarTitles">You can call me</span>
      <p id="username">{props.username}</p>

    <span className="sidebarTitles">Industry</span>
      <p id="industry">{props.industry}</p>

    <span className="sidebarTitles">Years' Experience</span>
      <p id="yearsexp">{props.yearsexp}</p>

    <span className="sidebarTitles">Area</span>
      <p id="geoarea">{props.area}</p>
      
    <span className="editLink"><a href="/profile">edit info</a></span>
  </div>
);

export default LeftSidebar;





