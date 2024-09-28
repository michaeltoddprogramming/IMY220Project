import React, {useState} from "react";
import Edit from "./Edit";

const Profiles = ({ username, profilePicture, bio, numFollowers, socials, age, toggleEditProfile, isFriend, onFriendToggle, currentUser }) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const handleToggleEditProfile = () => {
    setEditingProfile(prev => !prev);
    if (toggleEditProfile) toggleEditProfile();
  };
  const isCurrentUserProfile = username === currentUser;
  return (
    <div className="basic-profile-container">
      <aside>
        <div className="profile-header">
          <img src={profilePicture || "/assets/images/placeholder.png"} alt={`${username}'s profile`} className="profile-picture" />
          <h3>{username}</h3>
          <p>{bio}</p>
          <p>{numFollowers} followers</p>
          {isCurrentUserProfile && (
            <button onClick={onFriendToggle}>
              {isFriend ? "Remove Friend" : "Send Friend Request"}
            </button>
          )}
          {isCurrentUserProfile && (
            <button onClick={handleToggleEditProfile}>
              {editingProfile ? "Cancel Edit" : "Edit Profile"}
            </button>
          )}
          {editingProfile && <Edit toggleEditProfile={handleToggleEditProfile} />}
        </div>
        <div className="more-info">
          <h3>More Info</h3>
          <p>Username: {username}</p>
          <p>Age: {age}</p>
          <p>Bio: {bio}</p>
          <p>Followers: {numFollowers}</p>
          <p>Socials: {socials}</p>      
        </div>
      </aside>
    </div>
  );
};

export default Profiles;