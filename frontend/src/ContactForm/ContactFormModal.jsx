/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

function ContactFormModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            // Added absolute positioning and transform for robust centering
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 dark:bg-gray-800/30 border border-gray-400 rounded-2xl p-8 w-[90%] max-w-md text-white shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white hover:text-red-400 transition"
              onClick={onClose}
              aria-label="Close modal"
            >
              <RxCross2 size={24} />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-transparent border border-white/40 rounded px-4 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent border border-white/40 rounded px-4 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Your Mobile"
                className="bg-transparent border border-white/40 rounded px-4 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-600 hover:bg-blue-700 transition rounded-full py-2 text-white font-semibold"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactFormModal;