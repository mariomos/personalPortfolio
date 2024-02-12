import React from "react";
import { CgCode, CgWorkAlt } from "react-icons/cg";
import { FaBriefcase, FaCog, FaHome } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import { BsInfoCircleFill, BsPencilFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import tractor from "@/public/tractor.jpg";
import hoses from "@/public/hoses.jpg";
import property from "@/public/property.jpg";

export const links = [
  {
    name: "Home",
    hash: "#home",
    icon: React.createElement(FaHome),
  },
  {
    name: "About",
    hash: "#about",
    icon: React.createElement(BsInfoCircleFill),
  },
  {
    name: "Projects",
    hash: "#projects",
    icon: React.createElement(BsPencilFill),
  },
  {
    name: "Skills",
    hash: "#skills",
    icon: React.createElement(FaCog),
  },
  {
    name: "Experience",
    hash: "#experience",
    icon: React.createElement(FaBriefcase),
  },
  {
    name: "Contact",
    hash: "#contact",
    icon: React.createElement(HiMail),
  },
] as const;

export const experiencesData = [
  {
    title: "Certificates",
    location: "Online",
    company: 'Various Institutions',
    description:
    ['Frontend Developer(Meta)', 'UX Design(Google)', 'Developer Associate(AWS)', 'Solutions Architect Associate(AWS)', 'Cloud Practitioner(AWS)', 'Azure Fundamentals(Microsoft Azure)', 'Azure AI Fundamentals(Microsoft Azure)', 'Azure Data Fundamentals(Microsoft Azure)', ],
    icon: React.createElement(LuGraduationCap),
    date: "Consistency is key",
  },
  {
    title: "Web Developer",
    location: "Remote",
    company: 'Achuzi',
    description:
    ['Led a UI optimization project, resulting in a 30% increase in user engagement and a 25% improvement in page load times.', 'Developed interactive dashboards, enabling clients to visualize their data and make informed decisions.', 'Implemented cross-browser compatibility enhancements, reducing user complaints by 40%.' ],
    icon: React.createElement(CgCode),
    date: "Jan 2020 - March 2022",
  },
  {
    title: "Front-End Developer",
    location: "Remote",
    company: 'Dotslash Digital',
    description:
      ['Assisted in the development of a new e-commerce site, contributing to a 15% increase in online sales.', 'Improved site accessibility, achieving a WCAG AA compliance level and enhancing the user experience for all visitors.', 'Implemented responsive design techniques, leading to a 40% boost in mobile user satisfaction.' ],
    icon: React.createElement(CgWorkAlt),
    date: "Apr 2022 - Present",
  }
] as const;


export const projectsData = [
  {
    title: "Balwin",
    description:
      "Blah blah blah",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: property,
  },
  {
    title: "Agrimag",
    description:
      "Blah blah blah",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: tractor,
  },
  {
    title: "Pirtek",
    description:
      "Blah blah blah",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: hoses,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  // "Prisma",
  "MongoDB",
  // "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "Django",
  "Deno",
  "Fresh",
  "Vue",
  "Framer Motion",
] as const;