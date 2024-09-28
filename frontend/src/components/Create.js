import React from "react";

class Create extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      genre: "",
      description: "",
      coverImage: "",
      hashtags: "",
      songs: []
    };
    }
    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
      event.preventDefault();
      const { title, genre, description, coverImage, hashtags, songs } = this.state;
      console.log({
        title,
        genre,
        description,
        coverImage,
        hashtags: hashtags.split(",").map(tag => tag.trim()),
      });
      this.setState({
        title: "",
        genre: "",
        description: "",
        coverImage: "",
        hashtags: "",
        songs: []
      });
    };

  render() {
    const { title, genre, description, coverImage, hashtags, songs } = this.state;
      const genres = ["Pop", "Rock", "Hip Hop", "Jazz", "Metal", "Classical"];
      return (
        <div className="create-playlist-container">
          <h1>Create Playlist</h1>
          <form onSubmit={this.handleSubmit} className="create-playlist-form">
            <label htmlFor="title">Playlist Name</label>
            <input type="text" id="title" name="title" value={title} onChange={this.handleInputChange} required/>
            <label htmlFor="genre">Genre</label>
            <select id="genre" name="genre" value={genre} onChange={this.handleInputChange} required>
              <option value="">Select a genre</option>
              {genres.map((g, index) => (
                <option key={index} value={g}>{g}</option>
              ))}
            </select>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={description} onChange={this.handleInputChange}/>
            <label htmlFor="coverImage">Cover Image URL</label>
            <input type="file" id="coverImage" name="coverImage" value={coverImage} onChange={this.handleInputChange}/>
            <label htmlFor="hashtags">Hashtags (comma separated)</label>
            <input type="text" id="hashtags" name="hashtags" value={hashtags} onChange={this.handleInputChange}/>
            <button type="submit">Create Playlist</button>
          </form>
      </div>
    );
  }
}

export default Create;