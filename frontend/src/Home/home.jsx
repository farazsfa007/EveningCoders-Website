import React from "react";
import Navbar from "../Navbar/navbar";
import {
  SiHtml5,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiFlutter,
  SiMongodb,
  SiSpringboot,
} from "react-icons/si";

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

          <p className="mt-10 text-lg md:text-xl font-semibold text-blue-300">
            Helping businesses to grow digitally with
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6 sm:gap-8 text-4xl sm:text-5xl md:text-6xl">
            <SiHtml5 title="HTML" className="text-orange-600 hover:scale-110 animate-pulse transition-transform duration-300" />
            <SiTailwindcss title="Tailwind CSS" className="text-cyan-400 hover:scale-110 animate-pulse transition-transform duration-300" />
            <SiJavascript title="JavaScript" className="text-yellow-400 hover:scale-110 animate-pulse transition-transform duration-300" />
            <SiReact title="React" className="text-cyan-300 hover:scale-110 animate-pulse transition-transform duration-300" />
            <SiNodedotjs title="Node.js" className="text-green-600 hover:scale-110 animate-pulse transition-transform duration-300" />
            <SiFlutter title="Flutter" className="text-sky-400 hover:scale-110 animate-pulse transition-transform duration-300" />
            <SiMongodb title="MongoDB" className="text-green-500 hover:scale-110 animate-pulse transition-transform duration-300" />
            <SiSpringboot title="Spring Boot" className="text-green-700 hover:scale-110 animate-pulse transition-transform duration-300" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
