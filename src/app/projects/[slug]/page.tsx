import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/constants";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

// Every project is known at build time, so each detail page is prerendered.
export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} — Hans Thobie Sachio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { title, description, tech, gallery, year, role, overview, features, href, repo } =
    project;

  const meta = [
    year && { label: "Year", value: year },
    role && { label: "Role", value: role },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <main className="min-h-screen px-4 py-24 sm:px-8 lg:px-16" style={{ fontFamily: HELVETICA }}>
      <div className="mx-auto w-full max-w-[1400px]">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-zinc-900"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All Projects
        </Link>

        {/* Header */}
        <header className="mt-10 border-b border-zinc-200 pb-10">
          <h1 className="text-4xl font-black text-zinc-900 sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          {/* Write-up */}
          <div className="order-2 lg:order-1">
            {overview && overview.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Overview
                </h2>
                <div className="mt-5 flex flex-col gap-4">
                  {overview.map((paragraph, i) => (
                    <p key={i} className="text-base leading-relaxed text-zinc-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {features && features.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Features
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-base leading-relaxed text-zinc-600">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Meta + links */}
          <aside className="order-1 flex flex-col gap-8 lg:order-2">
            {meta.length > 0 && (
              <dl className="flex flex-col gap-5">
                {meta.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-base text-zinc-900">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {(href || repo) && (
              <div className="flex flex-col gap-2">
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-white"
                  >
                    Live Site
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                )}
                {repo && (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-white"
                  >
                    Repository
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* Screenshots */}
        {gallery && gallery.length > 0 && (
          <section className="mt-20">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Screens
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[9/19.5] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50"
                >
                  <Image
                    src={src}
                    alt={`${title} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
