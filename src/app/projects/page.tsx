import Link from "next/link";
import { ProjectCard } from "@/components/sections/Projects";
import { PROJECTS } from "@/lib/constants";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-4 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-zinc-900"
            style={{ fontFamily: HELVETICA }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </Link>

          <p className="mt-6 mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400" style={{ fontFamily: HELVETICA }}>
            All Work
          </p>
          <h1 className="text-4xl font-black text-zinc-900 sm:text-5xl" style={{ fontFamily: HELVETICA }}>
            All <span className="text-zinc-400">Projects</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-500" style={{ fontFamily: HELVETICA }}>
            {PROJECTS.length} projects
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}