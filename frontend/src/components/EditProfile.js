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
            <form onSubmit={this.handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Edit name here</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={this.handleInputChange} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Edit description here</label>
                    <input 
                        type="text" 
                        id="description" 
                        value={description} 
                        onChange={this.handleInputChange} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Submit Changes
                </button>
            </form>
        );
    }
}

export default EditProfile;