/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseTrail = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Only apply mousemove for devices with mouse input
    // Consider if you want this for all devices or only larger screens
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", move);
    }

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999]" // Removed mix-blend-screen and blur-xl for potentially brighter colors
          animate={{
            x: position.x - 6,
            y: position.y - 6,
            scale: 1 - i * 0.07,
            opacity: 0.9 - i * 0.07, // Slightly increased base opacity for more vivid trails
          }}
          transition={{
            duration: 0.3 + i * 0.05,
            ease: "easeOut",
          }}
          style={{
            // Your existing colorful gradient logic
            background: `linear-gradient(45deg,
              hsl(${(i * 30) % 360}, 100%, 60%),
              hsl(${(i * 60) % 360}, 100%, 60%),
              hsl(${(i * 90) % 360}, 100%, 60%))`,
            // Optional: Re-add mix-blend-mode if you prefer the effect,
            // but test different values like 'lighten', 'screen', 'overlay', 'difference'
            // mixBlendMode: 'screen',
            // Optional: Adjust blur, or use a slightly less intense blur if you want colors to be sharper
            // filter: 'blur(10px)', // Smaller blur value
          }}
        />
      ))}
    </>
  );
};

export default MouseTrail;