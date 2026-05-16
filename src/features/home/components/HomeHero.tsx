"use client";

import Link from "next/link";
import { FiArrowUpRight, FiHeart, FiShield } from "react-icons/fi";
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
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
          className="mt-4 flex flex-wrap items-stretch justify-center gap-4 sm:mt-5 md:gap-5 [@media(max-height:680px)]:mt-2 [@media(max-height:680px)]:gap-3"
        >
          <Link
            href="/pets"
            className="group inline-flex min-h-[3.25rem] touch-manipulation items-center gap-3 rounded-full bg-white py-2.5 pl-7 pr-2.5 text-base font-semibold text-[var(--brand-teal)] shadow-[0_12px_32px_rgba(48,69,67,0.2)] transition-[transform,box-shadow,background-color,color] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(48,69,67,0.26)] active:translate-y-0 [@media(max-height:680px)]:min-h-11 [@media(max-height:680px)]:py-2 [@media(max-height:680px)]:pl-5 [@media(max-height:680px)]:pr-2 [@media(max-height:680px)]:text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <FiHeart className="h-5 w-5 shrink-0 text-[var(--warm-orange)] transition-colors group-hover:text-[var(--brand-teal)]" strokeWidth={2.25} aria-hidden />
            Quiero adoptar
            <span className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--warm-orange)] text-white shadow-[0_4px_12px_rgba(255,136,86,0.4)] transition-colors group-hover:bg-[var(--brand-teal)] group-hover:shadow-[0_4px_12px_rgba(48,69,67,0.35)]">
              <FiArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
            </span>
          </Link>

          <Link
            href="/register"
            className="inline-flex min-h-[3.25rem] touch-manipulation items-center justify-center gap-2.5 rounded-full bg-[var(--brand-teal)] px-8 py-3 text-base font-semibold text-white shadow-[0_12px_32px_rgba(48,69,67,0.28)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-teal-hover)] hover:shadow-[0_16px_40px_rgba(48,69,67,0.34)] active:translate-y-0 [@media(max-height:680px)]:min-h-11 [@media(max-height:680px)]:px-6 [@media(max-height:680px)]:text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <FiShield className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
            Soy refugio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
