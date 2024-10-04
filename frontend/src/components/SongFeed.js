import React from "react";
import Song from "./Song";

class SongFeed extends React.Component {
    render() {
        const { songs } = this.props;

        return(
            <div>
                {songs.map((song, index) => (
                  <div key={index}>
                    <Song 
                      title={song.title} 
                      link={song.link} 
                    />
                  </div>
                ))}
            </div>
        );
    }
};

export default SongFeed;