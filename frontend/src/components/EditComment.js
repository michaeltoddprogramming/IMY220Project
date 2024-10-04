import React from "react";

class EditComment extends React.Component {
    render() {
        return (
            <form>
                <label htmlFor="comment">Enter comment</label>
                <input type="text" placeholder="Enter comment here..." id="comment"/>
                <button type="submit">Post comment</button>
            </form>
        );
    }
}

export default EditComment;