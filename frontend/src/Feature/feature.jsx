/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  FaPaintBrush,
  FaLightbulb,
  FaUsers,
  FaSitemap,
  FaHandHoldingUsd,
  FaProjectDiagram,
} from "react-icons/fa";

const features = [
  {
    title: "Unique Designs",
    description:
      "Our team prepares eye-catching and interactive designs to make our client’s business grow high by attracting more customers and serving them better.",
    icon: <FaPaintBrush className="text-4xl text-blue-600" />,
  },
  {
    title: "Innovative Ideas",
    description:
      "Our consultants help and suggest trending ideas during the second phase of development to improve your business strategy and help you grow exponentially.",
    icon: <FaLightbulb className="text-4xl text-yellow-500" />,
  },
  {
    title: "Skilled Team",
    description:
      "We prefer passion over professionalism, one of the pillars of our business model. Our team works on the project as its own, making the product best of its kind.",
    icon: <FaUsers className="text-4xl text-green-600" />,
  },
  {
    title: "Well Designed Workflow",
    description:
      "We have designed an easy and simple workflow where you will get your project report at each step stating the progress of your application and our timeline.",
    icon: <FaSitemap className="text-4xl text-purple-600" />,
  },
  {
    title: "Rental Scheme for Startups",
    description:
      "We offer cost-effective monthly scheme to hire an app as well as developer. Clients can use this opportunity to test their growth and our services.",
    icon: <FaHandHoldingUsd className="text-4xl text-pink-600" />,
  },
  {
    title: "Project Dedicated Resources",
    description:
      "We offer dedicated resources according to the project. We have passionate, skilled, and experienced developers as well as designers to fulfill your needs.",
    icon: <FaProjectDiagram className="text-4xl text-indigo-600" />,
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleRotate = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5 },
  },
};

function Feature() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-blue-800 dark:to-blue-700 py-16 md:py-24 px-4 sm:px-6 lg:px-20 font-inter">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-[length:20px_100%] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)]"
          style={{
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full blur-2xl opacity-30 animate-ping" />
      </div>

      <div className="relative z-10">
        <motion.div
          className="max-w-7xl mx-auto text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 tracking-tight"
            variants={fadeUp}
          >
            Get Your Dream App in Just One Click
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            variants={fadeUp}
          >
            Explore our key features designed to accelerate your business
            success with innovative solutions and dedicated support.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
            >
              <motion.div
                className="mb-6 p-4 rounded-full bg-blue-50 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-gray-600 transition duration-300"
                variants={scaleRotate}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear",
                  }}
                >
                  {feature.icon}
                </motion.div>
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                variants={fadeUp}
              >
                {feature.title}
              </motion.h3>

              <motion.p
                className="text-gray-600 dark:text-gray-300 text-base mb-6 flex-grow"
                variants={fadeUp}
              >
                {feature.description}
              </motion.p>

              <motion.a
                href="#"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold text-base transition-transform duration-300"
                whileHover={{ x: 4 }}
              >
                Explore More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Feature;
