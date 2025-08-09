import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CiCircleChevDown } from "react-icons/ci";

const index = () => {
  const heroRef = useRef();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Hero text animations
    const texts = gsap.utils.toArray(".text");
    const timeline = gsap.timeline();
    texts.forEach((text, index) => {
      timeline.fromTo(
        text,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        index === 0 ? "+=1" : ">"
      );
    });

    // Desktop animations
    mm.add("(min-width: 768px)", () => {
      // Hero image fade in
      gsap.fromTo(
        ".hero-image",
        { opacity: 0 },
        { opacity: 1, delay: 2, duration: 1 }
      );

      // Down arrow animation
      gsap.fromTo(
        ".down",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 3 }
      );
    });
  }, { scope: heroRef });

  return (
    <div 
      ref={heroRef}
      className="w-full relative p-4 gap-4 px-12 flex items-start justify-center min-h-screen"
    >
      <div className="w-full md:w-1/2 flex items-center gap-8 min-h-screen justify-center flex-col">
        <div className="space-y-6">
          <h1 className="text-6xl tracking-tight font-light text-gray-900 text">
            Batuhan ÇİFTÇİ
          </h1>
          <h2 className="text-3xl font-light text-gray-600 text">
            Full Stack Developer
          </h2>
          <p className="text-lg leading-relaxed text-gray-500 text max-w-lg">
            Kullanıcı deneyimini merkeze alan, modern ve etkili web çözümleri
            geliştiren tutkulu bir yazılım geliştiricisi.
          </p>
        </div>
      </div>
      <div className="flex-1 md:flex hidden items-center min-h-screen justify-center">
        <div className="w-64 hero-image aspect-square rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg"></div>
      </div>
      <div className="down hidden md:flex items-center text-center justify-center gap-2 flex-col absolute left-1/2 -translate-x-1/2 bottom-20 opacity-0">
        <CiCircleChevDown size={40} className="w-10 h-10 text-gray-400" />
        <p className="text-gray-500 text-sm font-light">Scroll to explore</p>
      </div>
    </div>
  );
};

export default index;