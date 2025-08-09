 
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../../../Components/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const index = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await fetch(import.meta.env.VITE_FRONT_URL + "projects");
    const data = await res.json();
    setData(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const projectsRef = useRef();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(projectsRef);

      mm.add("(min-width: 768px)", () => {
        q(".scroll-image").forEach((item, index) => {
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

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: projectsRef, dependencies: [data] }
  );

  return (
    <section
      ref={projectsRef}
      className="w-full p-4 lg:p-12 min-h-screen h-auto relative grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center bg-gray-50"
    >
        {data && data.map((item, index) => (
        <ProjectCard className="scroll-image" item={item} key={index} />
      ))}
    </section>
  );
};

export default index;
