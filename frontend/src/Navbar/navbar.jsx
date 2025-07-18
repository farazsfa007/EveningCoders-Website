import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaSun, FaMoon } from "react-icons/fa";
import logoImage from "../assets/logo image.jpg";

function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["features", "pricing", "services", "roadmap"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0e1119] dark:bg-gray-800 py-4 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-y-4">
        <div className="flex items-center space-x-4">
          <a href="/" aria-label="Home" className="flex items-center space-x-2">
            <img
              src={logoImage}
              alt="Evening Coders Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-2xl font-semibold text-white whitespace-nowrap">
              evening coders
            </span>
          </a>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-6 xl:gap-10">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href="#contact"
            className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors"
          >
            Contact Us
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-400" />
            )}
          </button>

          <div className="px-2 pt-2">
            <button className="relative w-full inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 dark:bg-gray-700 px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                Get a Quote
              </span>
            </button>
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
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
        <div className="lg:hidden w-full absolute top-full left-0 bg-[#0e1119] dark:bg-gray-800 z-40">
          <div className="container mx-auto px-8 py-4 flex flex-col items-center gap-y-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
