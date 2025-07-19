/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar/navbar";
import Feature from "../Feature/feature";
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function Home({ darkMode, setDarkMode }) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-blue-800 text-black dark:text-white transition-colors duration-300 overflow-hidden">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full relative">
          <div
            className="absolute inset-0 bg-[length:20px_100%] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full blur-2xl opacity-30 animate-ping" />
          </div>
        </div>
      </div>

      <motion.section
        className="relative z-10 flex flex-col items-center justify-start text-center px-4 pt-40 md:pt-56 lg:pt-64 h-[calc(100vh-80px)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-3xl w-full">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-snug md:leading-tight "
            variants={fadeUp}
            custom={1}
          >
            Explore the Possibilities of Digital Growth with Eve
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-700 dark:text-blue-200 font-medium px-2 sm:px-6"
            variants={fadeUp}
            custom={2}
          >
            Unleash the power of the digital world. Upgrade your business with{" "}
            <motion.strong
              className="text-black dark:text-white font-bold inline-block"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Evening Coders
            </motion.strong>
            , the best web development platform.
          </motion.p>

          <motion.p
            className="mt-10 text-lg md:text-xl font-semibold text-blue-800 dark:text-blue-300"
            variants={fadeUp}
            custom={3}
          >
            Helping businesses to grow digitally with
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-6 sm:gap-8 text-4xl sm:text-5xl md:text-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { Icon: SiHtml5, color: "text-orange-600" },
              { Icon: SiTailwindcss, color: "text-cyan-400" },
              { Icon: SiJavascript, color: "text-yellow-400" },
              { Icon: SiReact, color: "text-cyan-300" },
              { Icon: SiNodedotjs, color: "text-green-600" },
              { Icon: SiFlutter, color: "text-sky-400" },
              { Icon: SiMongodb, color: "text-green-500" },
              { Icon: SiSpringboot, color: "text-green-700" },
            ].map(({ Icon, color }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={4 + i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Icon
                  title={Icon.name}
                  className={`${color} transition-transform duration-300`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Feature />
    </div>
  );
}

export default Home;
