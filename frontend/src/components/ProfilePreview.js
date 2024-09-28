import React from "react";
import { Link } from "react-router-dom";

class previewProfile extends React.Component{
  render(){
    const { username, profilePicture, bio, numFollowers} = this.props;
    return (
      <div className="profile-preview">
        <img src={profilePicture} alt={`${username}'s profile`} className="profile-picture" />
        <h3>{username}</h3>
        <p>{bio}</p>
        <p>{numFollowers} followers</p>
        <Link to="/profile/:userId">Visit Profile</Link>
      </div>
    );
  }
}

export default previewProfile ;