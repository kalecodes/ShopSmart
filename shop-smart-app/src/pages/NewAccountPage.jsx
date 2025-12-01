import "./NewAccountPage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function NewAccountPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromLanding = params.get("email");
    if (emailFromLanding) setEmail(emailFromLanding);
  }, [location.search]);

  const validateForm = () => {
    const newErrors = {
      email: "",
      username: "",
      password: "",
    };

    if (!email || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address (must include '@').";
    }
    if (!password || password.length < 7) {
      newErrors.password = "Password must be at least 7 characters long.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/create_user", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          username,
          email,
          password
        }),
      });

      const data = await response.json();

      if(!response.ok || !data.ok) {
        alert(data.error || "Account creation failed");
        return;
      } else {
        alert("Account was successfully created, please login.");
        navigate(`/sign-in`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="new-account-page">
      <h1 className="new-account-title">Create New Account</h1>
      <form className="new-account-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="text"
          placeholder="Username"
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="error-text">{errors.username}</p>}
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit" className="form-button">
          {/* on click add the info to database and take them to login page */}
          Sign Up
        </button>
      </form>
    </div>
  );
}
