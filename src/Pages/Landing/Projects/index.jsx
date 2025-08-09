import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../../../Components/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const index = () => {
  const projectsRef = useRef();
  const images = [0, 1, 2, 3];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop scroll-triggered image animations
    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray(".scroll-image").forEach((item, index) => {
        const isEven = index % 2 === 0;
        gsap.fromTo(
          item,
          {
            rotationZ: isEven ? 60 : -60,
            x: isEven ? -400 : 400,
            opacity: 0,
            y: 150,
            scale: 0.6,
            filter: "blur(10px)",
          },
          {
            rotationZ: 0,
            x: 0,
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      });
    });
  }, { scope: projectsRef });

  return (
    <section 
      ref={projectsRef}
      className="w-full p-4 lg:p-12 min-h-screen h-auto relative grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center bg-gray-50"
    >
      {images.map((item, index) => (
        <ProjectCard item={item} key={index} />
      ))}
    </section>
  );
};

export default index;