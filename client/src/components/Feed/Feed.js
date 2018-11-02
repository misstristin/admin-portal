import React from "react";
import "./Feed.css";
import Posts from "./Posts"

// Component for the Feed

const Feed = props => (
   
    <div className="feed">
      <form onSubmit={props.addPost}>
      <textarea placeholder="Connect with your peers." name="content"></textarea> <br />
      <button>{props.submitButton}</button>
      </form>  

      {props.posts.map((x) => 
      <Posts key={x._id} content={x.content} username={x.username} category={x.category} 
      timeStamp={x.timeStamp} likes={x.likes} comments={x.comments} />)}

  </div>

);

export default Feed;