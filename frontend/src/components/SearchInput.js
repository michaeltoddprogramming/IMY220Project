import React, { useState } from "react";

const SearchInput = ({ onSearchResults }) => {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("playlists"); // Default search type

    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/search?term=${term}&type=${type}`);
            const data = await response.json();
            onSearchResults(data, type);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="search" className="text-white mb-2">Enter search term</label>
                    <input
                        id="search"
                        placeholder="Enter search term here..."
                        type="text"
                        value={term}
                        onChange={handleInputChange}
                        className="p-2 rounded border border-gray-300 text-black"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="type" className="text-white mb-2">Select search type</label>
                    <select
                        id="type"
                        value={type}
                        onChange={handleTypeChange}
                        className="p-2 rounded border border-gray-300 text-black"
                    >
                        <option value="playlists">Playlists</option>
                        <option value="songs">Songs</option>
                        <option value="users">Users</option>
                    </select>
                </div>
                <div className="flex items-end">
                    <button
                        type="submit"
                        className="bg-secondary text-white rounded hover:bg-gray-700 transition duration-300 px-4 py-2"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchInput;