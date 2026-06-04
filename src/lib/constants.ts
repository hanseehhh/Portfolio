import type { NavLink, Project, Skill, SocialLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/hanseehhh" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:your@email.com" },
];

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Project One",
    description: "Short description of what this project does and what problem it solves.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
    repo: "https://github.com/hanseehhh",
    featured: true,
  },
  {
    id: "project-2",
    title: "Project Two",
    description: "Short description of what this project does and what problem it solves.",
    tech: ["React", "Node.js", "PostgreSQL"],
    href: "#",
    repo: "https://github.com/hanseehhh",
    featured: true,
  },
  {
    id: "project-3",
    title: "Project Three",
    description: "Short description of what this project does and what problem it solves.",
    tech: ["Python", "FastAPI", "Docker"],
    href: "#",
    repo: "https://github.com/hanseehhh",
  },
];

export const SKILLS: Skill[] = [
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Figma", category: "tools" },
];
