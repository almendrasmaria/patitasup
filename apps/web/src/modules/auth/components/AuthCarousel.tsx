"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  image: string;
  title: string;
  description: string;
};

type AuthCarouselProps = {
  slides: Slide[];
  interval?: number;
};

const AuthCarousel = ({ slides, interval = 4000 }: AuthCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, isPaused, slides.length]);

  return (
    <div
      className="relative hidden h-full md:block"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={`${slide.image}-${index}`}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={slide.image} alt="" fill priority={index === 0} className="object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

          <div className="absolute bottom-12 left-12 max-w-[420px]">
            <h2 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              {slide.title}
            </h2>

            <p className="mt-5 max-w-[340px] text-[15px] leading-7 text-white/85">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-12 z-10 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-[4px] rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-10 bg-white" : "w-3 bg-white/45"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthCarousel;
