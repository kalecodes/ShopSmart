import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">ShopSmart</Link>
      </div>
      <div className="navbar-links">
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/shopping" className="navbar-link">Shopping</Link>
        <Link to="/new-account" className="navbar-link">Sign Up</Link>
      </div>
    </nav>
  );
}
