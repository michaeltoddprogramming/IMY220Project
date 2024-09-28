import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupUsername: "",
      signupPassword: "",
      signupEmail: "",
      error: "",
      success: ""
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { signupUsername, signupPassword, signupEmail } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      this.setState({ error: "Invalid email format", success: "" });
      return;
    }
    if (!signupUsername || !signupPassword || !signupEmail) {
      this.setState({ error: "All fields are required", success: "" });
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/register", { signupUsername, signupPassword, signupEmail });
      this.setState({ success: "Registration successful!", error: "" });
    } catch (error) {
      this.setState({ error: error.response?.data?.message || "Registration failed", success: "" });
    }
  };

  render() {
    const { signupUsername, signupPassword, signupEmail, error, success } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="signupUsername">Username:</label>
        <input
          type="text"
          placeholder="Username"
          id="signupUsername"
          value={signupUsername}
          onChange={this.handleInputChange}
        />
        <br />
        <label htmlFor="signupPassword">Password:</label>
        <input
          type="password"
          placeholder="Password"
          id="signupPassword"
          value={signupPassword}
          onChange={this.handleInputChange}
        />
        <br />
        <label htmlFor="signupEmail">Email:</label>
        <input
          type="email"
          placeholder="E-mail"
          id="signupEmail"
          value={signupEmail}
          onChange={this.handleInputChange}
        />
        <br />
        <button type="submit" id="register">Sign Up</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    );
  }
}

export default SignUp;