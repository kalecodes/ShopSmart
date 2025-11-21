import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="ShopSmart logo" className="logo-image" />
        <Link to="/" className="navbar-brand">ShopSmart</Link>
      </div>
      <div className="navbar-links">
        <Link to="/about" className="navbar-link">About</Link>
        {/* <Link to="/shopping" className="navbar-link">Shopping</Link> */}
        <Link to="/sign-in" className="navbar-link">Sign In</Link>
      </div>
    </nav>
  );
}
