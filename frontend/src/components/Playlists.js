import React from "react";
import PlaylistPreview from "./PlaylistPreview";

class Playlists extends React.Component {
  render() {
    const { playlists } = this.props;
    return(
      <div>
        <h2>Your Playlist Feed</h2>
        {playlists.map((playlist, index) => (
          <div key={index}>
            <PlaylistPreview 
              title={playlist.title} 
              description={playlist.description} 
              imageUrl={playlist.imageUrl} 
            />
          <hr />
          </div>
        ))}
      </div>
    );
  }
};

export default Playlists;