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
            <div>
                <h3>Following</h3>
                {following.length > 0 ? (
                    following.map((follower, index) => (
                        <div key={index}>
                            <ProfilePreview image={follower.imageUrl} username={follower.username} />
                        </div>
                    ))
                ) : (
                    <p>No following available.</p>
                )}
            </div>
        );
    }
}

export default Following;