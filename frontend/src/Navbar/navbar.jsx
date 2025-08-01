/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import logoImage from "../assets/logo image.jpg";
import ContactFormModal from "../ContactForm/ContactFormModal";

function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // const navItems = ["home", "features", "pricing", "services", "roadmap"];
  const navItems = ["home", "features", "pricing", "services", "career"];

  const navLinkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  const handleSmoothScroll = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = `#${id}`; // fallback
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-black/70 dark:bg-gray-800/50 py-4 shadow-md transition-colors duration-300 backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-1 flex flex-wrap items-center justify-between gap-y-4">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <a href="/" className="flex items-center space-x-2">
            <img
              src={logoImage}
              alt="Evening Coders Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <motion.span
              className="text-2xl font-semibold whitespace-nowrap animate-slow-bounce text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 drop-shadow-[0_0_8px_#3B82F6] animate-glow"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              evening coders
            </motion.span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-6 xl:gap-10">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item}`}
              className="text-gray-200 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors duration-300"
              variants={navLinkVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.05, color: "#8B5CF6" }}
              transition={{ duration: 0.2 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            className="text-gray-200 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Contact Us
          </motion.button>

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

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button className="relative w-full inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950/80 dark:bg-gray-700/80 px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                Verify Certificate
              </span>
            </button>
          </motion.div>
        </div>

        {/* Mobile menu toggle */}
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
            {isMenuOpen ? <RxCross2 size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden w-full absolute top-full left-0 bg-black/80 dark:bg-gray-900/80 z-40 py-4 shadow-lg"
          >
            <div className="container mx-auto px-8 flex flex-col items-center gap-y-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setTimeout(() => handleSmoothScroll(item), 100);
                  }}
                  className="text-gray-200 hover:text-white uppercase text-base font-medium tracking-wider transition-colors duration-300"
                  variants={navLinkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  whileHover={{ scale: 1.05, color: "#8B5CF6" }}
                  transition={{ duration: 0.2 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              ))}

              <motion.button
                onClick={() => {
                  setIsContactModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="text-gray-200 hover:text-white uppercase text-base font-medium tracking-wider transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Contact Us
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
                <button className="relative w-full inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950/80 dark:bg-gray-700/80 px-8 py-2 text-base font-medium text-white backdrop-blur-3xl">
                    Verify Certificate
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </motion.nav>
  );
}

export default Navbar;
