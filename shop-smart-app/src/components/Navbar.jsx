import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const isLoggedIn = !!userId;

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="ShopSmart logo" className="logo-image" />
        <Link to="/" className="navbar-brand">ShopSmart</Link>
      </div>
      {isLoggedIn ? (
        <>
          <span className="navbar-user">Hello, {username}</span>
        </>
      ) : (<></>)}

      <div className="navbar-links">
        <Link to="/about" className="navbar-link">About</Link>

        {isLoggedIn ? (
          <>
            <Link to="/shopping" className="navbar-link">Shop</Link>
            <button onClick={handleLogout} className="navbar-link logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/sign-in" className="navbar-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
}
