import "./LandingPage.css";
import Lottie from "lottie-react";
import welcomeLottie from "../assets/welcomeLottieWhite.json";
import box from "../assets/box.png";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Lottie animationData={welcomeLottie} loop={false} className="welcomeLottie"></Lottie>
      <p className="landing-text">
        Shop Smart - We aim to bring a unique, automated solution to the shopping experience.
        Managing common household item preferences and tracking key retailers has 
        never been easier.
      </p>
      <div className="landing-buttons">
        <input type="email" placeholder="Email" className="form-input" />
        <a href="/new-account" className="landing-link">
          Sign Up
        </a>
      </div>
      <div className="features-section">
        {/* eventually we will need to add a function to pull these information from 
        the database and add them dynamically */}
        <div className="feature-frame">
          <img src={box} alt="item-image" className="item-image" />
          <h2 className="feature-title">Feature-1</h2>
          <p className="feature-paragraph">This is where the feature description will be placed for each item.</p>
        </div>
        <div className="feature-frame">
          <img src={box} alt="item-image" className="item-image" />
          <h2 className="feature-title">Feature-1</h2>
          <p className="feature-paragraph">This is where the feature description will be placed for each item.</p>
        </div>
        <div className="feature-frame">
          <img src={box} alt="item-image" className="item-image" />
          <h2 className="feature-title">Feature-1</h2>
          <p className="feature-paragraph">This is where the feature description will be placed for each item.</p>
        </div>
        <div className="learn-div">
          <a href="/shopping" className="learn-link">Learn More</a>
        </div>
      </div>
    </div>
  );
}
