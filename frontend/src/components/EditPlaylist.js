import React, { useState } from 'react';

const EditPlaylist = ({ playlist, onEditComplete }) => {
  const [title, setName] = useState(playlist.title);
  const [description, setDescription] = useState(playlist.description);
  const [imageURL, setCoverImage] = useState(playlist.imageURL);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Cover Image:
        <input type="text" value={imageURL} onChange={(e) => setCoverImage(e.target.value)} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditPlaylist;