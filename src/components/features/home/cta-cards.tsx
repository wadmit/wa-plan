import Link from "next/link";
import { Map, BookOpen, ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const ROADMAP_HIGHLIGHTS = [
  "6 delivery phases over 90 days",
  "13 prioritised problem areas",
  "Timeline, board, and list views",
  "Critical guardrails clearly marked",
] as const;

const KB_HIGHLIGHTS = [
  "8 site intelligence reports",
  "Tech stacks, modules, features",
  "Tech debt and risk areas rated",
  "Enhancement readiness per site",
] as const;

export function CtaCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Link
        href={ROUTES.ROADMAP}
        className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50 to-violet-50 p-8 transition-all hover:border-indigo-300 hover:shadow-lg dark:border-indigo-900/50 dark:from-indigo-950/50 dark:to-violet-950/50"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-md">
          <Map className="h-6 w-6 text-white" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100">90-Day Roadmap</h2>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          The strategic plan derived from our problem statement. Three views for business and
          engineering audiences.
        </p>
        <ul className="mb-6 space-y-2">
          {ROADMAP_HIGHLIGHTS.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle className="h-4 w-4 shrink-0 text-indigo-500" />
              {h}
            </li>
          ))}
        </ul>
        <span className="flex items-center gap-1 text-sm font-semibold text-indigo-700 group-hover:gap-2 dark:text-indigo-400">
          View Roadmap <ArrowRight className="h-4 w-4 transition-all" />
        </span>
      </Link>

      <Link
        href={ROUTES.KB}
        className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50 to-cyan-50 p-8 transition-all hover:border-emerald-300 hover:shadow-lg dark:border-emerald-900/50 dark:from-emerald-950/50 dark:to-cyan-950/50"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-md">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100">Knowledge Base</h2>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          Deep technical intelligence on every site in the WiseAdmit ecosystem. Module maps,
          issues, and enhancement readiness.
        </p>
        <ul className="mb-6 space-y-2">
          {KB_HIGHLIGHTS.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
              {h}
            </li>
          ))}
        </ul>
        <span className="flex items-center gap-1 text-sm font-semibold text-emerald-700 group-hover:gap-2 dark:text-emerald-400">
          Browse Sites <ChevronRight className="h-4 w-4 transition-all" />
        </span>
      </Link>
    </div>
  );
}
