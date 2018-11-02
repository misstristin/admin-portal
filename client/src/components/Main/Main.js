import React from "react";
import "./Main.css";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import RightSidebar from "../RightSidebar/RightSidebar";
import Feed from "../Feed/Feed";

// Component for Main content

const Main = props => (
  <div className="mainDiv">
  
  <LeftSidebar image={props.image} username={props.username} industry={props.industry} yearsexp={props.yearsexp} area={props.area} />

  <Feed username={props.username} industry={props.industry} 
        yearsexp={props.yearsexp} area={props.area} addPost={props.addPost}
        posts={props.posts} submitButton="Submit" />

  <RightSidebar />

</div>

);

export default Main;
