import React, {useState} from "react";

const Edit = ({ username: initialUsername, email: initialEmail, bio: initialBio, profilePicture: initialProfilePicture, updateProfile, toggleEditProfile }) => {
  const [username, setUsername] = useState(initialUsername || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(initialEmail || "");
  const [bio, setBio] = useState(initialBio || "");
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProfile = {username,password,email,bio,profilePicture};
    updateProfile(updatedProfile);
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="bio">Bio:</label>
        <input type="text" id="bio" name="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        <label htmlFor="profilePicture">Profile Picture URL:</label>
        <input type="text" id="profilePicture" name="profilePicture" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
        <button type="submit">Update Profile</button>
        <button type="button" onClick={toggleEditProfile}>Cancel</button>
      </form>
    </div>
  );
};

export default Edit;