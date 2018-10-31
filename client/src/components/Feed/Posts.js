import React, { Component } from 'react';
import './Feed.css';

class Posts extends Component {
  render() {
    return (
      <div key={this.props._id} className="postContent"> 
        {this.props.content} <br />
        By: {this.props.username} <br />
        Category: {this.props.category} <br />
        Timestamp: {this.props.timeStamp} <br />
        Likes: {this.props.likes} <br />
        Comments: {this.props.comments} <br /><br />
      </div>
    );
  }
}

export default Posts;