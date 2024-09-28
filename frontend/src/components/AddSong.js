import React from "react";

class AddSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      link: "",
      dateAdded: ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const addedSong = {
      name: this.state.title,
      artist: this.state.artist,
      link: this.state.link,
      dateAdded: this.state.dateAdded
    }
    this.setState({
      title: "",
      artist: "",
      link: "",
      dateAdded: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-song-form">
        <label htmlFor="title">Song Title</label>
        <input type="text" id="title" value={this.state.title} onChange={this.handleChange} required/>
        <label htmlFor="artist">Artist</label>
        <input type="text" id="artist" value={this.state.artist} onChange={this.handleChange} required/>
        <label htmlFor="link">Link</label>
        <input type="text" id="link" value={this.state.link} onChange={this.handleChange} required/>
        <label htmlFor="dateAdded">Date Added</label>
        <input type="date" id="dateAdded" value={this.state.dateAdded} onChange={this.handleChange} required/>
        <button type="submit">Add Song</button>
      </form>
    )
  }
}

export default AddSong;