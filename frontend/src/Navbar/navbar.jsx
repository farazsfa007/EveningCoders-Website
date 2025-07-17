import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
    return (
        <nav className="bg-[#110E19] py-6">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
            <a href="/" aria-label="Home">
                <img src="" alt="" />
            </a>
            <span className="text-2xl font-semibold text-white">evening coders</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors">Pricing</a>
            <a href="#services" className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors">Services</a>
            <a href="#roadmap" className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors">Roadmap</a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
            <a href="#contact" className="text-gray-300 hover:text-white uppercase text-sm font-medium tracking-wider transition-colors">Contact Us</a>
            
            <div className="p-[2px] rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                <button className="bg-[#110E19] text-white px-5 py-2 rounded-[10px] uppercase text-sm font-medium tracking-wider hover:bg-opacity-90 transition-all">
                Get a Quote
                </button>
            </div>
            </div>
            
            <div className="md:hidden">
            <button className="text-white focus:outline-none">
                <GiHamburgerMenu />
            </button>
            </div>
            
        </div>
        </nav>
    );
}

export default Navbar;