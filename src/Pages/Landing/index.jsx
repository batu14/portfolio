import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CiCircleChevDown } from "react-icons/ci";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CiLaptop } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import LanguageCard from "../../Components/LanguageCard";
import { Icons } from "../../Constants/Icons";
import ProjectCard from "../../Components/ProjectCard";
import { motion } from "framer-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Index = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const mainContainer = useRef();
  const svgContainer = useRef();
  const skillsContainer = useRef();
  const contactSectionRef = useRef();

  const images = [0, 1, 2, 3];
  const skills = [
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

  // Tüm animasyonları tek bir useGSAP kancası altında yönetiyoruz.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // --- MASAÜSTÜ ANİMASYONLARI (min-width: 768px) ---
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

        // Scroll-triggered image animations (masaüstü için daha karmaşık)
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

        // İletişim bölümü - Sadece masaüstünde görünen ikon animasyonu
        gsap.fromTo(
          svgContainer.current,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactSectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // --- TÜM CİHAZLAR İÇİN ORTAK ANİMASYONLAR ---

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

      // Skills card animation
      gsap.utils.toArray(".skill-card").forEach((item) => {
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

      // Skills container pinning - Manuel sticky yerine 'pin' kullanılıyor
      gsap.to(skillsContainer.current, {
        scrollTrigger: {
          trigger: skillsContainer.current,
          start: "top top",
          end: "+=100%", // Container yüksekliği kadar scroll edince pin'i kaldırır.

          pinSpacing: true, // Zıplamayı engellemek için boşluk ekler.
          scrub: 1,
        },
      });

      // İletişim Formu ve Başlık Animasyonu
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
            trigger: contactSectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Sosyal Medya Linkleri Animasyonu (basamaklı)
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
              trigger: contactSectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: mainContainer }
  ); // Ana container'ı scope olarak bağlıyoruz.

  // Icon animation with setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      // Sadece svgContainer mevcutsa animasyonu çalıştır
      if (svgContainer.current) {
        gsap.to(svgContainer.current, {
          opacity: 0,
          scale: 0.9,
          rotation: -5,
          filter: "blur(2px)",
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            setCurrentIconIndex((prevIndex) => (prevIndex + 1) % Icons.length);

            gsap.fromTo(
              svgContainer.current,
              { opacity: 0, scale: 1.1, rotation: 5, filter: "blur(2px)" },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
              }
            );
          },
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      ref={mainContainer}
      className="w-full flex items-start justify-start h-auto flex-col bg-white"
    >
      {/* Hero Section */}
      <div className="w-full relative p-4 gap-4 px-12 flex items-start justify-center min-h-screen">
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

      {/* Scroll Animation Section */}
      <section className="w-full p-12 min-h-screen h-auto relative grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center bg-gray-50">
        {images.map((item, index) => (
          <ProjectCard item={item} key={index} />
        ))}
      </section>

      {/* Skills Section - Refactored with pin:true */}
      <section
        ref={skillsContainer}
        className="w-full py-16 content-box flex flex-col-reverse md:flex-row items-start justify-start gap-8 bg-white"
      >
        <div className="w-full md:w-1/2 flex-col flex items-start justify-start">
          {/* JSX Düzeltmesi: 'skills' dizisi sadece bir kere map ediliyor */}
          <div className="w-full h-auto place-items-center full grid grid-cols-1 md:grid-cols-2 p-6 md:p-12 md:pr-0 gap-6">
            {skills &&
              skills.map((s, index) => (
                <div key={index} className="skill-card">
                  <LanguageCard
                    name={s.name}
                    description={s.description}
                    Icon={s.icon}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col gap-6 h-auto  top-0">
          <div className="space-y-6">
            <h2 className="font-light text-4xl text-gray-900 mb-8 relative after:absolute after:bottom-[-10px] after:left-0 after:w-20 after:h-1 after:bg-blue-500 after:rounded-full">
              About Me
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 line leading-relaxed">
                Merhaba! Ben Batuhan, kullanıcı deneyimini merkeze alan bir Full
                Stack Web Developer'ım. Yazılım dünyasına olan ilgim, yalnızca
                bir meslekten öte; bir tutku, bir yaşam biçimi.
              </p>
              <p className="text-gray-600 line leading-relaxed">
                Frontend tarafında React.js, Tailwind CSS ve GSAP gibi modern
                teknolojileri kullanarak kullanıcılarla etkileşimde kusursuz
                deneyimler oluşturuyorum. Backend tarafında ise PHP, Node.js ve
                MySQL gibi güçlü altyapılarla sağlam ve güvenilir sistemler
                geliştiriyorum.
              </p>
              <p className="text-gray-600 line leading-relaxed">
                Geliştirdiğim projelerde her zaman şuna dikkat ederim: Bir
                kullanıcı, sayfaya geldiğinde nereye bakmalı, ne hissetmeli ve
                ne kadar kolay etkileşim kurmalı? Bu yüzden kullanıcı arayüzü
                tasarımında sadece güzel görünmesi değil, kullanılabilirliği
                yüksek çözümler üretmeyi önceliklendiriyorum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactSectionRef}
        className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col lg:flex-row items-center justify-center relative overflow-hidden p-4 md:p-8 lg:p-12"
      >
        <div className="hidden lg:flex w-full lg:w-1/2 h-1/2 lg:h-full items-center justify-center relative z-10 p-4 lg:p-0">
          <div
            ref={svgContainer}
            className="w-64 h-64 flex items-center justify-center relative group"
          >
            {Icons[currentIconIndex] && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
                <div className="relative z-10 drop-shadow-lg">
                  {Icons[currentIconIndex].svg}
                </div>
                {/* <div className="flex whitespace-nowrap flex-col items-center justify-start gap-4">
                  <h2 className="text-2xl md:text-3xl font-light text-gray-800">
                    {Icons[currentIconIndex].title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {Icons[currentIconIndex].text}
                  </p>
                </div> */}
              </>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-0 md:p-4 lg:p-12 contact-content">
          <div className="w-full space-y-6 md:space-y-8 bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-xl border border-gray-100">
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800">
                İletişime Geçin
              </h2>
              <div className="w-12 h-px bg-indigo-500"></div>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Projeleriniz, iş birliği teklifleri veya sadece bir merhaba demek
              için benimle iletişime geçebilirsiniz.
            </p>
            <div className="space-y-3 md:space-y-4">
              <input
                type="text"
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200 placeholder-gray-400"
                placeholder="Ad Soyad"
              />
              <input
                type="email"
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200 placeholder-gray-400"
                placeholder="Email"
              />
              <textarea
                rows={4}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200 resize-none placeholder-gray-400"
                placeholder="Mesajınız..."
              />
              <button className="w-full bg-gray-800 text-white py-2 md:py-2.5 px-4 text-sm md:text-base rounded-md hover:bg-gray-700 transition-colors duration-200 shadow-md">
                Mesaj Gönder
              </button>
            </div>
            <div className="pt-4 md:pt-6 border-t border-gray-200">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <a
                  href="mailto:batuhan@example.com"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all duration-300 text-xs md:text-sm group social-link"
                >
                  <div className="p-1.5 md:p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-all duration-300">
                    <MdEmail
                      size={16}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                    Email
                  </span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-all duration-300 text-xs md:text-sm group social-link"
                >
                  <div className="p-1.5 md:p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-all duration-300">
                    <FaLinkedin
                      size={16}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-300 text-xs md:text-sm group social-link"
                >
                  <div className="p-1.5 md:p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-all duration-300">
                    <FaGithub
                      size={16}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                    GitHub
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
