import React, { Component } from 'react';
import './Feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Posts extends Component {
  render() {
    return (
      <div key={this.props._id} className="postContent">
        <div className="postedTitle">{this.props.title}</div>
        {/* <div>{this.props._id}</div> */}
        {/* <div className="postDateTime">{this.props.timeStamp}</div>  */}
        <div className="postLink">{this.props.addLink}</div>
        <div className="imageLink">{this.props.addImage}</div>
        <div className="postContentInner">{this.props.content}</div>
        <span className="postAuthor">Posted by: {this.props.username}</span>
        <span className="postCat">   ({this.props.category})</span>
        <span className="breakFloat"></span>
        <a className="postLikes" onClick={this.props.addLike} data-id={this.props._id} data-currentlikes={this.props.likes}
          href="#Like"><FontAwesomeIcon icon="heart" /> {this.props.likes}</a>
        <a className="postComments" data-id={this.props._id} 
          href="#Comment">{this.props.commentCount} comments</a><br />
      </div>
    );
  }
}

export default Posts;