/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTelegramPlane,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LoginPopup from "../LoginPopup/LoginPopup";

const socialLinks = [
  { icon: FaWhatsapp, url: "https://api.whatsapp.com/message/V6NFQJ3SZEPZK1", name: "WhatsApp", color: "text-green-500" },
  { icon: FaXTwitter, url: "https://x.com/evening_codders", name: "X (Twitter)", color: "text-black dark:text-white" },
  { icon: FaInstagram, url: "https://instagram.com/evening.coders", name: "Instagram", color: "text-pink-500" },
  { icon: FaFacebookF, url: "https://www.facebook.com/share/1Du7W9RFar/?mibextid=LQQJ4d", name: "Facebook", color: "text-blue-600" },
  { icon: FaTelegramPlane, url: "https://t.me/eveningcoders", name: "Telegram", color: "text-sky-500" },
];

const Footer = ({ darkMode = true }) => {
  const textColor = darkMode ? "text-gray-400" : "text-gray-600";
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <footer className="w-full px-6 pt-10 pb-6 bg-transparent">
        <div className="w-full h-[2px] bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 mb-6" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <motion.div
            className={`text-sm sm:text-base ${textColor}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            &copy; {new Date().getFullYear()}{" "}
            <span
              className="font-semibold text-purple-500 cursor-pointer hover:underline"
              onClick={() => setShowPopup(true)}
            >
              Evening Coders
            </span>
            . All rights reserved.
          </motion.div>

          <motion.div
            className="flex items-center justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {socialLinks.map(({ icon: Icon, url, name, color }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${color} hover:text-purple-500 transition-colors duration-300`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={name}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </footer>

      {showPopup && (
        <LoginPopup
          onClose={() => setShowPopup(false)}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export default Footer;
