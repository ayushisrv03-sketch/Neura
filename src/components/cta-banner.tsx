import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export function CtaBanner() {
  return (
    <section id="accessibility" className="px-4 pb-16 sm:px-16 lg:px-32">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 px-6 py-16 text-center shadow-2xl sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-16 size-64 rounded-full bg-white/20 blur-2xl"
        />

        <p className="relative font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
          Welcome to a Calmer World
        </p>
        <h2 className="relative mx-auto mt-4 max-w-xl font-heading text-3xl font-semibold text-white drop-shadow-sm sm:text-4xl">
          Ready for learning that feels natural?
        </h2>
        <p className="relative mx-auto mt-4 max-w-md font-body text-lg text-white/95">
          Experience an environment that honors how your mind absorbs the
          world. No pressure, no judgment, just clarity.
        </p>

        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#start"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-heading text-base font-semibold text-slate-900 shadow-lg transition-transform hover:scale-[1.02]"
          >
            Start Free Exploration
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#sample-lesson"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-sky-950/40 px-8 py-3.5 font-heading text-base font-semibold text-white backdrop-blur-sm transition-transform hover:scale-[1.02]"
          >
            <BookOpen className="size-4" />
            Explore Sample Lesson
          </Link>
        </div>

        <p className="relative mt-6 font-heading text-xs font-medium text-white/85">
          Free forever for self-guided learners • No credit card required
        </p>
      </div>
    </section>
  );
}
