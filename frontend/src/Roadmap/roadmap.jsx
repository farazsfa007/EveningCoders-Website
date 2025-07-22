/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import EveLandingPage from "../EventFromPage/eventFormPage";

const roadmapItems = [
  {
    id: 1,
    title: "Gurukul",
    description:
      "A comprehensive e-learning platform designed to provide a rich and interactive learning experience for students of all ages.",
    image: "https://placehold.co/600x400/1a202c/e2e8f0?text=Gurukul+Image",
    delay: 0.2,
    status: "Completed",
  },
  {
    id: 2,
    title: "IIMS",
    description:
      "An Integrated Institute Management System to streamline academic and administrative processes for educational institutions.",
    image: "https://placehold.co/600x400/1a202c/e2e8f0?text=IIMS+Image",
    delay: 0.4,
    status: "In Progress",
  },
  {
    id: 3,
    title: "App Builder",
    description:
      "A no-code/low-code platform enabling users to quickly build and deploy custom applications with intuitive drag-and-drop interfaces.",
    image: "https://placehold.co/600x400/1a202c/e2e8f0?text=App+Builder+Image",
    delay: 0.6,
    status: "Planned",
  },
  {
    id: 4,
    title: "AI Integration",
    description:
      "Integrating advanced AI capabilities into our core services to enhance automation, personalization, and data analysis.",
    image:
      "https://placehold.co/600x400/1a202c/e2e8f0?text=AI+Integration+Image",
    delay: 0.8,
    status: "In Progress",
  },
];

function Roadmap({ darkMode }) {
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="roadmap"
      className={`py-20 relative overflow-hidden ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } transition-colors duration-300`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full relative">
          <div
            className="absolute inset-0 bg-[length:20px_100%] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[length:100%_20px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 relative"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="text-transparent bg-clip-text drop-shadow-[0_0_8px_#3B82F6] dark:bg-gradient-to-r dark:from-blue-400 dark:via-white dark:to-blue-400 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500">
            What we're working on
          </span>

          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          {roadmapItems.map((item) => (
            <motion.div
              key={item.id}
              className={`relative rounded-xl overflow-hidden shadow-lg p-6 flex flex-col items-center text-center ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              } transform transition-all duration-300 hover:scale-[1.02]`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: item.delay }}
              whileHover={{
                boxShadow: darkMode
                  ? "0 0 30px rgba(59, 130, 246, 0.5)"
                  : "0 0 30px rgba(0, 0, 0, 0.2)",
                y: -5,
              }}
            >
              <span
                className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === "In Progress"
                    ? "bg-yellow-500 text-white animate-pulse"
                    : item.status === "Completed"
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {item.status}
              </span>

              <div className="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-6 relative z-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x400/1a202c/e2e8f0?text=${item.title.replace(
                      /\s/g,
                      "+"
                    )}+Image`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-70 z-0"></div>
              </div>

              <h3 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {item.title}
              </h3>
              <p
                className={`text-lg mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.description}
              </p>

              <motion.button
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none mt-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span
                  className={`inline-flex h-full w-full items-center justify-center rounded-full px-8 py-2 text-base font-medium text-white backdrop-blur-3xl ${
                    darkMode
                      ? "bg-slate-950/80"
                      : "bg-blue-600/80 hover:bg-blue-700/80"
                  }`}
                >
                  Learn More
                </span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8"
        >
          <div
            className={`${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            } rounded-xl shadow-lg p-6`}
          >
            <EveLandingPage darkMode={darkMode} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Roadmap;
