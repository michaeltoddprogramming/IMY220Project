import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import OriginalPlaylist from '../components/OriginalPlaylist'; 
import EditPlaylist from '../components/EditPlaylist'; 
import Comments from '../components/Comments';
import AddComment from '../components/AddComment'; 

const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const fetchedPlaylist = {
        id: playlistId,
        name: "Playlist Name",
        description: "Playlist Description",
        coverImage: "/assets/images/placeholder.png",
        hashtags: ["#rock", "#summer"],
        numSongs: 2,
        songs: [
          { id: 1, name: "Out In the Fields", artist: "Gary Moore", link: "www.fakelink.com" },
          { id: 2, name: "Eleanor Rigby", artist: "Beatles", link: "www.fakelink.com" }
        ]
      };
      setPlaylist(fetchedPlaylist);
    };
    fetchPlaylistData();
  }, [playlistId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <Navigation />
        {isEditing ? (
          <EditPlaylist playlist={playlist} onEditComplete={handleEditToggle} />
        ) : (
        <div className="playlist-page">
          {playlist && ( <>
            <div className="playlist-info/edit">
              <OriginalPlaylist playlist={playlist} />
              <button onClick={handleEditToggle}>
              {isEditing ? 'Cancel Editing' : 'Edit Playlist'}
              </button>
            </div>
            <div className="playlist-comment">
              <Comments playlistId={playlistId} />
              <AddComment playlistId={playlistId} />
            </div>      
            </>
          )}    
        </div>
      )}
    </div>
  );
};

export default Playlist;