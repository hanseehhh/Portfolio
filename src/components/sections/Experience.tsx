import { ScrollReveal } from "@/components/ui";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

const EXPERIENCES = [
  {
    year: "2021 - 2024",
    title: "Tarumanagara University",
    subtitle: "Technology Informatics Faculty",
    detail: "GPA: 3.8/4.0",
  },
  {
    year: "2024 - Recent",
    title: "Yayasan Tarumanagara",
    subtitle: "Front-End Developer Intern",
    detail: "1 year",
  },
];

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
          <div className="flex justify-between px-4 pb-4">
            {EXPERIENCES.map(({ year, title, subtitle, detail }, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className={i === 1 ? "text-right" : "text-left"}>
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
                    {detail}
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
            <div className="relative flex w-full justify-between px-4">
              {EXPERIENCES.map((_, i) => (
                <div
                  key={i}
                  className="relative z-10 h-4 w-4 rounded-full border-2 border-zinc-700 bg-zinc-700"
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
