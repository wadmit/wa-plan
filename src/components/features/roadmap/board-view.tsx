import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PHASES, PROBLEM_AREAS } from "@/data/roadmap";

const PHASE_DAY_LABELS = PHASES.map((p) => p.days);

export function BoardView() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {PHASES.map((phase) => {
        const phaseProblems = PROBLEM_AREAS.filter((p) => p.phase === phase.days);
        return (
          <div key={phase.id} className="flex flex-col gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{phase.days}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{phase.focus}</p>
              <p className="text-xs text-slate-500">{phaseProblems.length} item{phaseProblems.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="space-y-2">
              {phaseProblems.map((problem) => (
                <Card key={problem.id} className="border-slate-200 shadow-none dark:border-slate-700">
                  <CardHeader className="pb-2 pt-4">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-slate-400">#{problem.id}</span>
                      <Badge
                        variant={
                          problem.priority === "critical"
                            ? "critical"
                            : problem.priority === "high"
                              ? "high"
                              : problem.priority === "medium"
                                ? "medium"
                                : "low"
                        }
                      >
                        {problem.priority}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm leading-snug">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">{problem.summary}</p>
                    {problem.doFirst && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                        ⚡ Do First
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
              {phase.deliverables.filter((d) => !phaseProblems.some((p) => p.keyActions.includes(d))).map((d) => (
                <div key={d} className="rounded-lg border border-dashed border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-600 dark:text-slate-400">{d}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
