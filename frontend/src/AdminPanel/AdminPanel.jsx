/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSignOutAlt,
  FaUpload,
  FaUser,
  FaBook,
  FaHashtag,
  FaSearch,
  FaFilePdf,
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AdminPanel = ({ onClose }) => {
  const API_URL_ADD = "http://localhost:3000/api/add-certificate";
  const API_URL_GET = "http://localhost:3000/api/get-certificates";

  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    certificateNumber: "",
    pdf: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [certificates, setCertificates] = useState([]);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCertificates = async () => {
    try {
      setLoadingCertificates(true);
      const res = await axios.get(API_URL_GET);
      if (res.data.success) {
        setCertificates(res.data.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setMessage({ type: "error", text: "Could not load certificates." });
    } finally {
      setLoadingCertificates(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pdf) {
      setMessage({ type: "error", text: "Please upload a PDF file." });
      return;
    }
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const res = await axios.post(API_URL_ADD, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessage({ type: "success", text: "Certificate added successfully!" });
        setFormData({ name: "", domain: "", certificateNumber: "", pdf: null });
        document.getElementById("pdf-upload-form").reset();
        fetchCertificates(); // Refresh list
      } else {
        setMessage({
          type: "error",
          text: res.data.message || "Failed to add certificate",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "Server error. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 5000); 
    }
  };

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8 z-50 overflow-auto font-sans">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent tracking-tight">
          Admin Dashboard
        </h1>
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(239 68 68)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-full font-semibold shadow-lg transition-shadow"
        >
          <FaSignOutAlt />
          Logout
        </motion.button>
      </motion.header>

      <div>
        <motion.div
  variants={itemVariants}
  className="p-5 bg-slate-900/50 rounded-xl shadow-lg border border-slate-700 mb-5"
>
  <h2 className="text-xl font-semibold mb-3">Welcome back,👋</h2>
  <p className="text-slate-400">
    This Admin Panel allows you to manage the certificate database — add new certificates,
    update details, and ensure users can easily verify them online.  
    Use the form below to upload new records and keep the system up-to-date.
  </p>
</motion.div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-3"
        >
          <form
            id="pdf-upload-form"
            onSubmit={handleSubmit}
            className="bg-gray-900/50 border border-cyan-500/20 p-6 rounded-2xl shadow-2xl space-y-6"
          >
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              Add New Certificate
            </h2>

            {message.text && (
              <p
                className={`p-3 rounded-lg text-sm font-medium ${
                  message.type === "success"
                    ? "bg-green-500/30 text-green-200"
                    : "bg-red-500/30 text-red-200"
                }`}
              >
                {message.text}
              </p>
            )}

            {/* Input Fields */}
            {[
              { name: "name", placeholder: "Full Name", icon: <FaUser />, type: "text" },
              { name: "domain", placeholder: "Domain Name", icon: <FaBook />, type: "text" },
              { name: "certificateNumber", placeholder: "e.g., EC2025073102IG", icon: <FaHashtag />, type: "text" },
            ].map((field) => (
              <motion.div variants={itemVariants} key={field.name} className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  {field.icon}
                </div>
                <input
                  type={field.type}
                  name={field.name}
                  onChange={handleChange}
                  value={formData[field.name]}
                  placeholder={field.placeholder}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white"
                  required
                />
              </motion.div>
            ))}

            {/* File Upload */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-semibold text-gray-300">
                Upload Certificate PDF
              </label>
              <div className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-600 rounded-lg">
                <label className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white cursor-pointer transition-all font-semibold">
                  <FaUpload />
                  Choose File
                  <input type="file" name="pdf" accept=".pdf" onChange={handleChange} className="hidden" required />
                </label>
                {formData.pdf && (
                  <span className="text-gray-300 text-sm truncate">{formData.pdf.name}</span>
                )}
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgb(34 211 238 / 0.5)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-lg text-white shadow-lg hover:shadow-cyan-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Add Certificate"}
            </motion.button>
          </form>
        </motion.div>

        {/* Right Column: Certificate List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          className="lg:col-span-2 bg-gray-900/50 border border-cyan-500/20 p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-cyan-300">
              Manage Certificates
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <FaSearch />
              </div>
            </div>
          </div>

          <div className="max-h-[65vh] overflow-y-auto pr-2">
            {loadingCertificates ? (
              <p className="text-center text-gray-400 p-8">Loading certificates...</p>
            ) : (
              <motion.div layout>
                <AnimatePresence>
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((cert) => (
                      <motion.div
                        layout
                        key={cert._id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                        className="bg-gray-800/70 border-l-4 border-cyan-500 p-4 rounded-lg mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div className="flex-grow">
                          <p className="font-bold text-lg text-white">{cert.name}</p>
                          <p className="text-sm text-gray-400">{cert.domain}</p>
                          <p className="text-xs text-gray-500 font-mono mt-1">{cert.certificateNumber}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                          <motion.a
                            href={cert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, color: '#22d3ee' }}
                            className="flex items-center gap-2 text-blue-400 transition-colors"
                          >
                            <FaFilePdf /> View
                          </motion.a>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 p-8">No certificates found.</p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;