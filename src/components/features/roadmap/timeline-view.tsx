import { CheckCircle2 } from "lucide-react";
import { PHASES } from "@/data/roadmap";
import { cn } from "@/lib/utils";

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  indigo: {
    border: "border-indigo-200 dark:border-indigo-800",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    text: "text-indigo-700 dark:text-indigo-300",
    dot: "bg-indigo-600",
  },
  blue: {
    border: "border-blue-200 dark:border-blue-800",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-600",
  },
  cyan: {
    border: "border-cyan-200 dark:border-cyan-800",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    text: "text-cyan-700 dark:text-cyan-300",
    dot: "bg-cyan-600",
  },
  violet: {
    border: "border-violet-200 dark:border-violet-800",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    text: "text-violet-700 dark:text-violet-300",
    dot: "bg-violet-600",
  },
  purple: {
    border: "border-purple-200 dark:border-purple-800",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-300",
    dot: "bg-purple-600",
  },
  rose: {
    border: "border-rose-200 dark:border-rose-800",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-600",
  },
};

export function TimelineView() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200 dark:bg-slate-700 lg:hidden" />
      <div className="grid gap-0 lg:grid-cols-6 lg:gap-4">
        {PHASES.map((phase, index) => {
          const colors = COLOR_MAP[phase.color] ?? COLOR_MAP.indigo;
          return (
            <div key={phase.id} className="relative flex gap-4 lg:flex-col lg:gap-0">
              <div className="relative z-10 flex flex-col items-center lg:items-start">
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white", colors.dot)}>
                  {index + 1}
                </div>
                <div className="mt-1 h-full w-0.5 bg-slate-200 dark:bg-slate-700 lg:hidden" />
              </div>
              <div className={cn("mb-8 flex-1 rounded-xl border p-4 lg:mb-0 lg:mt-4", colors.border, colors.bg)}>
                <p className={cn("text-xs font-semibold uppercase tracking-wider", colors.text)}>{phase.days}</p>
                <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-slate-100">{phase.label}</h3>
                <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">{phase.focus}</p>
                <ul className="space-y-1.5">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
