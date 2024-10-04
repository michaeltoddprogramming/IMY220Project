import React from 'react';

class CreateSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            message: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { title, link } = this.state;
        const newSong = { title, link };

        try {
            const response = await fetch('/api/createsong', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSong),
            });

            if (response.ok) {
                this.setState({
                    title: '',
                    link: '',
                    message: 'Song created successfully!'
                });
            } else {
                const errorData = await response.json();
                this.setState({ message: `Error: ${errorData.message}` });
            }
        } catch (error) {
            this.setState({ message: `Error: ${error.message}` });
        }
    };

    render() {
        const { title, link, message } = this.state;

        return (
            <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-secondary">
                <h2 className="text-4xl font-bold text-center mb-6 mt-20 text-white">Add a New Song</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Spotify Link</label>
                        <input
                            type="text"
                            name="link"
                            value={link}
                            onChange={this.handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Create Song
                    </button>
                </form>
                {message && <div className="mt-4 text-center text-red-500">{message}</div>}
            </div>
        );
    }
}

export default CreateSong;