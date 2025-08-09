/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaTimes } from "react-icons/fa";
import AdminPanel from "../AdminPanel/AdminPanel";

// Firebase imports
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 260,
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LoginPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsLoggedIn(false);
        setError("");
        setCheckedAuth(true);
        return;
      }

      try {
        const adminRef = doc(db, "admin", user.uid);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
          const adminData = adminSnap.data();
          if (adminData.isAdmin === true || adminData.admin) {
            setIsLoggedIn(true);
          } else {
            await signOut(auth);
            setIsLoggedIn(false);
            setError("Your account is not authorized as admin.");
          }
        } else {
          await signOut(auth);
          setIsLoggedIn(false);
          setError("Your account is not authorized as admin.");
        }
      } catch (err) {
        console.error("Admin verification error:", err);
        setError("An error occurred while verifying admin access.");
        setIsLoggedIn(false);
      } finally {
        setCheckedAuth(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = (formData.email || "").trim();
    const password = formData.password || "";

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Sign-in error:", err);
      const code = err?.code || "";
      if (code === "auth/invalid-email") setError("Invalid email address.");
      else if (code === "auth/user-not-found")
        setError("No account found with that email.");
      else if (code === "auth/wrong-password")
        setError("Wrong password. Try again.");
      else if (code === "auth/too-many-requests")
        setError("Too many attempts. Try again later.");
      else if (code === "auth/user-disabled")
        setError("This account has been disabled.");
      else setError(err?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setFormData({ email: "", password: "" });
  };

  if (!checkedAuth) {
    return null;
  }

  if (isLoggedIn) {
    return <AdminPanel onClose={onClose} onLogout={handleLogout} />;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-4">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl p-8 w-full max-w-md text-white"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <FaTimes size={22} />
          </motion.button>

          <motion.div variants={childVariants} className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
              Admin Access
            </h2>
            <p className="text-slate-400 mt-1">
              Please log in with your admin email
            </p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div variants={childVariants} className="relative">
              <FaUser
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                placeholder="Admin email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                required
              />
            </motion.div>

            <motion.div variants={childVariants} className="relative">
              <FaLock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                required
              />
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <motion.div
              variants={childVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-700/50 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
              >
                {loading ? "Logging in..." : "Login"}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginPopup;
