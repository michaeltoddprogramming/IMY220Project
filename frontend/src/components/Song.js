import React from "react";
import { getCookie } from '../utils/cookie';

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            selectedPlaylistId: '',
            selectedPlaylistName: ''
        };
    }

    async componentDidMount() {
        const userId = getCookie('userId');
        try {
            const response = await fetch(`/api/playlists/${userId}`);
            if (response.ok) {
                const playlists = await response.json();
                this.setState({ playlists });
            } else {
                console.error('Failed to fetch playlists');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    handleChange = (event) => {
        const selectedPlaylistId = event.target.value;
        const selectedPlaylistName = event.target.options[event.target.selectedIndex].text;
        this.setState({ selectedPlaylistId, selectedPlaylistName });
    };

    handleAddToPlaylist = async () => {
        const { selectedPlaylistId } = this.state;
        const { title } = this.props;
        const trackId = this.generateTrackId(title);

        try {
            const response = await fetch(`/api/playlists/${selectedPlaylistId}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ trackId })
            });
            if (response.ok) {
                console.log('Song added to playlist successfully');
            } else {
                console.error('Failed to add song to playlist');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    handleDeleteSong = async () => {
        const { title } = this.props;
        const trackId = this.generateTrackId(title);

        try {
            const response = await fetch(`/api/songs/${trackId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Song deleted successfully');
            } else {
                console.error('Failed to delete song');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    generateTrackId = (title) => {
        return title.split(' ').map(word => word[0].toLowerCase()).join('');
    };

    render() {
        const { title, link } = this.props;
        const { playlists, selectedPlaylistId, selectedPlaylistName } = this.state;

        let trackId = '';
        if (link && link.includes('/track/')) {
            const parts = link.split('/track/');
            if (parts[1] && parts[1].includes('?')) {
                trackId = parts[1].split('?')[0];
            } else {
                console.error("Invalid link format:", link);
            }
        } else {
            console.error("Invalid link format:", link);
        }

        const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

        return (
            <div className="border border-black p-4 rounded-lg bg-primary shadow-md text-secondary">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                {trackId ? (
                    <iframe
                        src={embedUrl}
                        width="100%"
                        height="80"
                        allowtransparency="true"
                        allow="encrypted-media"
                        className="mb-4"
                    ></iframe>
                ) : (
                    <p>Invalid track link</p>
                )}
                <select
                    value={selectedPlaylistId}
                    onChange={this.handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
                >
                    <option value="" disabled>Select a playlist</option>
                    {playlists.map((playlist) => (
                        <option key={playlist.playlistID} value={playlist.playlistID}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={this.handleAddToPlaylist}
                    className="bg-secondary text-primary py-2 px-4 rounded mr-2 hover:bg-gray-200 transition duration-300"
                >
                    Add to playlist
                </button>
                <button
                    onClick={this.handleDeleteSong}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                    Delete song
                </button>
                {selectedPlaylistName && (
                    <p className="mt-4 italic">Selected Playlist: {selectedPlaylistName}</p>
                )}
            </div>
        );
    }
}

export default Song;