import React from "react";
import Timeline from "../../../Components/Timeline";

const index = () => {
  const timelineData = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Company",
      location: "İstanbul, Turkey",
      date: "2023 - Present",
      description:
        "Led the development of multiple high-impact web applications using React and Next.js. Implemented modern UI/UX designs and improved performance metrics.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      location: "Remote",
      date: "2021 - 2023",
      description:
        "Developed responsive web applications and maintained existing client projects. Collaborated with design team to implement pixel-perfect interfaces.",
      skills: ["React", "JavaScript", "SASS", "Redux"],
    },
    {
      title: "Junior Developer",
      company: "Startup",
      location: "Ankara, Turkey",
      date: "2020 - 2021",
      description:
        "Started career as a junior developer working on various web projects. Gained experience in modern web technologies and best practices.",
      skills: ["HTML", "CSS", "JavaScript", "jQuery"],
    },
    {
      title: "Senior Frontend Developer",
      company: "Tech Company",
      location: "İstanbul, Turkey",
      date: "2023 - Present",
      description:
        "Led the development of multiple high-impact web applications using React and Next.js. Implemented modern UI/UX designs and improved performance metrics.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      location: "Remote",
      date: "2021 - 2023",
      description:
        "Developed responsive web applications and maintained existing client projects. Collaborated with design team to implement pixel-perfect interfaces.",
      skills: ["React", "JavaScript", "SASS", "Redux"],
    },
    {
      title: "Junior Developer",
      company: "Startup",
      location: "Ankara, Turkey",
      date: "2020 - 2021",
      description:
        "Started career as a junior developer working on various web projects. Gained experience in modern web technologies and best practices.",
      skills: ["HTML", "CSS", "JavaScript", "jQuery"],
    },
  ];

  return (
    <section className="w-full flex items-center justify-center">
      <Timeline data={timelineData} />
    </section>
  );
};

export default index;