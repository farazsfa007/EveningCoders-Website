/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaUpload } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

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

  // Fetch all certificates
  const fetchCertificates = async () => {
    try {
      setLoadingCertificates(true);
      const res = await axios.get(API_URL_GET);
      if (res.data.success) {
        setCertificates(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
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
      formDataToSend.append("name", formData.name);
      formDataToSend.append("domain", formData.domain);
      formDataToSend.append("certificateNumber", formData.certificateNumber);
      formDataToSend.append("pdf", formData.pdf);

      const res = await axios.post(API_URL_ADD, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setMessage({
          type: "success",
          text: "Certificate added successfully!",
        });
        setFormData({
          name: "",
          domain: "",
          certificateNumber: "",
          pdf: null,
        });

        fetchCertificates();
      } else {
        setMessage({
          type: "error",
          text: res.data.message || "Failed to add certificate",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "Server error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8 z-50 overflow-auto font-sans">
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
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all font-semibold shadow-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 space-y-6 max-w-2xl mx-auto mb-10"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">
          Add Certificate
        </h2>

        {message.text && (
          <p
            className={`p-3 rounded-lg text-sm ${
              message.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

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

        <div>
          <label className="block mb-2 font-semibold">
            Upload Certificate (PDF)
          </label>
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

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit"}
        </motion.button>
      </motion.form>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">
          All Certificates
        </h2>
        {loadingCertificates ? (
          <p>Loading certificates...</p>
        ) : certificates.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-left text-gray-300">
                  <th className="p-3">Name</th>
                  <th className="p-3">Domain</th>
                  <th className="p-3">Certificate Number</th>
                  <th className="p-3">PDF</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert._id} className="border-t border-gray-700">
                    <td className="p-3">{cert.name}</td>
                    <td className="p-3">{cert.domain}</td>
                    <td className="p-3">{cert.certificateNumber}</td>
                    <td className="p-3">
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline hover:text-blue-500"
                      >
                        View PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">No certificates found</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
