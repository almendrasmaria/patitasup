"use client";

import Link from "next/link";
import { FiArrowUpRight, FiHeart, FiHome } from "react-icons/fi";
import { motion } from "motion/react";

import Badge from "@/components/ui/Badge";

import HeroPawBackdrop from "./HeroPawBackdrop";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const headerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomeHero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-[#FF7B4D] via-[#FF8A5C] to-[#FFA178] px-5 pb-28 pt-14 sm:px-7 sm:pb-32 sm:pt-16 md:px-10 md:pb-36 md:pt-20 lg:px-14 lg:pb-40 lg:pt-24 xl:px-16 xl:pt-28 [@media(max-height:680px)]:py-10 [@media(max-height:680px)]:md:py-12"
    >
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl sm:h-[380px] sm:w-[380px] md:h-[420px] md:w-[420px]"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -left-20 h-[300px] w-[300px] rounded-full bg-[#FFD4B8]/30 blur-3xl sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px]"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      />

      <HeroPawBackdrop />

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 text-white"
        aria-hidden
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-14 w-full sm:h-16 md:h-20 lg:h-24">
          <path
            fill="currentColor"
            d="M0,72 C180,118 360,28 540,64 C720,100 900,36 1080,68 C1260,100 1350,88 1440,76 L1440,120 L0,120 Z"
          />
        </svg>
      </motion.div>

      <motion.div
        className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center sm:gap-7 md:gap-8 [@media(max-height:680px)]:gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.header
          variants={headerStagger}
          className="flex w-full flex-col items-center gap-4 text-center sm:gap-5 md:gap-6 [@media(max-height:680px)]:gap-3"
        >
          <motion.div variants={fadeUp}>
            <Badge text="Adopción responsable" variant="onAccent" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="m-0 text-balance font-bold tracking-tight text-white"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(2.25rem, 5vw + 0.35rem, 3.75rem)",
              lineHeight: 1.08,
            }}
          >
            <span className="md:hidden">
              Tu próximo mejor amigo
              <br />
              te está esperando
            </span>
            <span className="hidden md:inline">
              Tu próximo mejor amigo te
              <br />
              está esperando
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="m-0 mx-auto max-w-2xl text-pretty text-[16px] leading-7 text-white/85 sm:text-[17px] lg:text-[19px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Conectamos mascotas rescatadas con familias listas para brindar amor. ¿Listo para encontrar a tu
            compañero perfecto?
          </motion.p>
        </motion.header>

        <motion.div
          variants={fadeUp}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-4"
        >
          <Link
            href="/pets"
            className="group flex min-h-[3.25rem] w-full touch-manipulation items-center justify-center gap-3 rounded-full bg-white py-2.5 pl-7 pr-2.5 text-[15px] font-semibold text-[var(--brand-teal)] shadow-[var(--shadow-teal-button)] transition-[transform,box-shadow,background-color,color] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-teal-button-hover)] active:translate-y-0 sm:inline-flex sm:w-auto sm:text-base [@media(max-height:680px)]:min-h-11 [@media(max-height:680px)]:py-2 [@media(max-height:680px)]:pl-5 [@media(max-height:680px)]:pr-2 [@media(max-height:680px)]:text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <FiHeart
              className="h-5 w-5 shrink-0 text-[var(--warm-orange)] transition-colors group-hover:text-[var(--brand-teal)]"
              strokeWidth={2.25}
              aria-hidden
            />
            Quiero adoptar
            <span className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--warm-orange)] text-white shadow-[var(--shadow-accent-badge)] transition-colors group-hover:bg-[var(--brand-teal)] group-hover:shadow-[var(--shadow-teal-badge)]">
              <FiArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
            </span>
          </Link>

          <Link
            href="/register"
            className="flex min-h-[3.25rem] w-full touch-manipulation items-center justify-center gap-2.5 rounded-full bg-[var(--brand-teal)] px-8 py-3 text-[15px] font-semibold text-white shadow-[var(--shadow-teal-button-strong)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-teal-hover)] hover:shadow-[var(--shadow-teal-button-strong-hover)] active:translate-y-0 sm:inline-flex sm:w-auto sm:text-base [@media(max-height:680px)]:min-h-11 [@media(max-height:680px)]:px-6 [@media(max-height:680px)]:text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <FiHome className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
            Soy refugio
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
