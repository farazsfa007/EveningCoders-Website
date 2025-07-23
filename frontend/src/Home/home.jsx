/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
import { FaCheckCircle } from "react-icons/fa";

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
  const orbitRef = useRef(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    let angle = 0;
    const radius = 120;
    const icons = orbit.querySelectorAll(".orbit-icon");

    const animate = () => {
      angle += 0.01;
      icons.forEach((icon, i) => {
        const a = angle + (i * (Math.PI * 2)) / icons.length;
        const x = radius * Math.cos(a);
        const y = radius * Math.sin(a);
        icon.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Background grid */}
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

      {/* Hero Section */}
      <motion.section
        id="home"
        className="relative z-10 flex flex-col items-center justify-start text-center px-4 pt-40 pb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-3xl w-full">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-snug md:leading-tight"
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
            <motion.span
              className="text-black dark:text-white font-bold inline-block"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              evening coders
            </motion.span>{" "}
            the best web development platform.
          </motion.p>

          <motion.p
            className="mt-10 text-lg md:text-xl font-semibold text-blue-800 dark:text-blue-300"
            variants={fadeUp}
            custom={3}
          >
            Helping businesses to grow digitally with
          </motion.p>

          <motion.div
            className="mt-6 mb-0 flex flex-wrap justify-center gap-6 sm:gap-8 animate-pulse text-4xl sm:text-5xl md:text-6xl"
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
                  className={`${color} transition-transform duration-300`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Animated Orbiting Section */}
      <motion.section
        className="relative z-10 px-6 py-20 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="flex-1 text-left" variants={fadeUp}>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
            variants={fadeUp}
          >
            Evening Coders <br /> for Seamless <br /> Digital Presence
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-md"
            variants={fadeUp}
          >
            With smart automation and top-notch security, it's the perfect
            solution for businesses looking to work smarter.
          </motion.p>

          <motion.div className="space-y-6" variants={fadeUp}>
            {[
              "Seamless Integration",
              "Smart Automation",
              "Top-notch Security",
            ].map((text, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                variants={fadeUp}
              >
                <FaCheckCircle className="text-purple-500 text-xl mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-black dark:text-white">
                    {text}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    With smart automation and top-notch security, it's the
                    perfect solution for businesses looking to work smarter.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            href="https://api.whatsapp.com/message/V6NFQJ3SZEPZK1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 px-6 py-3 rounded-xl font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition border-2 border-transparent hover:border-purple-400"
            variants={fadeUp}
          >
            GET IN TOUCH
          </motion.a>
        </motion.div>

        <motion.div
          className="flex-1 relative w-full h-[400px] sm:h-[500px] flex items-center justify-center"
          variants={fadeUp}
        >
          <div className="relative w-[300px] h-[300px]" ref={orbitRef}>
            <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {["🧑‍💻", "💡", "🛠️", "📊", "🧠", "🔐", "⚙️", "🚀"].map(
                (icon, i) => (
                  <div
                    key={i}
                    className="orbit-icon absolute text-3xl"
                    style={{ top: "50%", left: "50%" }}
                  >
                    {icon}
                  </div>
                )
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl border-4 border-white text-white font-extrabold text-2xl">
              EC
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="scroll-mt-24">
        <Feature />
      </section>
    </div>
  );
}

export default Home;
