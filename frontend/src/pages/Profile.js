import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header.js";
import ProfileComponent from '../components/ProfileComponent.js';
import Followers from '../components/Followers.js';
import Following from '../components/Following.js';
import EditProfile from '../components/EditProfile.js';
import CreatePlaylist from '../components/CreatePlaylist.js';
import { getCookie, deleteCookie } from '../utils/cookie';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            playlists: [],
            followers: [],
            following: [],
            loggedInUserId: null,
        };
    }

    async componentDidMount() {
        const { id } = this.props.params;
        const loggedInUserId = getCookie('userId');
        this.setState({ loggedInUserId });
        await this.fetchUser(id);
        await this.fetchPlaylists(id);
        await this.fetchFollowers(id);
        await this.fetchFollowing(id);
    }

    fetchUser = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ user: data });
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };

    fetchPlaylists = async (id) => {
        try {
            const response = await fetch(`/api/playlists/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ playlists: data });
        } catch (error) {
            console.log("Error fetching playlists:", error);
        }
    };

    fetchFollowers = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}/followers`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ followers: data });
        } catch (error) {
            console.log("Error fetching followers:", error);
        }
    };

    fetchFollowing = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}/following`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ following: data });
        } catch (error) {
            console.log("Error fetching following:", error);
        }
    };

    handleDeleteAccount = async () => {
        const { user, loggedInUserId } = this.state;
        if (user._id !== loggedInUserId) {
            return;
        }

        try {
            const response = await fetch(`/api/user/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': loggedInUserId,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            deleteCookie('userId');
            window.location.href = '/'; 
        } catch (error) {
            console.log("Error deleting account:", error);
        }
    };

    render() {
        const { user, playlists, followers, following, loggedInUserId } = this.state;

        if (!user) {
            return <div className="flex justify-center items-center h-screen"><div className="text-2xl">Loading...</div></div>;
        }

        const isOwnProfile = user._id === loggedInUserId;

        return (
            <div className="bg-gray-100 min-h-screen flex flex-col items-center">
                <header className="top-0 w-full p-6 flex justify-center z-10 bg-white shadow-md mb-8">
                    <h1 className="font-JunK text-8xl text-primary">JunK</h1>
                </header>
                <Header />
                <div className="container mx-auto p-6 flex flex-col items-center space-y-8">
                    <ProfileComponent 
                        userId={user._id}
                        username={user.username} 
                        description={user.description} 
                        imageUrl={user.imageUrl} 
                        playlists={playlists} 
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <Followers userId={user._id} />
                        <br></br>
                        <Following userId={user._id} />
                    </div>
                    {isOwnProfile && (
                        <div className="w-full flex flex-col items-center space-y-6">
                            <br></br>
                            <EditProfile username={user.username} description={user.description} />
                            <br></br>
                            <CreatePlaylist />
                            <br></br>    
                            <button
                                onClick={this.handleDeleteAccount}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                            >
                                Delete account
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const ProfileWithParams = (props) => {
    return <Profile {...props} params={useParams()} />;
};

export default ProfileWithParams;