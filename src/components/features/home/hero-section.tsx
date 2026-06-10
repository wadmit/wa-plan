import Link from "next/link";
import { ArrowRight, Map, BookOpen } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 bg-linear-to-br from-indigo-900 via-indigo-800 to-violet-900 px-4 py-20 text-white dark:border-slate-700 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.3),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-200">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
          Internal — Confidential
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          WiseAdmit <span className="text-indigo-300">HQ</span>
        </h1>
        <p className="mx-auto mb-3 max-w-2xl text-xl text-indigo-100">
          What we're building next — and where everything stands today.
        </p>
        <p className="mx-auto mb-10 max-w-2xl text-base text-indigo-200/80">
          A single source of truth for the business team and engineering. Browse the 90-day roadmap
          or dive into technical intelligence reports for all 8 WiseAdmit sites.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={ROUTES.ROADMAP}
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-900 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
          >
            <Map className="h-4 w-4" />
            View 90-Day Roadmap
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={ROUTES.KB}
            className="flex items-center gap-2 rounded-xl border border-indigo-400/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <BookOpen className="h-4 w-4" />
            Explore Knowledge Base
          </Link>
        </div>
      </div>
    </div>
  );
}
