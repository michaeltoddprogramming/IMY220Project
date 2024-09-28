import React from "react";

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
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ signupUsername, signupPassword, signupEmail })
      });
      const data = await response.json();
      if (response.ok) {
        this.setState({ success: "Registration successful!", error: "" });
      } else {
        this.setState({ error: data.message || "Registration failed", success: "" });
      }
    } catch (error) {
      this.setState({ error: "Registration failed", success: "" });
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