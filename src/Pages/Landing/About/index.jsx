"use server";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const index = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await fetch(import.meta.env.VITE_FRONT_URL + "about");
    const data = await res.json();
    setData(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const aboutRef = useRef();

  useGSAP(
    () => {
      // About Me line animations
      gsap.utils.toArray(".line").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: aboutRef }
  );

  return (
    <div
      ref={aboutRef}
      className="w-full md:w-1/2 p-8 flex flex-col gap-6 h-auto top-0"
    >
      <div className="space-y-6">
        <h2 className="font-light text-4xl text-gray-900 mb-8 relative after:absolute after:bottom-[-10px] after:left-0 after:w-20 after:h-1 after:bg-blue-500 after:rounded-full">
          {data?.title}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            {data?.text
              .trim()
              .split("\n\n")
              .map((paragraph, index) =>
                paragraph.split("\n").map((line, index) => (
                  <p
                    key={index}
                    className="font-light capitalize mb-5"
                  >
                    {line}
                  </p>
                ))
              )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
