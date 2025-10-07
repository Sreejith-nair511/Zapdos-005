"use client"

import { motion } from "framer-motion"

export function DigitalSarpanchLogo({ size = 48 }: { size?: number }) {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600"
        style={{ width: size, height: size }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-red-500"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <span className="relative text-white font-bold text-lg" style={{ fontSize: size * 0.4 }}>
          ड
        </span>
      </div>
    </motion.div>
  )
}