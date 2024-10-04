import React from "react";
import PlaylistPreview from "./PlaylistPreview";
import { getCookie } from '../utils/cookie';

class ProfileComponent extends React.Component {
    state = {
        playlists: []
    };

    componentDidMount() {
        this.fetchPlaylists();
    }

    fetchPlaylists = () => {
        const { userId } = this.props;
        const loggedInUserId = getCookie('userId');

        // Determine if viewing own profile or another user's profile
        const fetchUrl = userId === loggedInUserId
            ? `/api/playlists/${loggedInUserId}`
            : `/api/playlists/${userId}/playlists`;

        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ playlists: data });
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
            });
    }

    render() {
        const { imageUrl, username, description } = this.props;
        const { playlists } = this.state;

        return (
            <div>
                <img src={imageUrl} alt="Placeholder" style={{ width: '200px' }} />
                <h2>{username}</h2>
                <p>{description}</p>
                
                <hr/>

                <h2>Playlists</h2>
                {playlists.map((playlist, index) => (
                    <div key={index}>
                        <PlaylistPreview 
                            id={playlist.playlistID} 
                            name={playlist.name} 
                            description={playlist.description} 
                            imageUrl={playlist.imageUrl} 
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default ProfileComponent;