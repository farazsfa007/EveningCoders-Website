/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  {
    icon: FaWhatsapp,
    url: 'https://api.whatsapp.com/message/V6NFQJ3SZEPZK1',
    name: 'WhatsApp',
  },
  {
    icon: FaXTwitter,
    url: 'https://x.com/evening_coders',
    name: 'X (Twitter)',
  },
  {
    icon: FaInstagram,
    url: 'https://instagram.com/evening.coders',
    name: 'Instagram',
  },
  {
    icon: FaFacebookF,
    url: 'https://www.facebook.com/share/1Du7W9RFar/?mibextid=LQQJ4d',
    name: 'Facebook',
  },
  {
    icon: FaTelegramPlane,
    url: 'https://t.me/eveningcoders',
    name: 'Telegram',
  },
];

const Footer = ({ darkMode = true }) => {
  const textColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const iconColor = darkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <footer
      className={`w-full max-w-6xl px-6 py-4 flex flex-col md:flex-row items-center justify-between border-t border-purple-500 mt-8 ${textColor}`}
    >
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <p>&copy; 2025 Evening Coders. All rights reserved.</p>
      </div>

      <div className="flex space-x-6">
        {socialLinks.map(({ icon: Icon, url, name }, index) => (
          <motion.a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-2xl ${iconColor} hover:text-purple-500 transition-colors duration-300`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label={name}
          >
            <Icon />
          </motion.a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
