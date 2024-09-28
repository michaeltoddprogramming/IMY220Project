import React, { useEffect, useState } from 'react';
import Comment from './Comment';

const Comments = ({ playlistId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
    const fetchedComments = [
      { id: 1, text: "Wonderful playlist, you have great taste!", author: "User1234" },
      { id: 2, text: "Love that songs, such a vibe!", author: "User1234" }
    ];
    setComments(fetchedComments);
    };
    fetchComments();
  }, [playlistId]);

  return (
    <div className="comment-container">
      <h2>Comments</h2>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;