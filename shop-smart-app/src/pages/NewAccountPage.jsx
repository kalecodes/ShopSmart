import "./NewAccountPage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function NewAccountPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
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
      firstName: "",
      lastName: "",
      password: "",
    };

    if (!email || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address (must include '@').";
    }

    const nameRegex = /^[A-Za-z-]+$/;

    if (!firstName || !nameRegex.test(firstName)) {
      newErrors.firstName = "First name can only contain letters and '-'.";
    }

    if (!lastName || !nameRegex.test(lastName)) {
      newErrors.lastName = "Last name can only contain letters and '-'.";
    }

    if (!password || password.length < 7) {
      newErrors.password = "Password must be at least 7 characters long.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    return !hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form is valid, submitting:", {
        email,
        firstName,
        lastName,
        password, // remove password from console later
      });
    }
    // add this info to db and navigate to sign-in
    
    navigate(`/sign-in`);
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
          placeholder="First Name"
          className="form-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        <input
          type="text"
          placeholder="Last Name"
          className="form-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <p className="error-text">{errors.lastName}</p>}
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
