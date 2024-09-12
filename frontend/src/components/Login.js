import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username } = this.state;
    if (username.length <= 8) {
      this.setState({ error: "Username must be more than 8 letters" });
    } else {
      this.setState({ error: "" });
    }
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={this.handleInputChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          placeholder="Password"
          id="password"
          value={password}
          onChange={this.handleInputChange}
        />
        <br />
        <button type="submit" id="login">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    );
  }
}

export default Login;