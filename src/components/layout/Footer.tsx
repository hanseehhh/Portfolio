import { SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-zinc-400">
          © {year} hans.dev — built with Next.js &amp; framer-motion
        </p>

        <ul className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 uppercase tracking-widest transition-colors hover:text-zinc-900"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
