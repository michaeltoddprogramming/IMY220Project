import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      token: ""
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await axios.post("/api/login", { email, password });
      this.setState({ token: response.data.token, error: "" });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      this.setState({ error: error.response.data.message });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
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
        <button type="submit" id="login">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    );
  }
}

export default Login;