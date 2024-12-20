import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { createUser } from "../Utils/api"; // Import the createUser function
import { auth, googleProvider } from "../Utils/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");

      // Send email to backend to create or check the user
      await createUser(userCredential.user.email);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google!");

      // Send email to backend to create or check the user
      await createUser(result.user.email);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleEmailLogin}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Login with Email
        </button>
      </form>
      <p>or</p>
      <button onClick={handleGoogleLogin} style={{ padding: "10px 20px" }}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
