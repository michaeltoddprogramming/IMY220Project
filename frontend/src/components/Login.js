import React from "react";

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
    if (!email || !password) {
      this.setState({ error: "All fields are required" });
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        this.setState({ token: data.token, error: "" });
        localStorage.setItem("token", data.token);
      } else {
        this.setState({ error: data.message || "Login failed" });
      }
    } catch (error) {
      this.setState({ error: "Login failed" });
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
        <button type="submit" id="login">Log In</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    );
  }
}

export default Login;