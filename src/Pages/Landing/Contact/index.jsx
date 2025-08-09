import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mailbox from "../Mailbox";

gsap.registerPlugin(ScrollTrigger);

const index = () => {
  const contactRef = useRef();
  const svgContainer = useRef();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop SVG signature animation
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          svgContainer.current,
          { opacity: -2, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            onComplete: () => {
              // Start signature draw animation after container animation
              animateSignature();
            },
          }
        );
      });

      // Contact form and title animation
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Social media links animation (staggered)
      gsap.utils.toArray(".social-link").forEach((link, i) => {
        gsap.fromTo(
          link,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.6 + i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: contactRef }
  );

  // Signature draw animation function
  const animateSignature = () => {
    const paths = gsap.utils.toArray(".draw-path-1, .draw-path-2, .draw-path-3, .draw-path-4");
    
    // Set initial state - hide all paths
    gsap.set(paths, {
      strokeDasharray: function(i, target) {
        return target.getTotalLength() + " " + target.getTotalLength();
      },
      strokeDashoffset: function(i, target) {
        return target.getTotalLength();
      }
    });
   
    // Create timeline for signature drawing - play only once
    const signatureTimeline = gsap.timeline();
   
    // Animate each path with staggered timing
    paths.forEach((path, index) => {
      signatureTimeline.to(path, {
        strokeDashoffset: 0,
        duration: 2 + (index * 0.5), // Each path takes longer
        ease: "power2.inOut",
      }, index * 0.8); // Stagger start times
    });
   };

  return (
    <section
      ref={contactRef}
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center relative overflow-hidden p-4 md:p-8 lg:p-12"
    >
      <div className="hidden lg:flex w-full lg:w-1/2 h-1/2 lg:h-full items-center justify-center relative z-10 p-4 lg:p-0 overflow-hidden">
        <div
          ref={svgContainer}
          className="relative w-full h-full flex items-center justify-center group"
        >
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <defs></defs>
            <g
              className="signature-path"
              transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
              fill="none"
              stroke="black"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="draw-path-1"
                d="M1623 3021 c-51 -37 -113 -131 -197 -300 -37 -73 -70 -131 -72 -128 -8 7 44 173 67 219 10 21 28 46 40 57 l21 19 -20 11 c-12 6 -25 11 -30 11 -39 0 -197 -553 -172 -600 17 -31 25 -24 37 33 6 29 25 89 42 134 26 68 36 82 58 88 15 3 57 24 94 47 116 68 199 52 199 -41 0 -150 -259 -391 -421 -391 -47 0 -107 27 -115 52 -3 10 -10 18 -15 18 -6 0 -6 -6 0 -17 43 -81 170 -104 276 -51 108 55 216 165 269 275 52 105 22 205 -66 219 l-38 6 60 66 c75 81 120 168 120 232 0 25 -5 51 -12 58 -22 22 -82 14 -125 -17z m105 3 c24 -43 -46 -196 -134 -292 -43 -48 -67 -65 -121 -86 -37 -14 -68 -24 -70 -22 -5 5 45 111 90 191 59 103 114 172 161 200 48 29 62 31 74 9z"
              />

              <path
                className="draw-path-2"
                d="M2725 2915 c-85 -144 -232 -606 -211 -660 11 -29 31 -14 54 39 13 29 41 80 62 112 72 110 119 146 106 82 -18 -89 -18 -105 -1 -121 25 -26 41 -21 92 26 26 23 43 36 39 30 -9 -16 11 -53 29 -53 7 0 47 37 89 82 42 46 76 78 76 73 0 -6 -9 -35 -19 -65 -31 -89 -35 -124 -16 -143 29 -29 51 -19 118 53 l65 71 -15 -57 c-12 -49 -12 -59 0 -71 12 -12 21 -3 67 67 59 92 154 199 166 188 4 -5 -5 -47 -20 -95 -14 -49 -26 -96 -26 -105 0 -27 30 -38 61 -23 29 16 169 161 169 177 0 5 -34 -27 -76 -72 -75 -79 -110 -107 -121 -96 -3 3 7 44 21 91 31 98 31 129 0 133 -29 4 -77 -39 -142 -128 -30 -41 -59 -79 -64 -85 -12 -13 19 89 47 155 13 31 20 59 15 64 -15 15 -39 -2 -46 -31 -13 -61 -31 -89 -106 -166 -100 -103 -112 -97 -73 35 39 132 40 137 21 144 -10 4 -25 -5 -43 -28 -60 -73 -140 -150 -146 -141 -9 15 41 110 70 133 16 13 34 18 46 14 29 -9 11 15 -20 27 -35 13 -58 -3 -94 -66 -33 -59 -109 -135 -135 -135 -14 0 -15 6 -9 38 4 20 8 57 9 82 1 40 -2 45 -23 48 -30 5 -91 -60 -145 -152 -21 -37 -40 -65 -42 -63 -6 5 33 157 66 262 62 193 139 345 176 345 19 0 18 16 -2 24 -31 12 -44 5 -69 -39z"
              />

              <path
                className="draw-path-3"
                d="M2217 2868 c-8 -18 -21 -55 -31 -83 -9 -27 -20 -55 -24 -61 -4 -6 -77 -19 -162 -28 -186 -21 -200 -24 -200 -43 0 -11 7 -14 28 -9 40 8 241 44 285 50 20 2 37 2 37 -2 0 -3 -14 -53 -32 -110 -31 -103 -33 -105 -115 -190 -105 -108 -117 -104 -78 30 39 132 40 137 21 144 -10 4 -25 -5 -43 -28 -60 -73 -140 -150 -146 -141 -9 15 41 110 70 133 17 13 34 18 47 14 19 -5 19 -4 6 9 -31 31 -59 30 -90 -3 -39 -42 -74 -134 -60 -161 6 -10 17 -19 25 -19 7 0 47 37 89 82 42 46 76 78 76 73 0 -6 -9 -35 -19 -65 -31 -89 -35 -124 -16 -143 29 -30 52 -19 125 61 46 49 70 68 65 54 -21 -71 -45 -216 -45 -278 0 -58 4 -74 20 -89 26 -24 32 -16 18 23 -21 55 18 280 89 515 31 102 37 107 136 107 65 0 80 -5 90 -30 4 -10 6 -8 6 6 1 29 -16 34 -110 34 -79 0 -80 0 -73 23 12 40 45 99 69 123 26 26 23 34 -17 34 -22 0 -31 -7 -41 -32z"
              />

              <path
                className="draw-path-4"
                d="M2386 2541 c-76 -89 -130 -141 -147 -141 -17 0 -9 35 21 88 24 44 26 54 14 59 -20 7 -26 -1 -48 -65 -19 -56 -15 -102 9 -102 20 0 90 65 145 134 24 30 46 54 48 52 2 -2 -9 -28 -24 -57 -64 -128 -88 -221 -62 -247 20 -20 40 -15 29 6 -14 27 2 86 63 227 50 115 55 135 35 135 -4 0 -42 -40 -83 -89z"
              />
            </g>
          </svg>
        </div>
      </div>
      <Mailbox />
    </section>
  );
};

export default index;
