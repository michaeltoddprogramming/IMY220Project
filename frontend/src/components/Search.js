import React from "react";

class Search extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="search">Search...</label>
        <input id="search" placeholder="Search..." type="text"/>
        <button type="submit" id="Search">Search</button>
      </div>
    );
  }
};

export default Search;