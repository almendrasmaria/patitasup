"use client";

import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiHeart, FiShield } from "react-icons/fi";
import { motion } from "motion/react";

import HeroPawBackdrop from "./HeroPawBackdrop";

export default function HomeHero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-[#FF7B4D] via-[#FF8A5C] to-[#FFA178] px-5 py-14 sm:px-7 sm:py-16 md:px-10 md:py-20 lg:px-14 lg:py-24 xl:px-16 xl:py-28 [@media(max-height:680px)]:py-10 [@media(max-height:680px)]:md:py-12"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl sm:h-[380px] sm:w-[380px] md:h-[420px] md:w-[420px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[300px] w-[300px] rounded-full bg-[#FFD4B8]/30 blur-3xl sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px]" aria-hidden />

      <HeroPawBackdrop />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-5 text-center text-white sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10 [@media(max-height:680px)]:gap-3 [@media(max-height:680px)]:sm:gap-4">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white shadow-sm backdrop-blur-md sm:gap-2.5 sm:px-5 sm:py-2 sm:text-[15px] [@media(max-height:680px)]:gap-1.5 [@media(max-height:680px)]:px-3 [@media(max-height:680px)]:py-1.5 [@media(max-height:680px)]:text-xs"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden />
          <span className="font-bold tracking-tight">Adopción responsable</span>
          <FiArrowRight className="h-3.5 w-3.5 shrink-0 opacity-95 sm:h-4 sm:w-4" strokeWidth={2.25} aria-hidden />
          <span className="font-medium tracking-tight">Hecho con amor</span>
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-semibold tracking-tight"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(2.85rem, min(calc(5.5vw + 1.35rem), 17svh), 8rem)",
            lineHeight: 0.95,
          }}
        >
          PatitasUp
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl font-medium tracking-tight text-pretty"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(1.2rem, min(calc(1.9vw + 0.85rem), 5.5svh), 2.1rem)",
            lineHeight: 1.2,
          }}
        >
          Conectamos familias con{" "}
          <em className="not-italic underline decoration-white/40 decoration-2 underline-offset-[0.22em] sm:decoration-4 sm:underline-offset-4">
            mascotas
          </em>{" "}
          que necesitan un hogar
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="max-w-2xl text-pretty text-white/95"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(1rem, min(calc(1.1vw + 0.75rem), 3.2svh), 1.3rem)",
            lineHeight: 1.65,
          }}
        >
          Una nueva plataforma para conectar refugios y familias. Encuentra a tu próximo compañero y dale el hogar que
          merece.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:mt-3 md:gap-4 [@media(max-height:680px)]:mt-1 [@media(max-height:680px)]:gap-2"
        >
          <Link
            href="/pets"
            className="group inline-flex min-h-12 touch-manipulation items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-[#1F1B16] transition-colors hover:bg-[#1F1B16] hover:text-white active:brightness-95 md:min-h-[3.25rem] md:py-2.5 md:pl-7 md:pr-2.5 md:text-base [@media(max-height:680px)]:min-h-11 [@media(max-height:680px)]:py-1.5 [@media(max-height:680px)]:pl-5 [@media(max-height:680px)]:pr-1.5 [@media(max-height:680px)]:text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <FiHeart className="h-[18px] w-[18px] shrink-0 transition-colors group-hover:text-white" strokeWidth={2.25} aria-hidden />
            Quiero adoptar
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF7645] text-white transition-colors group-hover:bg-white group-hover:text-[#1F1B16] md:h-10 md:w-10">
              <FiArrowUpRight className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={2.25} aria-hidden />
            </span>
          </Link>

          <Link
            href="/register"
            className="inline-flex min-h-12 touch-manipulation items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-[15px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 active:brightness-95 md:min-h-[3.25rem] md:px-8 md:text-base [@media(max-height:680px)]:min-h-11 [@media(max-height:680px)]:px-5 [@media(max-height:680px)]:py-2.5 [@media(max-height:680px)]:text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <FiShield className="h-[18px] w-[18px] shrink-0 opacity-95" strokeWidth={2} aria-hidden />
            Soy refugio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
