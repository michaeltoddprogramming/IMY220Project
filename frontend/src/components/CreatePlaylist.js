import React from "react";
import { getCookie } from '../utils/cookie';

class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const id = getCookie('userId');
        try {
            const response = await fetch(`/api/${id}/createplaylist`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    description: this.state.description
                })
            });
            if (response.ok) {
                console.log('Playlist created successfully');
            } else {
                console.log('Creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Playlist</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Insert playlist name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Playlist name here..."
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Insert description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Playlist description here..."
                        value={this.state.description}
                        onChange={this.handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Create Playlist
                </button>
            </form>
        );
    }
}

export default CreatePlaylist;