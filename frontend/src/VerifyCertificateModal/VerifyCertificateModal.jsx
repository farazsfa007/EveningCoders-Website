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
        {
          certificateNumber: certificateNumber.trim(),
        }
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
          className="fixed inset-0 z-50 flex items-center justify-center mt-100 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`relative w-full max-w-md p-6 rounded-lg shadow-xl border 
              ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              className="absolute top-3 right-3 text-xl"
              onClick={onClose}
              aria-label="Close"
            >
              <RxCross2 />
            </button>

            <h2 className="text-xl font-semibold mb-4">Verify Certificate</h2>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label
                  htmlFor="certificateNumber"
                  className="block text-sm font-medium mb-1"
                >
                  Enter Certificate Number
                </label>
                <input
                  type="text"
                  id="certificateNumber"
                  name="certificateNumber"
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none border 
                    ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  placeholder="e.g. EC123456"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>

            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

            {result && (
              <div className="mt-6 text-center">
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
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VerifyCertificateModal;
