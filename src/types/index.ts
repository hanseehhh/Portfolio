export interface Project {
  /** URL segment for the detail page: /projects/<slug> */
  slug: string;
  title: string;
  /** One or two lines, shown on the card. */
  description: string;
  tech: string[];
  /** Card thumbnail. Falls back to the first gallery image. */
  image?: string;
  /** Screenshots shown on the detail page. */
  gallery?: string[];
  featured?: boolean;

  // Detail page content — all optional so a project can start as a stub.
  year?: string;
  role?: string;
  /** Longer write-up; each string is a paragraph. */
  overview?: string[];
  features?: string[];
  /** External links shown on the detail page. */
  href?: string;
  repo?: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools";
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
