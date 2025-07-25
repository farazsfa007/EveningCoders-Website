/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseTrail = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", move);
    }

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const getGradientColors = (index) => {
    // Define a range of blues, whites, and pinks
    const colors = [
      "#E0FFFF", // Light Cyan (almost white-blue)
      "#ADD8E6", // Light Blue
      "#87CEEB", // Sky Blue
      "#B0E0E6", // Powder Blue
      "#FFFFFF", // White
      "#FFF0F5", // Lavender Blush (almost white-pink)
      "#FFDAB9", // Peach Puff (light orange-pink) - can remove if you want strictly blue/white/pink
      "#FFC0CB", // Pink
      "#FF69B4", // Hot Pink
      "#DB7093", // Pale Violet Red (deeper pink)
    ];

    // Calculate start and end indices for the gradient based on the trail index
    const startIndex = index % colors.length;
    const midIndex = (index + 2) % colors.length; // Shifted slightly for variety
    const endIndex = (index + 4) % colors.length; // Shifted slightly more for variety

    return `linear-gradient(45deg, ${colors[startIndex]}, ${colors[midIndex]}, ${colors[endIndex]})`;
  };

  return (
    <>
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999]"
          animate={{
            x: position.x - 6,
            y: position.y - 6,
            scale: 1 - i * 0.07,
            opacity: 0.9 - i * 0.07,
          }}
          transition={{
            duration: 0.3 + i * 0.05,
            ease: "easeOut",
          }}
          style={{
            // --- MODIFIED CODE START ---
            background: getGradientColors(i),
            // --- MODIFIED CODE END ---
          }}
        />
      ))}
    </>
  );
};

export default MouseTrail;