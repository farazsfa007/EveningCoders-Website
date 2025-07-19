import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/navbar";
import Home from "./Home/home";
import Pricing from "./Pricing/pricing";
import Services from "./Services/services"
import Roadmap from "./Roadmap/roadmap"

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
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Home darkMode={darkMode} setDarkMode={setDarkMode} />
      <Pricing darkMode={darkMode} setDarkMode={setDarkMode} />
      <Services darkMode={darkMode} setDarkMode={setDarkMode} />
      <Roadmap darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
