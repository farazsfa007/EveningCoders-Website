import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaSun, FaMoon } from "react-icons/fa";
import logoImage from "../assets/logo image.jpg";

function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/feature" },
    { name: "Pricing", path: "/pricing" },
    { name: "Services", path: "/services" },
    { name: "Roadmap", path: "/roadmap" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 dark:bg-gray-800/60 py-4 shadow-md transition-colors duration-300 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-y-4">
        <Link
          to="/"
          className="flex items-center space-x-2"
          onClick={closeMenu}
        >
          <img
            src={logoImage}
            alt="Evening Coders Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-2xl font-semibold text-white whitespace-nowrap">
            evening coders
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={closeMenu}
              className="text-gray-200 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Link
            to="/contact"
            className="text-gray-200 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors duration-300"
          >
            Contact Us
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-lg bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/60 transition duration-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-400" />
            )}
          </button>

          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950/80 dark:bg-gray-700/80 px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl">
              Get a Quote
            </span>
          </button>
        </div>

        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-lg bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/60 transition duration-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-400" />
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <RxCross2 size={24} />
            ) : (
              <GiHamburgerMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden w-full absolute top-full left-0 bg-black/80 dark:bg-gray-900/80 z-40 py-4 shadow-lg">
          <div className="container mx-auto px-8 flex flex-col items-center gap-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className="text-gray-200 hover:text-white uppercase text-base font-medium tracking-wider transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={closeMenu}
              className="text-gray-200 hover:text-white uppercase text-base font-medium tracking-wider transition-colors duration-300"
            >
              Contact Us
            </Link>

            <button className="relative w-full inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950/80 dark:bg-gray-700/80 px-8 py-2 text-base font-medium text-white backdrop-blur-3xl">
                Get a Quote
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
