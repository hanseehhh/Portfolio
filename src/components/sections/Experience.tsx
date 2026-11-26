import { ScrollReveal } from "@/components/ui";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

const EXPERIENCES: {
  year: string;
  title: string;
  subtitle: string;
  duration: string;
  detail?: string;
}[] = [
  {
    year: "2023 - 2026",
    title: "Tarumanagara University",
    subtitle: "Technology Informatics Faculty",
    duration: "3 years",
    detail: "GPA: 3.8/4.0",
  },
  {
    year: "2024 - Recent",
    title: "Vistora",
    subtitle: "Head Team Developer",
    duration: "2 years",
  },
  {
    year: "2025 - 2027",
    title: "Yayasan Tarumanagara",
    subtitle: "Front-End Developer",
    duration: "2 years",
  },
  {
    year: "2026 - Recent",
    title: "MTM Healthcare",
    subtitle: "App Developer",
    duration: "1 year",
  },
];

// Full literal class names: Tailwind only picks up strings it can see in source.
const EDGE_ALIGN = {
  first: { dot: "justify-start", text: "text-left" },
  last: { dot: "justify-end", text: "text-right" },
  middle: { dot: "justify-center", text: "text-center" },
} as const;

const alignFor = (i: number, total: number) =>
  i === 0 ? EDGE_ALIGN.first : i === total - 1 ? EDGE_ALIGN.last : EDGE_ALIGN.middle;

export function Experience() {
  return (
    <section id="experience" className="px-8 py-16 sm:px-16">
      <ScrollReveal>
        {/* Label */}
        <p
          className="mb-12 text-xs font-semibold uppercase tracking-widest text-zinc-400"
          style={{ fontFamily: HELVETICA }}
        >
          Experience
        </p>

        {/* Timeline — centered, fixed width */}
        <div className="mx-auto w-full max-w-2xl">
          {/* Text above the line */}
          <div className="flex gap-4 px-4 pb-4">
            {EXPERIENCES.map(({ year, title, subtitle, duration, detail }, i) => (
              <ScrollReveal key={i} delay={i * 0.15} className="flex-1">
                <div className={alignFor(i, EXPERIENCES.length).text}>
                  <p
                    className="text-xs text-zinc-400"
                    style={{ fontFamily: HELVETICA }}
                  >
                    {year}
                  </p>
                  <p
                    className="text-base font-bold text-zinc-900"
                    style={{ fontFamily: HELVETICA }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-sm text-zinc-500"
                    style={{ fontFamily: HELVETICA }}
                  >
                    {subtitle}
                  </p>
                  <p
                    className="text-xs text-zinc-400"
                    style={{ fontFamily: HELVETICA }}
                  >
                    {duration}
                    {detail && ` · ${detail}`}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Line with dots */}
          <div className="relative flex items-center">
            {/* Full line */}
            <div className="absolute left-0 right-0 h-px bg-zinc-300" />

            {/* Dots */}
            <div className="relative flex w-full px-4">
              {EXPERIENCES.map((_, i) => (
                <div
                  key={i}
                  className={`flex flex-1 ${alignFor(i, EXPERIENCES.length).dot}`}
                >
                  <div className="relative z-10 h-4 w-4 rounded-full border-2 border-zinc-700 bg-zinc-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
