import React, {useState} from 'react';
import Song from './Song'; 
import AddSong from './AddSong';

const OriginalPlaylist = ({ playlist }) => {
  const [showAddSong, setShowAddSong] = useState(false);
  const handleAddSongToggle = () => {
    setShowAddSong(!showAddSong);
  };
  return (
    <div>
      <div className="basic-playlist-info">
        <div class name="playlist-image-and-info">
          <h1>{playlist.name}</h1>
          <img src={playlist.coverImage} alt={playlist.name} />
          <p>{playlist.description}</p>
          <div>
            {/* <h2>Hashtags</h2> */}
            {playlist.hashtags.map(hashtag => (
              <span key={hashtag}>{hashtag}</span>
            ))}
          </div>
          <p>Total Songs: {playlist.numSongs}</p>
        </div>
        <div className='basic-playlist-buttons'>
          <button onClick={handleAddSongToggle}>
            {showAddSong ? "Cancel" : "Add Song"}
          </button>
          OR
          <button>Save Playlist</button>
        </div>
        {showAddSong && <AddSong playlistId={playlist.id} />}
      </div>
      <div>
        <h2>Songs</h2>
        {playlist.songs.map(song => (
          <Song key={song.id} {...song} />
        ))}
      </div>
    </div>
  );
};

export default OriginalPlaylist;