import { ScrollReveal, AnimatedText } from "@/components/ui";

export function About() {
  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal direction="up">
          <p className="mb-4 font-mono text-xs tracking-[0.3em] text-zinc-500 uppercase">
            01. About
          </p>
        </ScrollReveal>

        <div className="grid gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                <AnimatedText text="A bit about me" variant="word" />
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base leading-relaxed text-zinc-400">
                I&apos;m a developer based in Indonesia, passionate about crafting digital
                experiences that combine clean code with thoughtful design. I focus on
                performance, accessibility, and the tiny details that make products feel great.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-base leading-relaxed text-zinc-400">
                When I&apos;m not building things, you&apos;ll find me exploring new tech,
                contributing to open source, or obsessing over typography.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} direction="left">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10">
              {[
                { label: "Projects shipped", value: "10+" },
                { label: "Years of experience", value: "2+" },
                { label: "Technologies", value: "15+" },
                { label: "Cups of coffee", value: "∞" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]"
                >
                  <span className="text-2xl font-bold text-white">{value}</span>
                  <span className="text-xs text-zinc-500">{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
