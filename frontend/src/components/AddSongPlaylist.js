import React from "react";

class AddSongPlaylist extends React.Component {
    render() {
        const { title, artist } = this.props;
        return (
            <div>
                <h3>Add Song to Playlist</h3>
                <form>
                    <label htmlFor="title">Song Title:</label>
                    <input type="text" id="title" placeholder="Song Title..." value={title} />

                    <label htmlFor="artist">Song Title:</label>
                    <input type="text" id="artist" placeholder="Artist..." value={artist}/>

                    <label htmlFor="select">Playlist:</label>
                    <select id="select">
                      <option value="">Select Playlist</option>
                      <option value="playlist1">Playlist 1</option>
                      <option value="playlist2">Playlist 2</option>
                      <option value="playlist3">Playlist 3</option>
                    </select>
                </form>
            </div>
        );
    }
};

export default AddSongPlaylist;