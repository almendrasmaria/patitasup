"use client";

import { motion } from "motion/react";
import { FaPaw } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";

type Props = {
  petName: string;
};

export default function AdoptionFormSuccess({ petName }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-6 py-12 text-center"
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: "linear-gradient(135deg, var(--warm-orange-light), var(--accent))" }}
      >
        <HiCheckCircle size={40} className="text-white" aria-hidden />
      </div>

      <div>
        <h2 className="mb-2 text-2xl font-bold text-[var(--foreground-heading)]">¡Solicitud enviada!</h2>
        <p className="mx-auto max-w-xs text-sm text-[var(--muted-foreground)]">
          Nos contactaremos con vos a la brevedad para coordinar el siguiente paso. ¡Gracias por querer adoptar a{" "}
          {petName}!
        </p>
      </div>

      <div className="flex gap-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
          >
            <FaPaw size={20} className="text-[var(--accent)]" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
