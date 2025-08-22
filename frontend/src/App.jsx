import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar/navbar";
import MouseTrail from "./MouseTrail/MouseTrail";
import LoginPopup from "./LoginPopup/LoginPopup"; // Page version

// Lazy load the main components
const Home = lazy(() => import("./Home/home"));
const Pricing = lazy(() => import("./Pricing/pricing"));
const Services = lazy(() => import("./Services/services"));
const CareerPage = lazy(() => import("./CareerPage/career"));
const Footer = lazy(() => import("./Footer/footer"));

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
    </Router>
  );
}

function AppContent({ darkMode, setDarkMode }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"]; // pages where Navbar should be hidden

  return (
    <div className="min-h-screen bg-white dark:bg-[#0e1119] text-black dark:text-white transition-colors duration-300">
      <MouseTrail />

      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      )}

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Routes>
          {/* Main Website Routes */}
          <Route
            path="/"
            element={
              <>
                <Home darkMode={darkMode} setDarkMode={setDarkMode} />
                <Pricing darkMode={darkMode} setDarkMode={setDarkMode} />
                <Services darkMode={darkMode} setDarkMode={setDarkMode} />
                <CareerPage darkMode={darkMode} setDarkMode={setDarkMode} />
                <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
              </>
            }
          />

          {/* Login Page Route */}
          <Route path="/login" element={<LoginPopup darkMode={darkMode} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
