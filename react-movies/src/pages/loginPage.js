import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Email and password must not be empty.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        setSuccess(true);
        setError(null);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login error:", error.code, error.message);
        setError(error.message);
        setSuccess(false);
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
