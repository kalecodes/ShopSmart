import "./LandingPage.css";
import Lottie from "lottie-react";
import welcomeLottie from "../assets/welcomeLottieWhite.json";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSignUp() {
    navigate(`/new-account?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="landing-page">
      <Lottie animationData={welcomeLottie} loop={false} className="welcomeLottie"></Lottie>
      <p className="landing-text">
        Shop Smart - We aim to bring a unique, automated solution to the shopping experience.
        Managing common household item preferences and tracking key retailers has 
        never been easier.
      </p>
      <div className="landing-buttons">
        <input type="email" placeholder="Email" className="form-input-landing" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={handleSignUp} className="landing-link">
          Sign Up
        </button>
      </div>
      <div className="features-section">
        <div className="feature-frame">
          <img src={img3} alt="item-image" className="item-image" />
          <h2 className="feature-title">Search for an Item</h2>
          <p className="feature-paragraph">Search for your favorite items and organize the way you shop.</p>
        </div>
        <div className="feature-frame">
          <img src={img4} alt="item-image" className="item-image" />
          <h2 className="feature-title">Shopping Checklist</h2>
          <p className="feature-paragraph">Creating your shopping list has never been easier. We want to make sure you get all your items from a single trip.</p>
        </div>
        <div className="feature-frame">
          <img src={img5} alt="item-image" className="item-image" />
          <h2 className="feature-title">Organize Your Trip</h2>
          <p className="feature-paragraph">Organize your shopping list and your trip. Save time while getting all the items you need.</p>
        </div>
        <div className="learn-div">
          <Link to="/about" className="learn-link">Learn More</Link>
        </div>
      </div>
    </div>
  );
}
