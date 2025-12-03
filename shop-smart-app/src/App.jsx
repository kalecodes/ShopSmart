import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import NewAccountPage from "./pages/NewAccountPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShoppingPage from "./pages/ShoppingPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/new-account" element={<NewAccountPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/shop" element={<ShoppingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
