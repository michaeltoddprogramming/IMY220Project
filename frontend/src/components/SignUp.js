import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      error: ""
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({ error: "Invalid email format" });
    } else {
      this.setState({ error: "" });
    }
  };

  render() {
    const { username, password, email, error } = this.state;
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
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={this.handleInputChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="E-mail"
          id="email"
          value={email}
          onChange={this.handleInputChange}
        />
        <br />
        <button type="submit" id="register">Sign Up</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    );
  }
}

export default SignUp;