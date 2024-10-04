import React from "react";

class Comment extends React.Component {
    render() {
        const { author, comment } = this.props;
        return(
            <div>
                <p>{ author } : { comment }</p>
            </div>
        );
    }
}

export default Comment;