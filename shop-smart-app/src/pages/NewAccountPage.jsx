import "./NewAccountPage.css";

export default function NewAccountPage() {
  return (
    <div className="new-account-page">
      <h1 className="new-account-title">Create New Account</h1>
      <form className="new-account-form">
        <input type="text" placeholder="Full Name" className="form-input" />
        <input type="email" placeholder="Email" className="form-input" />
        <input type="password" placeholder="Password" className="form-input" />
        <button type="submit" className="form-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}
