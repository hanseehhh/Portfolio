import type { NavLink, Project, Skill, SocialLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/hanseehhh" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:your@email.com" },
];

export const PROJECTS: Project[] = [
  {
    slug: "untarx",
    title: "UntarX Application",
    description:
      "Short description of what this project does and what problem it solves.",
    tech: ["Flutter", "Dart"],
    image: "/portfolio/untarx/screen-1.png",
    gallery: [
      "/portfolio/untarx/screen-1.png",
      "/portfolio/untarx/screen-2.png",
      "/portfolio/untarx/screen-3.png",
      "/portfolio/untarx/screen-4.png",
      "/portfolio/untarx/screen-5.png",
      "/portfolio/untarx/screen-6.png",
      "/portfolio/untarx/screen-7.png",
      "/portfolio/untarx/pixel-7a.png",
    ],
    featured: true,
    year: "2026",
    role: "App Developer",
    overview: [
      "Tulis di sini penjelasan panjang tentang UntarX Application — latar belakang, masalah yang diselesaikan, dan bagaimana aplikasinya bekerja.",
    ],
    features: [],
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((project) => project.slug === slug);

export const SKILLS: Skill[] = [
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "ReactBits", category: "frontend" },
  { name: "Dart", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Next.js", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "PHP", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Figma", category: "tools" },
];
