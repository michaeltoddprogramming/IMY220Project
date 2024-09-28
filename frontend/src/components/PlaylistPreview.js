import React from "react";

class PlayListPreview extends React.Component {
  render() {
    const { title, imageUrl, description } = this.props;
    return (
      <div>
        <img src={imageUrl} alt="Playlist" style={{ width: '200px' }} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
};

export default PlayListPreview;