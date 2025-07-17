import React from "react";
import Navbar from "../Navbar/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
      <Navbar />

      <section className="flex flex-col items-center justify-start text-center px-4 pt-20 md:pt-28 h-[calc(100vh-80px)]">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-snug md:leading-tight">
            Explore the Possibilities of Digital Growth with Eve
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200 font-medium px-2 sm:px-6">
            Unleash the power of the digital world. Upgrade your business with{" "}
            <strong className="text-white">Evening Coders</strong>, the best web
            development platform.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
