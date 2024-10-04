import React from "react";
import { getCookie, deleteCookie } from '../utils/cookie';

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
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Insert playlist name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Playlist name here..."
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <br/>
                <label htmlFor="description">Insert description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Playlist description here..."
                    value={this.state.description}
                    onChange={this.handleChange}
                />
                <br/>
                <button type="submit">Create Playlist</button>
            </form>
        );
    }
}

export default CreatePlaylist;