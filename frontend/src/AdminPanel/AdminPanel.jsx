/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";

const AdminPanel = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8 z-50 overflow-auto font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
          Admin Dashboard
        </h1>
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out font-semibold shadow-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </motion.div>

      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="p-8 bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-sm"
      >
        <p className="text-2xl font-bold mb-2">Welcome back! 🎉</p>
        <p className="text-gray-400 leading-relaxed">
          You're in control. Manage your site content, users, and settings from
          this powerful dashboard.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminPanel;
