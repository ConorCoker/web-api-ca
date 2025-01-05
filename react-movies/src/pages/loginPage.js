import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const  handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Username and password must not be empty.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users', { username, password });
      const { token } = response.data; 
      localStorage.setItem('token', token);
      setSuccess(true);
      setError(null);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response ? err.response.data.msg : 'An error occurred');
      setSuccess(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
              required
            />
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            type="button"
            style={{
              backgroundColor: "#008000",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Logged in successfully!</p>}
    </div>
  );
};

export default LoginPage;

