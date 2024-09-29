import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import Create from "../components/Create";
import Profiles from "../components/Profiles";
import Edit from "../components/Edit";
import PlaylistPreview from "../components/PlaylistPreview";
import Song from "../components/Song";
import Followings from "../components/Followings";

const followersData = [
  { username: "MusicLover123", profilePicture: "/assets/images/placeholder.png", bio: "Music is life", numFollowers: 150, socials: "Twitter", age: 25 },
  { username: "TuneMaster", profilePicture: "/assets/images/placeholder.png", bio: "Living for the beats", numFollowers: 200, socials: "Facebook", age: 28 },
];

const followingData = [
  { username: "BeatGuru", profilePicture: "/assets/images/placeholder.png", bio: "All about the rhythm", numFollowers: 180, socials: "Instagram", age: 22 },
  { username: "MelodyMaker", profilePicture: "/assets/images/placeholder.png", bio: "Creating melodies", numFollowers: 220, socials: "Snapchat", age: 24 },
];

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [showCreatePlaylistForm, setShowCreatePlaylistForm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showFollowers, setShowFollowers] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('JunKLoginToken')}`
          }
        });
        const data = await response.json();
        setProfile(data);
        setIsOwnProfile(userId === data._id);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    const fetchPlaylists = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/playlists/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('JunKLoginToken')}`
          }
        });
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchProfileData();
    fetchPlaylists();
  }, [userId]);

  const handleCreatePlaylistToggle = () => {
    setShowCreatePlaylistForm(!showCreatePlaylistForm);
  };

  const handleEditProfileToggle = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleFriendToggle = () => {
    setIsFriend(!isFriend);
  };

  const updateProfile = (updatedProfile) => {
    setProfile((prevProfile) => ({ ...prevProfile, ...updatedProfile }));
    setIsEditingProfile(!isEditingProfile);
  };

  return (
    <div>
      <Navigation />
      {/* Show Create Playlist button */}
      <div className="playlist-button">
        <button onClick={handleCreatePlaylistToggle}>
          {showCreatePlaylistForm ? "Hide Create Playlist" : "Create Playlist"}
        </button>
      </div>
      {/* Show Create Playlist form */}
      {showCreatePlaylistForm ? (
        <Create />
      ) : (
        <div className="profile-page">
          <div className="top">
            <div className="profile-info">
              {!isEditingProfile ? (
                <Profiles
                  username={profile?.username}
                  profilePicture={profile?.profilePicture}
                  bio={profile?.bio}
                  email={profile?.email}
                  numFollowers={profile?.numFollowers}
                  socials={profile?.socials}
                  age={profile?.age}
                  toggleEditProfile={handleEditProfileToggle}
                  isFriend={profile?.isFriend}
                  onFriendToggle={handleFriendToggle}
                  currentUser={"Cobus Botha"}
                />
              ) : (
                <Edit
                  username={profile.username}
                  profilePicture={profile.profilePicture}
                  bio={profile.bio}
                  email={profile.email}
                  updateProfile={updateProfile}
                  toggleEditProfile={handleEditProfileToggle}
                />
              )}
            </div>
            <div className="follower/following">
              <div className="follower/following-toggle">
                <button onClick={() => setShowFollowers(true)}>Followers</button>
                <button onClick={() => setShowFollowers(false)}>Following</button>
              </div>
              {showFollowers ? (
                <div className="followers">
                  <h2>Followers</h2>
                  <Followings users={followersData} type="followers" />
                </div>
              ) : (
                <div className="following-">
                  <h2>Following</h2>
                  <Followings users={followingData} type="following" />
                </div>
              )}
            </div>
          </div>
          <div className="song/playlist">
            <div className="users-playlist">
              <h2>My Playlists</h2>
              {playlists.map((playlist, index) => (
                <PlaylistPreview
                  key={index}
                  title={playlist.title}
                  description={playlist.description}
                  numSongs={playlist.songs.length}
                  imageURL={playlist.imageURL}
                  hashtags={playlist.hashtags}
                  onHashtagClick={() => {}}
                />
              ))}
            </div>
            <div className="users-songs">
              <h2>My Songs</h2>
              {playlists.flatMap(playlist => playlist.songs).map((song, index) => (
                <Song
                  key={index}
                  name={song.title}
                  artist={song.artist}
                  link={song.link}
                  dateAdded={song.dateAdded}
                  addedBy={song.addedBy}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;