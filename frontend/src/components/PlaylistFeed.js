import React from "react";
import PlaylistPreview from "./PlaylistPreview";

class PlaylistFeed extends React.Component {
    render() {
        const { playlists } = this.props;

        return (
            <div>
                <h2>Playlist Feed</h2>

                {playlists.map((playlist, index) => (
                    <div key={index}>
                        <PlaylistPreview 
                            id={playlist.playlistID} 
                            name={playlist.name} 
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

export default PlaylistFeed;