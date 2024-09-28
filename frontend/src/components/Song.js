import React from "react";

class Song extends React.Component {
  render() {
    const { title, link, imageUrl } = this.props;
    return (
      <div>
        <img src={imageUrl} alt="Songs" style={{ width: '200px' }} />
        <h2>{title}</h2>
        <p>{link}</p>
      </div>
    );
  }
};

export default Song;