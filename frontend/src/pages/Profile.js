import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Navigation from "../components/Navigation";
import Create from "../components/Create";
import Profiles from "../components/Profiles";
import Edit from "../components/Edit";
import PlaylistPreview from "../components/PlaylistPreview";
import Song from "../components/Song";
import Followings from "../components/Followings";

const playlist = [
  {title: "Chill Vibes", description: "A collection of relaxing tunes", numSongs: "15", imageURL: "/assets/images/placeholder.png", hashtags: ["#chill", "#relax"]},
  {title: "Workout Hits", description: "Energetic songs to pump you up", numSongs: "20", imageURL: "/assets/images/placeholder.png", hashtags: ["#workout", "#energy"]},
  {title: "Road Trip Anthems", description: "Perfect songs for a long drive", numSongs: "30", imageURL: "/assets/images/placeholder.png", hashtags: ["#roadtrip", "#adventure"]},
];

const songs = [
  {title: "Blinding Lights", artist: "The Weeknd", link: "www.examplelink.com", dateAdded: "2024/05/01", addedBy: "user5678"},
  {title: "Levitating", artist: "Dua Lipa", link: "www.examplelink.com", dateAdded: "2024/05/01", addedBy: "user5678"},
  {title: "Watermelon Sugar", artist: "Harry Styles", link: "www.examplelink.com", dateAdded: "2024/05/01", addedBy: "user5678"},
  {title: "Circles", artist: "Post Malone", link: "www.examplelink.com", dateAdded: "2024/05/01", addedBy: "user5678"},
  {title: "Don't Start Now", artist: "Dua Lipa", link: "www.examplelink.com", dateAdded: "2024/05/01", addedBy: "user5678"},
];

const followersData = [
  {username: "MusicLover123", profilePicture: "/assets/images/placeholder.png", bio: "Music is life", numFollowers: 150, socials: "Twitter", age: 25},
  {username: "TuneMaster", profilePicture: "/assets/images/placeholder.png", bio: "Living for the beats", numFollowers: 200, socials: "Facebook", age: 28},
];

const followingData = [
  {username: "BeatGuru", profilePicture: "/assets/images/placeholder.png", bio: "All about the rhythm", numFollowers: 180, socials: "Instagram", age: 22},
  {username: "MelodyMaker", profilePicture: "/assets/images/placeholder.png", bio: "Creating melodies", numFollowers: 220, socials: "Snapchat", age: 24},
];
const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [showCreatePlaylistForm, setShowCreatePlaylistForm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showFollowers, setShowFollowers] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
    const fetchedProfile = {
      username: "Michael Todd",
      profilePicture: "/assets/images/placeholder.png",
      bio: "LOVE DOING DRUGS",
      numFollowers: 7890,
      socials: "Instagram",
      age: 20,
      isFriend: false,
      email: "mikethetodd@gmail.com",
    };

    setProfile(fetchedProfile);
      setIsOwnProfile(userId === "userId");
    };

      fetchProfileData();
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
      setProfile((prefProfile) => ({...prefProfile, ...updatedProfile}));
      setIsEditingProfile(!isEditingProfile);
    }
    
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
              {playlist.map((playlist, index) => (
                <PlaylistPreview
                  key={index}
                  title={playlist.title}
                  description={playlist.description}
                  numSongs={playlist.numSongs}
                  imageURL={playlist.imageURL}
                  hashtags={playlist.hashtags}
                  onHashtagClick={() => {}}
                />
              ))}
            </div>
            <div className="users-songs">
              <h2>My Songs</h2>
              {songs.map((song, index) => (
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