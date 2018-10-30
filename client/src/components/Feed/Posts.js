import React, { Component } from 'react';
import './Feed.css';

class Posts extends Component {
  render() {
    return (
      <div key={this.props._id}> 
        {this.props.content} | {this.props.username} | {this.props.category} | {this.props.timeStamp} | {this.props.likes} | {this.props.comments}} 
      </div>
    );
  }
}

export default Posts;