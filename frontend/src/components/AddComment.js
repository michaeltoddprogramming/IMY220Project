import React, { useState } from 'react';

const AddComment = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommit = () => {
    console.log('Committing comment:', comment);
    setComment('');
  };

  return (
    <div>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Enter your comment..."
      />
      <button onClick={handleCommit}>Commit</button>
    </div>
  );
};

export default AddComment;