/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

function VerifyCertificateModal({ isOpen, onClose, darkMode }) {
  const [certificateNumber, setCertificateNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCertificateNumber("");
      setResult(null);
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/verify-certificate",
        { certificateNumber: certificateNumber.trim() }
      );

      if (res.data.success) {
        setResult(res.data.data);
      } else {
        setError("Certificate not found");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="pt-100 fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className={`relative w-full max-w-md rounded-2xl shadow-2xl p-8 border 
              ${
                darkMode
                  ? "bg-gray-900/95 border-gray-700 text-white"
                  : "bg-white/90 border-gray-200 text-gray-900"
              } backdrop-blur-lg`}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              onClick={onClose}
            >
              <RxCross2 size={24} />
            </motion.button>

            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Verify Certificate
            </h2>

            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label
                  htmlFor="certificateNumber"
                  className="block text-sm font-medium mb-2"
                >
                  Certificate Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="certificateNumber"
                    name="certificateNumber"
                    value={certificateNumber}
                    onChange={(e) => setCertificateNumber(e.target.value)}
                    placeholder="e.g. EC123456"
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
                      ${
                        darkMode
                          ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                      }`}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                {loading ? "Verifying..." : "Verify"}
              </motion.button>
            </form>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-red-400 font-medium"
              >
                {error}
              </motion.p>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-xl border border-green-500/50 bg-green-500/23 text-center"
              >
                <p className="text-lg font-bold text-green-400">
                  Certificate Verified
                </p>
                <div className="mt-3 space-y-1">
                  <p>
                    <strong>Name:</strong> {result.name}
                  </p>
                  <p>
                    <strong>Domain:</strong> {result.domain}
                  </p>
                  <p>
                    <strong>Certificate Number:</strong>{" "}
                    {result.certificateNumber}
                  </p>

                  {result.pdfUrl && (
                    <p className="mt-3">
                      <a
                        href={result.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline hover:text-blue-500"
                      >
                        📄 View Certificate PDF
                      </a>
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VerifyCertificateModal;
