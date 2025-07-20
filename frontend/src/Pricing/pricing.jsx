/* eslint-disable no-unused-vars */
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Basic",
    price: "$599.99",
    description: "Simple, attractive, and personalized recommendations.",
    features: [
      "A standard UI/UX",
      "Search Engine Optimisation friendly",
      "Random bonus giveaways with lucky draw",
    ],
    color: "text-yellow-400",
    bgColor: "bg-yellow-400",
  },
  {
    title: "Premium",
    price: "$1199.99",
    description: "Advanced features, customization, and priority assistance.",
    features: [
      "An advanced UI/UX with complex features",
      "Personalized customization based on preferences",
      "Priority support to solve issues quickly",
    ],
    color: "text-red-400",
    bgColor: "bg-red-400",
    isPopular: true,
  },
  {
    title: "Rental",
    price: "$59.99/m",
    description:
      "Attractive templates, growth assistance, and dedicated support.",
    features: [
      "Pre-designed unique templates",
      "Pay as you use: A flexible scheme",
      "Quit or switch between memberships",
    ],
    color: "text-purple-400",
    bgColor: "bg-purple-400",
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Pricing = () => {
  return (
    <motion.section
      id="pricing"
      className="relative py-20 md:py-28 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full relative">
          {/* Vertical lines */}
          <div
            className="absolute inset-0 bg-[length:20px_100%] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{
              clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
            }}
          />
          {/* Horizontal lines */}
          <div className="absolute inset-0 bg-[length:100%_20px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-purple-400 animate-bounce uppercase tracking-wider">
            Getting Started with Evening Coders
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">
            Digital Presence in Your Budget
          </h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative flex flex-col rounded-2xl p-8 bg-[#f9f9ff] dark:bg-[#13131a] border border-gray-300 dark:border-gray-700 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:border-purple-500 ${
                plan.isPopular ? "lg:scale-110 border-purple-500" : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-8 -mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <h2 className={`text-2xl font-semibold mb-2 ${plan.color}`}>
                {plan.title}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-400 mb-6 h-12">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                {plan.title === "Rental" && (
                  <span className="text-gray-500 dark:text-gray-400 text-lg ml-1">
                    /month
                  </span>
                )}
              </div>

              <button className="w-full rounded-lg py-3 text-sm font-semibold tracking-wider uppercase mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 transition-opacity">
                Get Started
              </button>

              <ul className="space-y-4 text-sm text-gray-800 dark:text-gray-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle
                      className={`${plan.color} mt-1 flex-shrink-0`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Pricing;
