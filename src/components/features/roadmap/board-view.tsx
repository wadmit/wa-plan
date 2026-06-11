import { Badge } from "@/components/ui/badge";
import { PHASES, PROBLEM_AREAS } from "@/data/roadmap";

interface BoardViewProps {
  readonly audienceView?: "business" | "engineering" | "full";
}

const COLOR_MAP: Record<string, string> = {
  indigo: "#4F6EF7",
  blue: "#3B82F6",
  cyan: "#06B6D4",
  violet: "#8B5CF6",
  purple: "#A855F7",
  rose: "#F43F5E",
};

export function BoardView({ audienceView = "full" }: BoardViewProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {PHASES.map((phase) => {
        const phaseProblems = PROBLEM_AREAS.filter((p) => p.phase === phase.days);
        const accentColor = COLOR_MAP[phase.color] ?? COLOR_MAP.indigo;

        // Filter content based on audience view
        const showDeliverables = audienceView === "engineering" || audienceView === "full";
        const showBusinessContent = audienceView === "business" || audienceView === "full";

        return (
          <div key={phase.id} className="flex flex-col gap-3">
            {/* Column Header */}
            <div
              className="rounded-lg border px-3 py-2"
              style={{
                borderColor: accentColor,
                borderLeftWidth: "3px",
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <p className="text-xs font-semibold" style={{ color: 'var(--color-text-dim)' }}>
                {phase.days}
              </p>
              <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {phase.focus}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-dim)' }}>
                {phaseProblems.length} item{phaseProblems.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {phaseProblems.map((problem) => (
                <div
                  key={problem.id}
                  className="rounded-lg border p-3"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--color-text-dim)' }}>#{problem.id}</span>
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
                  <h4 className="mb-2 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {problem.title}
                  </h4>
                  {showBusinessContent && (
                    <p className="text-xs line-clamp-3" style={{ color: 'var(--color-text-secondary)' }}>
                      {problem.summary}
                    </p>
                  )}
                  {problem.doFirst && (
                    <span
                      className="mt-2 inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: 'rgba(79, 110, 247, 0.2)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      ⚡ Do First
                    </span>
                  )}
                </div>
              ))}

              {showDeliverables && phase.deliverables
                .filter((d) => !phaseProblems.some((p) => p.keyActions.includes(d)))
                .map((d) => (
                  <div
                    key={d}
                    className="rounded-lg border border-dashed p-3"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      opacity: 0.7,
                    }}
                  >
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{d}</p>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
