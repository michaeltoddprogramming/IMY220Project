import React from "react";
import { getCookie } from '../utils/cookie';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            description: props.description
        };
    }

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, description } = this.state;
        const userID = getCookie('userId');

        fetch(`/api/users/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, description })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            console.log('Profile updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
    }

    render() {
        const { username, description } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Edit name here</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={this.handleInputChange} 
                />
                <br/>
                <label htmlFor="description">Edit description here</label>
                <input 
                    type="text" 
                    id="description" 
                    value={description} 
                    onChange={this.handleInputChange} 
                />
                <br/>
                <button type="submit">Submit Changes</button>
            </form>
        );
    }
}

export default EditProfile;