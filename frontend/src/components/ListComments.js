import React from "react";
import Comment from "./Comment";

class ListComments extends React.Component {
    render() {
        const { comments } = this.props;
        return (
            <div>
                <h3>Comments</h3>
                {comments.map((comment, index) => (
                    <div key={ index }>
                        <Comment author={ comment.author } comment={ comment.comment } />
                    </div>
                ))}
            </div>
        );
    }
}

export default ListComments;