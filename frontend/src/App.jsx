import React, { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./Navbar/navbar";
import MouseTrail from "./MouseTrail/MouseTrail";

// Lazy load the main components
const Home = lazy(() => import("./Home/home"));
const Pricing = lazy(() => import("./Pricing/pricing"));
const Services = lazy(() => import("./Services/services"));
const Roadmap = lazy(() => import("./Roadmap/roadmap"));
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
    <div className="min-h-screen bg-white dark:bg-[#0e1119] text-black dark:text-white transition-colors duration-300">
      <MouseTrail />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Home darkMode={darkMode} setDarkMode={setDarkMode} />
        <Pricing darkMode={darkMode} setDarkMode={setDarkMode} />
        <Services darkMode={darkMode} setDarkMode={setDarkMode} />
        <Roadmap darkMode={darkMode} setDarkMode={setDarkMode} />
        <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
      </Suspense>
    </div>
  );
}

export default App;
