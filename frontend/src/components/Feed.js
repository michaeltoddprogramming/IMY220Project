import React from "react";
import Song from "./Song";

class Feed extends React.Component {
  render() {
    const { songs } = this.props;
    return(
      <div>
        <h2>Your Song Feed</h2>
        {songs.map((song, index) => (
          <div key={index}>
            <Song 
              title={song.title}
              artist={song.artist}
              link={song.link} 
              imageUrl={song.imageUrl} 
            />
          <hr />
          </div>
        ))}
      </div>
    );
  }
};

export default Feed;