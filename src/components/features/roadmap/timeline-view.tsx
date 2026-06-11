import { CheckCircle2, AlertCircle, Target, Users, Link2, TrendingUp, Shield } from "lucide-react";
import { PHASES } from "@/data/roadmap";
import { Badge } from "@/components/ui/badge";

interface TimelineViewProps {
  readonly audienceView?: "business" | "engineering" | "full";
}

const COLOR_MAP: Record<string, { border: string; accent: string; bg: string }> = {
  indigo: { border: "#4F6EF7", accent: "#4F6EF7", bg: "rgba(79, 110, 247, 0.08)" },
  blue: { border: "#3B82F6", accent: "#3B82F6", bg: "rgba(59, 130, 246, 0.08)" },
  cyan: { border: "#06B6D4", accent: "#06B6D4", bg: "rgba(6, 182, 212, 0.08)" },
  violet: { border: "#8B5CF6", accent: "#8B5CF6", bg: "rgba(139, 92, 246, 0.08)" },
  purple: { border: "#A855F7", accent: "#A855F7", bg: "rgba(168, 85, 247, 0.08)" },
  rose: { border: "#F43F5E", accent: "#F43F5E", bg: "rgba(244, 63, 94, 0.08)" },
};

const STATUS_CONFIG = {
  current: { badge: "Current", variant: "accent" as const },
  upcoming: { badge: "Upcoming", variant: "outline" as const },
  complete: { badge: "Complete", variant: "success" as const },
  "at-risk": { badge: "At Risk", variant: "warning" as const },
};

export function TimelineView({ audienceView = "full" }: TimelineViewProps) {
  return (
    <div className="space-y-6">
      {PHASES.map((phase, index) => {
        const colors = COLOR_MAP[phase.color] ?? COLOR_MAP.indigo;
        const status = STATUS_CONFIG[phase.status];

        return (
          <div
            key={phase.id}
            className="rounded-lg border p-5"
            style={{
              borderColor: colors.border,
              borderLeftWidth: "3px",
              backgroundColor: colors.bg,
            }}
          >
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: colors.accent, color: '#0B0F1A' }}
                >
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 style={{ color: 'var(--color-text-primary)' }} className="font-bold">
                      {phase.label}
                    </h3>
                    <Badge variant={status.variant}>{status.badge}</Badge>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {phase.days} · {phase.focus}
                  </p>
                </div>
              </div>
            </div>

            {/* Why it exists - always shown */}
            <div className="mb-4 rounded-md p-3" style={{ backgroundColor: 'var(--color-surface)' }}>
              <p className="text-sm italic" style={{ color: 'var(--color-text-secondary)' }}>
                {phase.whyItExists}
              </p>
            </div>

            {/* Business View Content */}
            {(audienceView === "business" || audienceView === "full") && (
              <div className="mb-4">
                <div className="mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" style={{ color: 'var(--color-accent-warm)' }} />
                  <h4 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    Business Objective
                  </h4>
                </div>
                <p className="mb-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {phase.businessObjective}
                </p>

                {phase.keyOutcomes.length > 0 && (
                  <div className="mb-3">
                    <h5 className="mb-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
                      Key Outcomes
                    </h5>
                    <ul className="space-y-1">
                      {phase.keyOutcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-success)' }} />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {phase.successMetrics.length > 0 && (
                  <div className="mb-3">
                    <h5 className="mb-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
                      Success Metrics
                    </h5>
                    <ul className="space-y-1">
                      {phase.successMetrics.map((metric) => (
                        <li key={metric} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-accent)' }} />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {phase.risks.length > 0 && (
                  <div>
                    <h5 className="mb-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
                      Risks
                    </h5>
                    <ul className="space-y-1">
                      {phase.risks.map((risk) => (
                        <li key={risk} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-accent-warm)' }} />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Engineering View Content */}
            {(audienceView === "engineering" || audienceView === "full") && (
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                  <h4 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    Technical Details
                  </h4>
                </div>

                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs" style={{ color: 'var(--color-text-dim)' }}>Owner:</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{phase.ownerTeam}</span>
                </div>

                {phase.dependencies.length > 0 && (
                  <div className="mb-3">
                    <h5 className="mb-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
                      <Link2 className="h-3 w-3" />
                      Dependencies
                    </h5>
                    <ul className="space-y-1">
                      {phase.dependencies.map((dep) => (
                        <li key={dep} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          {dep}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-3">
                  <h5 className="mb-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
                    Deliverables
                  </h5>
                  <ul className="space-y-1">
                    {phase.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-accent)' }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {phase.acceptanceCriteria.length > 0 && (
                  <div>
                    <h5 className="mb-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
                      Acceptance Criteria
                    </h5>
                    <ul className="space-y-1">
                      {phase.acceptanceCriteria.map((criteria) => (
                        <li key={criteria} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-success)' }} />
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
