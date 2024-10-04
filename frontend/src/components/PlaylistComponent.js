import React from "react";
import Song from "./Song";

class PlaylistComponent extends React.Component {
    render() {
        const { name, description, imageUrl, songs } = this.props;
        return (
            <div>
                <img src={imageUrl} alt="Playlist cover" width='200px'/>
                <h2>{name}</h2>
                <p>{description}</p>
                
                {songs.map((song, index) => (
                    <div key={index}>
                        <Song title={song.title} link={song.link} imageUrl={song.imageUrl} />
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}

export default PlaylistComponent;