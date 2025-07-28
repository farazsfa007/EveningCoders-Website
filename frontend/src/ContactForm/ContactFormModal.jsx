/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function ContactFormModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "contactFormSubmissions"), {
        ...formData,
        createdAt: Timestamp.now(),
      });
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", mobile: "" });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative mt-150 w-full max-w-md p-8 rounded-2xl border shadow-2xl
              bg-white text-gray-900 border-gray-200 shadow-blue-200
              dark:bg-slate-900/96 dark:text-white dark:border-slate-700 dark:shadow-blue-500/20
              backdrop-blur-xl"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 dark:text-gray-400 transition-colors duration-300"
              onClick={onClose}
              aria-label="Close modal"
            >
              <RxCross2 size={24} />
            </button>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                Get in Touch
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
                We're excited to hear from you!
              </p>
            </div>

            <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-300
                  dark:bg-slate-800/50 dark:text-white dark:placeholder-gray-500 dark:border-slate-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-300
                  dark:bg-slate-800/50 dark:text-white dark:placeholder-gray-500 dark:border-slate-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 12345 67890"
                  required
                  className="w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-300
                  dark:bg-slate-800/50 dark:text-white dark:placeholder-gray-500 dark:border-slate-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                className={`mt-4 w-full font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-blue-500/40 transition-all duration-300 ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {submitting ? "Submitting..." : "Submit"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactFormModal;
