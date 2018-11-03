import React from "react";
import "../Main/Main.css";

// Component for the RightSidebar

const RightSidebar = props => (
   
    <div className="rightSidebar">
    <span className="sidebarTitles">My Favorite Posts</span>
        <ul>
           <li>These are placeholders</li> <br />
           <li>Recent Likes will go here</li> <br />
           <li>Pulled from Mongo</li> <br />
        </ul>
    </div>

);

export default RightSidebar;