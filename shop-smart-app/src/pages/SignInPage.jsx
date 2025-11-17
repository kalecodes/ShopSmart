import "./SignInPage.css";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <h1 className="sign-in-title">Sign In</h1>
      <form className="sign-in-form">
        <input type="email" placeholder="Email" className="form-input-signin" />
        <input type="password" placeholder="Password" className="form-input-signin" />
        <button type="submit" className="form-button">
          Log In
        </button>
      </form>
    </div>
  );
}
