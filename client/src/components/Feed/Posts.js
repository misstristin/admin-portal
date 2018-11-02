import React, { Component } from 'react';
import './Feed.css';

class Posts extends Component {
  render() {
    return (
      <div key={this.props._id} className="postContent">
        <div className="postDateTime">{this.props.timeStamp}</div> 
        <div className="postContent">{this.props.content}</div>
        <span className="postAuthor">Posted by: {this.props.username}</span> | <span className="postCat">category: {this.props.category}</span>
        <span className="postLikes">{this.props.likes} likes</span> | <span className="postComments">{this.props.commentCount} comments</span><br />
      </div>
    );
  }
}

export default Posts;