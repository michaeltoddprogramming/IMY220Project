import React from "react";
import ProfilePreview from "./ProfilePreview";

class Followers extends React.Component {
    state = {
        followers: []
    };

    componentDidMount() {
        this.fetchFollowers();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId) {
            this.fetchFollowers();
        }
    }

    fetchFollowers = () => {
        const { userId } = this.props;
        
        fetch(`/api/users/${userId}/followers`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ followers: data });
            })
            .catch(error => {
                console.error('Error fetching followers:', error);
            });
    }

    render() {
        const { followers } = this.state;
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-center">Followers</h3>
                {followers.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {followers.map((follower, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                <ProfilePreview image={follower.imageUrl} username={follower.username} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No followers</p>
                )}
            </div>
        );
    }
}

export default Followers;