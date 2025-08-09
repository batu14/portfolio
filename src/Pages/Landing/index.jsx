import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./Hero";
import ProjectsSection from "./Projects";
import SkillsSection from "./Skills";
import TimelineSection from "./TimeLine";
import ContactSection from "./Contact";

const Index = () => {
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
      className="w-full flex items-start justify-start h-auto flex-col bg-white"
    >
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <TimelineSection />
      <ContactSection />
    </motion.div>
  );
};

export default Index;