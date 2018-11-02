import React from "react";
import "../Main/Main.css";

// Component for Main content

const Profile = props => (
  <div className="mainDiv">
    <h1>User Settings</h1>
      <div className="profileDiv">

        <div className="profilePicEdit">
        <img src={props.image} className="profilePic" alt="user profile pic"/>
          <form>
            <p><input type="text" name="image" placeholder="enter a URL" /></p>
            <p><button onClick={props.newImg}>Upload new image</button></p>
          </form>
        </div>

        <div className="userInfoEdit">
          <p className="profileTitles">Username</p>
          <p className="editProfile">{props.username}</p>
          <p className="profileTitles">Password</p>
          <p className="editProfile">Change password</p>
          <p className="profileTitles">Industry</p>
          <p className="editProfile">{props.industry}</p>
          <p className="profileTitles">Years' Experience</p>
          <p className="editProfile">{props.yearsexp}</p>
          <p className="profileTitles">Geographical Location</p>
          <p className="editProfile">{props.area}</p>
        </div>
    </div>
  </div>

);

export default Profile;
