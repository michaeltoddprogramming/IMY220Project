import React from "react";

class ProfilePreview extends React.Component {
    render() {
        const { image, username } = this.props;
        return (
            <div>
                <img src={ image } alt="Placeholder" style={{ width: '50px' }} />
                <span>{ username }</span>
            </div>
        );
    }
};

export default ProfilePreview;