import React from "react";
import "./Feed.css";
import Posts from "./Posts"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// Component for the Feed

const Feed = props => (
   
    <div className="feed">
      {props.category === "Present" && <h1 className="presentHeader">Present - elevate your technical skills</h1>}
      {props.category === "Future" && <h1 className="futureHeader">Future - make the leap to a new career</h1>}
      {props.category === "Present" && <h4 className="presentHeader">Tips, tricks, and technologies for the tech-savvy administrator</h4>}
      {props.category === "Future" &&  <h4 className="futureHeader">Advice, discussion, and resources for transitioning professionals</h4>}
      
     <form onSubmit={props.addPost}>
     <input className="titlePost" name="title" type="text" placeholder="Add a descriptive title!" />

      {props.addLink === true && <input className="linkImageInput" type="text" placeholder="Add website URL here to share" />}
      {props.addImage === true && <input className="linkImageInput" type="text" placeholder="Add image URL here to share" />}    

      <textarea placeholder="Connect with your peers." name="content"></textarea> <br />
      <div className="postIcon"><a onClick={props.addLinkFunc} href="#AddLink"><FontAwesomeIcon icon="link" /> </a> 
      <a onClick={props.addImageFunc} href="#AddImage"><FontAwesomeIcon icon="images" /> </a></div>
      <span className="breakFloat"></span>
      <button>{props.submitButton}</button>
      </form>  

      {props.posts.map((x) => 
      <Posts key={x._id} _id={x._id} title={x.title} content={x.content} username={x.username} category={x.category} 
      timeStamp={x.timeStamp} likes={x.likes} commentCount={x.commentCount} comments={x.comments} addLike={props.addLike} 
      addLink={x.addLink} addImage={x.addImage} />)}

  </div>

);

export default Feed;