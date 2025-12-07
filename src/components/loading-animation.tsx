"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d1117]"
          style={{ willChange: "opacity" }}
        >
          {/* Animated background blobs - optimized for performance */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/30
                h-[300px] w-[300px] blur-[60px]
                sm:h-[400px] sm:w-[400px] sm:blur-[80px]
                md:h-[500px] md:w-[500px] md:blur-[100px]
                lg:h-[600px] lg:w-[600px] lg:blur-[120px]"
              style={{ willChange: "transform, opacity" }}
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute left-1/3 top-1/3 rounded-full bg-pink-600/20
                h-[200px] w-[200px] blur-[50px]
                sm:h-[300px] sm:w-[300px] sm:blur-[70px]
                md:h-[350px] md:w-[350px] md:blur-[90px]
                lg:h-[400px] lg:w-[400px] lg:blur-[100px]"
              style={{ willChange: "transform, opacity" }}
            />
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute right-1/3 bottom-1/3 rounded-full bg-blue-600/20
                h-[250px] w-[250px] blur-[55px]
                sm:h-[350px] sm:w-[350px] sm:blur-[75px]
                md:h-[450px] md:w-[450px] md:blur-[95px]
                lg:h-[500px] lg:w-[500px] lg:blur-[110px]"
              style={{ willChange: "transform, opacity" }}
            />
          </div>

          {/* Main content - responsive sizing */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-4 sm:gap-8">
            {/* Animated logo/icon - responsive size */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.8,
              }}
              className="relative"
              style={{ willChange: "transform" }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 opacity-50
                  blur-md sm:blur-lg md:blur-xl"
                style={{ willChange: "transform" }}
              />
              <div className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 shadow-2xl
                h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
                <svg
                  className="h-8 w-8 text-white sm:h-10 sm:w-10 md:h-12 md:w-12"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </motion.div>

            {/* NewsHub text - responsive sizing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
              style={{ willChange: "opacity, transform" }}
            >
              <h2 className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text font-bold text-transparent
                text-2xl sm:text-3xl md:text-4xl">
                NewsHub
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-1.5 text-[#8b949e] sm:mt-2
                  text-xs sm:text-sm"
              >
                Loading latest news...
              </motion.p>
            </motion.div>

            {/* Progress bar - responsive width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="w-48 sm:w-56 md:w-64"
              style={{ willChange: "opacity, transform" }}
            >
              <div className="relative overflow-hidden rounded-full bg-[#161b22]
                h-1 sm:h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600"
                  style={{ willChange: "width" }}
                >
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ willChange: "transform" }}
                  />
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-1.5 text-center text-[#7d8590] sm:mt-2
                  text-[10px] sm:text-xs"
              >
                {progress}%
              </motion.p>
            </motion.div>

            {/* Pulsating dots - responsive size */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-1.5 sm:gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500
                    h-1.5 w-1.5 sm:h-2 sm:w-2"
                  style={{ willChange: "transform, opacity" }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}