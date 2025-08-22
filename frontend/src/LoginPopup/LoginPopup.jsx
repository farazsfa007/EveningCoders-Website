/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
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

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LoginPopup = ({ darkMode }) => {
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
    return <AdminPanel onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-2xl shadow-2xl p-8 w-full max-w-md 
          ${
            darkMode
              ? "bg-slate-800/90 border border-slate-700 text-white"
              : "bg-white border border-gray-300 text-gray-900"
          }`}
      >
        <motion.div variants={childVariants} className="text-center mb-8">
          <h2
            className={`text-3xl font-bold 
            ${
              darkMode
                ? "bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text"
                : "text-indigo-700"
            }`}
          >
            Admin Access
          </h2>
          <p
            className={`${
              darkMode ? "text-slate-400" : "text-gray-600"
            } mt-1`}
          >
            Please log in with your admin email
          </p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div variants={childVariants} className="relative">
            <FaUser
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 
                ${darkMode ? "text-slate-400" : "text-gray-400"}`}
              size={18}
            />
            <input
              type="email"
              name="email"
              placeholder="Admin email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={`w-full pl-10 pr-3 py-3 rounded-lg focus:ring-2 transition-all 
                ${
                  darkMode
                    ? "bg-slate-900/50 border border-slate-700 text-white placeholder-gray-400 focus:ring-indigo-500"
                    : "bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-400"
                }`}
              required
            />
          </motion.div>

          <motion.div variants={childVariants} className="relative">
            <FaLock
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 
                ${darkMode ? "text-slate-400" : "text-gray-400"}`}
              size={18}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className={`w-full pl-10 pr-3 py-3 rounded-lg focus:ring-2 transition-all 
                ${
                  darkMode
                    ? "bg-slate-900/50 border border-slate-700 text-white placeholder-gray-400 focus:ring-indigo-500"
                    : "bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-400"
                }`}
              required
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 font-semibold rounded-lg shadow-lg transition-all focus:outline-none focus:ring-2
                ${
                  darkMode
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-300"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPopup;
