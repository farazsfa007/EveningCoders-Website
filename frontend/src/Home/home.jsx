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

function Home({ darkMode, setDarkMode }) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-blue-800 text-black dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full relative">
          <div
            className="absolute inset-0 bg-[length:20px_100%] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
            }}
          ></div>

          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full blur-2xl opacity-30 animate-ping"></div>
          </div>
        </div>
      </div>

      <div className="relative z-20">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-start text-center px-4 pt-32 md:pt-40 h-[calc(100vh-80px)]">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-snug md:leading-tight">
            Explore the Possibilities of Digital Growth with Eve
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-700 dark:text-blue-200 font-medium px-2 sm:px-6">
            Unleash the power of the digital world. Upgrade your business with{" "}
            <strong className="text-black dark:text-white animate-pulse font-bold inline-block">
              Evening Coders
            </strong>
            , the best web development platform.
          </p>

          <p className="mt-10 text-lg md:text-xl font-semibold text-blue-800 dark:text-blue-300">
            Helping businesses to grow digitally with
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6 sm:gap-8 text-4xl sm:text-5xl md:text-6xl">
            <SiHtml5
              title="HTML"
              className="text-orange-600 hover:scale-110 animate-pulse transition-transform duration-300"
            />
            <SiTailwindcss
              title="Tailwind CSS"
              className="text-cyan-400 hover:scale-110 animate-pulse transition-transform duration-300"
            />
            <SiJavascript
              title="JavaScript"
              className="text-yellow-400 hover:scale-110 animate-pulse transition-transform duration-300"
            />
            <SiReact
              title="React"
              className="text-cyan-300 hover:scale-110 animate-pulse transition-transform duration-300"
            />
            <SiNodedotjs
              title="Node.js"
              className="text-green-600 hover:scale-110 animate-pulse transition-transform duration-300"
            />
            <SiFlutter
              title="Flutter"
              className="text-sky-400 hover:scale-110 animate-pulse transition-transform duration-300"
            />
            <SiMongodb
              title="MongoDB"
              className="text-green-500 hover:scale-110 animate-pulse transition-transform duration-300"
            />
            <SiSpringboot
              title="Spring Boot"
              className="text-green-700 hover:scale-110 animate-pulse transition-transform duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
