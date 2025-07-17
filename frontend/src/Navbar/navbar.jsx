import React from 'react';

function Navbar() {
    return (
        <nav className="bg-[#110E19] py-6">
        <div className="container mx-auto flex justify-between items-center px-6">
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            </div>
            
        </div>
        </nav>
    );
}

export default Navbar;