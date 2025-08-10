/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaUpload } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const AdminPanel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    certificateNumber: "",
    pdf: null,
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Handle form submission logic (e.g., upload to server)
  };

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
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out font-semibold shadow-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </motion.div>

      {/* Certificate Upload Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 space-y-6 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Add Certificate</h2>

        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Enter full name"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-cyan-400 focus:ring focus:ring-cyan-500 focus:ring-opacity-50 outline-none"
            required
          />
        </div>

        {/* Domain Name */}
        <div>
          <label className="block mb-2 font-semibold">Domain Name</label>
          <input
            type="text"
            name="domain"
            onChange={handleChange}
            value={formData.domain}
            placeholder="Enter domain name"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-cyan-400 focus:ring focus:ring-cyan-500 focus:ring-opacity-50 outline-none"
            required
          />
        </div>

        {/* Certificate Number */}
        <div>
          <label className="block mb-2 font-semibold">Certificate Number</label>
          <input
            type="text"
            name="certificateNumber"
            onChange={handleChange}
            value={formData.certificateNumber}
            placeholder="e.g., EC2025073102IG"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-cyan-400 focus:ring focus:ring-cyan-500 focus:ring-opacity-50 outline-none"
            required
          />
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block mb-2 font-semibold">Upload Certificate (PDF)</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white cursor-pointer transition-all">
              <FaUpload />
              Choose File
              <input
                type="file"
                name="pdf"
                accept=".pdf"
                onChange={handleChange}
                className="hidden"
                required
              />
            </label>
            {formData.pdf && (
              <span className="text-gray-300 text-sm">{formData.pdf.name}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-white shadow-lg hover:opacity-90 transition-all"
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AdminPanel;