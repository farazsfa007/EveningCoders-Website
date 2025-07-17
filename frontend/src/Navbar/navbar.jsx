import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import logoImage from "../assets/logo image.jpg";

function Navbar() {
  return (
    <nav className="bg-[#0e1119] py-6">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-y-4 relative">
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
          <a
            href="#features"
            className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors"
          >
            Pricing
          </a>
          <a
            href="#services"
            className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors"
          >
            Services
          </a>
          <a
            href="#roadmap"
            className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors"
          >
            Roadmap
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href="#contact"
            className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors"
          >
            Contact Us
          </a>
          <div className="p-[2px] rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            <button className="bg-[#110E19] text-white px-5 py-2 rounded-[10px] uppercase text-sm font-medium tracking-wider hover:bg-opacity-90 transition-all">
              Get a Quote
            </button>
          </div>
        </div>

        <div className="lg:hidden">
          <button className="text-white focus:outline-none">
            <GiHamburgerMenu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
