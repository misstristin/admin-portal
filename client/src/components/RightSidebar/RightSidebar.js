import React from "react";
import "../Main/Main.css";

// Component for the RightSidebar

const RightSidebar = props => (
   
    <div className="rightSidebar">
    <span className="sidebarTitles">My Favorite Posts</span>
        <ul>
           <li>These are placeholders</li> 
           <li>Recent Favorites will go here</li> 
           <li>Pulled from Mongo</li> 
        </ul>
    <span className="sidebarTitles">My Contributions</span>
        <ul>
           <li>These are placeholders</li> 
           <li>Recent posts will go here</li> 
           <li>Pulled from Mongo</li> 
        </ul>
    </div>

);

export default RightSidebar;