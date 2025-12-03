import "./SignInPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function SignInPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const successMsg = location.state?.msg;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || "Login failed");
        return;
      }

      // SUCCESS: navigate to shopping page with user ID
      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("username", username);
      navigate("/");


    } catch (err) {
      console.error(err);
      setErrorMsg("Server error");
    }
  };

  return (
    <div className="sign-in-page">
      <h1 className="sign-in-title">Sign In</h1>

      {successMsg && <p className="success-text">{successMsg}</p>}
      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="form-input-signin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-input-signin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="form-button">
          Log In
        </button>
      </form>
    </div>
  );
}
