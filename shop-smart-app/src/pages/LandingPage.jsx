import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to ShopSmart</h1>
      <p className="landing-text">
        Effortlessly manage your shopping lists and favorite stores.
      </p>
      <div className="landing-buttons">
        <a href="/new-account" className="landing-link">
          Create Account
        </a>
        <a href="/home" className="landing-link">
          Go to Home
        </a>
      </div>
    </div>
  );
}
