import React from "react";
import ProfilePreview from "./ProfilePreview";

class Following extends React.Component {
    state = {
        following: []
    };

    componentDidMount() {
        this.fetchFollowing();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId) {
            this.fetchFollowing();
        }
    }

    fetchFollowing = () => {
        const { userId } = this.props;
        
        fetch(`/api/users/${userId}/following`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ following: data });
            })
            .catch(error => {
                console.error('Error fetching following:', error);
            });
    }

    render() {
        const { following } = this.state;
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-center">Following</h3>
                {following.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {following.map((follower, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                <ProfilePreview image={follower.imageUrl} username={follower.username} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No following users</p>
                )}
            </div>
        );
    }
}

export default Following;