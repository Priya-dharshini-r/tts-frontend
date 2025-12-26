import { useState } from "react";
import { loginUser, signupUser } from "../api";

export default function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      if (mode === "login") {
        await loginUser(email, password);
      } else {
        await signupUser(email, password);
      }

      onAuthSuccess();
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <button
        onClick={() =>
          setMode(mode === "login" ? "signup" : "login")
        }
      >
        Switch to {mode === "login" ? "Sign Up" : "Login"}
      </button>
    </div>
  );
}
