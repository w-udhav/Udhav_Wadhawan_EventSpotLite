import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ title }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="pl-1 font-anton font-bold text-4xl md:text-6xl leading-normal bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-orange-50 via-red-200 to-blue-200 bg-clip-text text-transparent"
    >
      {title}
    </motion.h1>
  );
}
