"use client";

import { FaPaw } from "react-icons/fa";
import { motion } from "motion/react";

const HERO_PAW_MARKS = [
  { top: "8%", left: "6%", size: 56, rotate: -18, opacity: 0.18 },
  { top: "18%", left: "85%", size: 38, rotate: 22, opacity: 0.14 },
  { top: "32%", left: "12%", size: 28, rotate: 10, opacity: 0.12 },
  { top: "55%", left: "78%", size: 64, rotate: -28, opacity: 0.16 },
  { top: "70%", left: "8%", size: 44, rotate: 18, opacity: 0.15 },
  { top: "82%", left: "48%", size: 32, rotate: -8, opacity: 0.1 },
  { top: "78%", left: "90%", size: 26, rotate: 30, opacity: 0.12 },
  { top: "42%", left: "92%", size: 22, rotate: -14, opacity: 0.1 },
  { top: "60%", left: "30%", size: 24, rotate: 12, opacity: 0.08 },
  { top: "14%", left: "42%", size: 20, rotate: -22, opacity: 0.08 },
] as const;

export default function HeroPawBackdrop() {
  return (
    <>
      {HERO_PAW_MARKS.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-white"
          style={{ top: p.top, left: p.left, opacity: p.opacity }}
          initial={{ opacity: 0, scale: 0.6, rotate: p.rotate }}
          animate={{ opacity: p.opacity, scale: 1, rotate: p.rotate }}
          transition={{ duration: 0.8, delay: 0.05 * i, ease: "easeOut" }}
        >
          <FaPaw className="block" style={{ fontSize: p.size }} aria-hidden />
        </motion.div>
      ))}
    </>
  );
}
