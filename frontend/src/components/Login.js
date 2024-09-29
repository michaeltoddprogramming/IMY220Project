import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
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
        localStorage.setItem("JunKLoginToken", data.token);
        navigate(`/profile/${data.userId}`);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        value={email}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        placeholder="Password"
        id="password"
        value={password}
        onChange={handleInputChange}
      />
      <br />
      <button type="submit" id="login">Log In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;