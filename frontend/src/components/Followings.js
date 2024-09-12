import React from "react";
import ProfilePreview from "./ProfilePreview";

class Following extends React.Component{
  render(){
    const {users, type} = this.props;
    return(
      <div className="follower/following">
        <div className="profile-list">
          {users && users.length > 0 ? (
          users.map((user, index) => (
          <ProfilePreview
            key={index}
            username={user.username}
            profilePicture={user.profilePicture}
            bio={user.bio}
          />
          ))
        ) : (
          <p>No {title} to display</p>
        )}
      </div>
    </div>
    );
  }
}

export default Following;