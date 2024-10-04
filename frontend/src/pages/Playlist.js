import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header.js";
import PlaylistComponent from '../components/PlaylistComponent.js';
import EditPlaylist from '../components/EditPlaylist.js';
import ListComments from '../components/ListComments.js';
import EditComment from '../components/EditComment.js';
import { getCookie } from '../utils/cookie';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: null,
            songs: [],
            error: null,
            loggedInUserId: null,
        };
    }
    
    async componentDidMount() {
        const { id } = this.props.params;
        const loggedInUserId = getCookie('userId');
        this.setState({ loggedInUserId });
        await this.fetchPlaylist(id);
        await this.fetchSongs(id);
    }

    fetchPlaylist = async (id) => {
        try {
            const response = await fetch(`/api/playlist/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ playlist: data, error: null });
        } catch (error) {
            this.setState({ error: 'Playlist not found' });
            console.log("Error fetching playlist data:", error);
        }
    };

    fetchSongs = async (id) => {
        try {
            const response = await fetch(`/api/playlist/${id}/songs`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ songs: data });
        } catch (error) {
            console.log("Error fetching songs data:", error);
        }
    };

    render() {
        const { playlist, songs, error, loggedInUserId } = this.state;
        
        if (error) {
            return <div>{error}</div>;
        }

        if (!playlist) {
            return <div>Loading...</div>;
        }

        const isOwner = playlist.userIDs.includes(loggedInUserId);

        return (
            <div>
                <Header />
                <PlaylistComponent 
                    name={playlist.name} 
                    description={playlist.description} 
                    imageUrl={playlist.imageUrl} 
                    songs={songs} 
                />
                {isOwner && <EditPlaylist playlistID={playlist.playlistID} name={playlist.name} description={playlist.description} />}
                <ListComments comments={playlist.comments} />
                {isOwner && <EditComment />}
            </div>
        );
    }
}

const PlaylistWithParams = (props) => {
    return <Playlist {...props} params={useParams()} />;
};

export default PlaylistWithParams;