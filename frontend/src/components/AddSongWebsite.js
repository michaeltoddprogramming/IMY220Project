import React from "react";

class AddSongWebsite extends React.Component {
    render() {
        const { title, artist, link } = this.props;
        return (
            <div>
                <h3>Add Song to Playlist</h3>
                <form>
                    <label htmlFor="title">Song Title:</label>
                    <input type="text" id="title" placeholder="Song Title..." value={title} />

                    <label htmlFor="artist">Song Title:</label>
                    <input type="text" id="artist" placeholder="Artist..." value={artist}/>

                    <label htmlFor="link">Song Link:</label>
                    <input type="text" id="link" placeholder="Link..." value={link}/>
                </form>
            </div>
        );
    }
};

export default AddSongWebsite;