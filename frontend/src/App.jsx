import React, { useEffect, useState } from "react";
import Home from "./Home/home.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Default to dark if no theme is set
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
    <div className="min-h-screen transition-colors duration-300">
      <Home darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
