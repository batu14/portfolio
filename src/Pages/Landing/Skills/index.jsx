import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CiLaptop } from "react-icons/ci";
import LanguageCard from "../../../Components/LanguageCard";
import AboutSection from "../About";

gsap.registerPlugin(ScrollTrigger);

const index = () => {
  const skillsRef = useRef();
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await fetch(import.meta.env.VITE_FRONT_URL + "skills");
    const data = await res.json();
    setData(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const skills = [
    {
      name: "React",
      level: 5,
      icon: CiLaptop,
      description:
        "React.js, Tailwind CSS ve GSAP gibi modern teknolojileri kullanarak kullanıcılarla etkileşimde kusursuz deneyimler oluşturuyorum.",
    },
    {
      name: "Tailwind",
      level: 4,
      icon: CiLaptop,
      description:
        "Tailwind CSS, GSAP ve modern teknolojileri kullanarak kullanıcılarla etkileşimde kusursuz deneyimler oluşturuyorum.",
    },
    {
      name: "PHP",
      level: 4,
      icon: CiLaptop,
      description:
        "PHP, Node.js ve MySQL gibi güçlü altyapılarla sağlam ve güvenilir sistemler geliştiriyorum.",
    },
    {
      name: "MYSQL",
      level: 4,
      icon: CiLaptop,
      description:
        "MySQL, PostgreSQL ve MongoDB gibi güçlü altyapılarla sağlam ve güvenilir sistemler geliştiriyorum.",
    },
    {
      name: "REACT",
      level: 5,
      icon: CiLaptop,
      description:
        "React.js, Tailwind CSS ve GSAP gibi modern teknolojileri kullanarak kullanıcılarla etkileşimde kusursuz deneyimler oluşturuyorum.",
    },
    {
      name: "Tailwind",
      level: 4,
      icon: CiLaptop,
      description:
        "Tailwind CSS, GSAP ve modern teknolojileri kullanarak kullanıcılarla etkileşimde kusursuz deneyimler oluşturuyorum.",
    },
    {
      name: "PHP",
      level: 4,
      icon: CiLaptop,
      description:
        "PHP, Node.js ve MySQL gibi güçlü altyapılarla sağlam ve güvenilir sistemler geliştiriyorum.",
    },
    {
      name: "MYSQL",
      level: 4,
      icon: CiLaptop,
      description:
        "MySQL, PostgreSQL ve MongoDB gibi güçlü altyapılarla sağlam ve güvenilir sistemler geliştiriyorum.",
    },
  ];

  useGSAP(
    () => {
      if (!data || !data.length) return;

      const cards = gsap.utils.toArray(".skill-card", skillsRef.current);
      cards.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0, scale: 0.8, filter: "blur(5px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });

      ScrollTrigger.refresh();
    },
    { scope: skillsRef, dependencies: [data] }
  );
  return (
    <section
      ref={skillsRef}
      className="w-full py-16 content-box flex flex-col-reverse md:flex-row items-start justify-start gap-8 bg-white"
    >
      <div className="w-full md:w-1/2 flex-col flex items-start justify-start">
        <div className="w-full h-auto place-items-center full grid grid-cols-1 md:grid-cols-2 p-6 md:p-12 md:pr-0 gap-6">
          {data &&
            data.map((s, index) => (
              <div key={index} className="skill-card">
                <LanguageCard
                  name={s.title}
                  description={s.description}
                  Icon={s.html}
                />
              </div>
            ))}
        </div>
      </div>
      <AboutSection />
    </section>
  );
};

export default index;
