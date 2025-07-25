/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaBullhorn, FaCogs } from "react-icons/fa";

const services = [
  {
    title: "Website Development",
    description: (
      <>
        <p className="mb-2">
          We build modern, responsive, and SEO-friendly websites tailored to
          your brand.
        </p>
        <p className="mb-2">
          Whether it's a portfolio, business site, or e-commerce platform, our
          team ensures fast load times, smooth UI/UX, and scalable architecture.
        </p>
        <p>
          We use the latest tech like React, Node.js, and Tailwind CSS to craft
          high-performance solutions. Your digital identity starts with a
          stunning website — and we make that happen.
        </p>
      </>
    ),
    highlights: [],
    icon: <FaLaptopCode className="text-4xl text-blue-600" />,
  },
  {
    title: "Mobile App Development",
    description: (
      <>
        <p className="mb-2">
          We develop high-quality Android and iOS apps that are intuitive, fast,
          and user-centric.
        </p>
        <p className="mb-2">
          From idea to deployment, we follow agile practices to ensure efficient
          development and frequent updates.
        </p>
        <p>
          Whether it's a native app or cross-platform solution, we focus on
          performance, usability, and design. Reach your customers where they
          are — on their phones.
        </p>
      </>
    ),
    highlights: [],
    icon: <FaMobileAlt className="text-4xl text-green-600" />,
  },
  {
    title: "Digital Marketing",
    description: (
      <>
        <p className="mb-2">
          We help your brand grow through data-driven digital marketing
          strategies.
        </p>
        <p className="mb-2">
          Our services include SEO, social media marketing, Google Ads, and
          content creation that speaks to your audience.
        </p>
        <p>
          We continuously monitor and optimize campaigns for maximum ROI. Let us
          drive traffic, boost engagement, and increase conversions for your
          business.
        </p>
      </>
    ),
    highlights: [],
    icon: <FaBullhorn className="text-4xl text-yellow-500" />,
  },
  {
    title: "Seamless Integration",
    description: (
      <>
        <p className="mb-2">
          We ensure your website, app, and backend services work in perfect
          harmony.
        </p>
        <p className="mb-2">
          From API integrations to third-party services like payment gateways
          and CRMs, we handle everything.
        </p>
        <p>
          Our focus is on reliability, scalability, and zero downtime. With us,
          all your digital tools connect effortlessly — just as they should.
        </p>
      </>
    ),
    highlights: [],
    icon: <FaCogs className="text-4xl text-purple-600" />,
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

function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-gray-900 py-16 md:py-24 px-4 sm:px-6 lg:px-20 font-inter"
    >
      {/* Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-none"
          style={{
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
          }}
        />
        <div className="hidden dark:block absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 tracking-tight"
            variants={fadeUp}
          >
            Evening Coders made{" "}
            <span className="text-blue-600 dark:text-blue-400">
              "by the Passionates"
            </span>{" "}
            <br className="hidden sm:block" />
            <span className="text-green-600 dark:text-green-400">
              "for the Passionates"
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            variants={fadeUp}
          >
            Evening Coders unlocks the power of digital presence.
          </motion.p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-white dark:bg-[#1e1e2f] p-8 rounded-3xl shadow-xl transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
            >
              {/* Border Glow Overlay */}
              <div className="absolute inset-0 rounded-3xl z-[-1] border-2 border-transparent group-hover:border-transparent group-hover:before:opacity-100 before:content-[''] before:absolute before:inset-[-2px] before:rounded-[inherit] before:z-[-1] before:opacity-0 before:transition-opacity before:duration-300 before:bg-gradient-to-r before:from-pink-400 before:via-purple-400 before:to-blue-400"></div>

              <motion.div
                className="mb-6 p-4 rounded-full bg-blue-100 dark:bg-gray-700 group-hover:bg-indigo-50 dark:group-hover:bg-gray-600 transition duration-300"
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
                  {service.icon}
                </motion.div>
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                variants={fadeUp}
              >
                {service.title}
              </motion.h3>

              <motion.div
                className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 text-left"
                variants={fadeUp}
              >
                {service.description}
              </motion.div>

              {service.highlights.length > 0 && (
                <ul className="text-gray-700 dark:text-gray-400 text-sm space-y-1 text-left">
                  {service.highlights.map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
