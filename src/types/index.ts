export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  href?: string;
  repo?: string;
  image?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  level?: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
