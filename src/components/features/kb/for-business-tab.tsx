import { CheckCircle2, AlertTriangle, ArrowUpRight, Info } from "lucide-react";
import type { Site } from "@/types/site";

interface ForBusinessTabProps {
  readonly site: Site;
}

export function ForBusinessTab({ site }: ForBusinessTabProps) {
  const criticalCount = site.techDebt.filter((d) => d.severity === "critical").length;
  const highCount = site.techDebt.filter((d) => d.severity === "high").length;

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div
        className="rounded-lg border p-5"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <h3 className="mb-3 text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          What This Site Does
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {site.plainEnglishPurpose ?? site.purpose}
        </p>
        {site.businessOwner && (
          <p className="mt-3 text-sm" style={{ color: 'var(--color-text-dim)' }}>
            <strong>Business Owner:</strong>{" "}
            <span style={{ color: 'var(--color-text-secondary)' }}>{site.businessOwner}</span>
          </p>
        )}
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div
          className="rounded-lg border p-4 text-center"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <p className="text-2xl font-bold" style={{ color: criticalCount > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
            {criticalCount}
          </p>
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
            Critical Issues
          </p>
        </div>
        <div
          className="rounded-lg border p-4 text-center"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <p className="text-2xl font-bold" style={{ color: highCount > 0 ? 'var(--color-accent-warm)' : 'var(--color-success)' }}>
            {highCount}
          </p>
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
            High Priority Issues
          </p>
        </div>
        <div
          className="rounded-lg border p-4 text-center"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
            {site.enhancementReady.length}
          </p>
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
            Ready to Enhance
          </p>
        </div>
      </div>

      {/* Risk Summary */}
      {site.riskAreas.length > 0 && (
        <div
          className="rounded-lg border-l-4 p-4"
          style={{
            borderColor: site.riskAreas.some((r) => r.level === "critical") ? 'var(--color-danger)' : 'var(--color-accent-warm)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle
              className="h-5 w-5"
              style={{ color: site.riskAreas.some((r) => r.level === "critical") ? 'var(--color-danger)' : 'var(--color-accent-warm)' }}
            />
            <h4 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Risk Summary
            </h4>
          </div>
          <ul className="space-y-2">
            {site.riskAreas.slice(0, 3).map((risk, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      risk.level === "critical"
                        ? 'var(--color-danger)'
                        : risk.level === "high"
                          ? 'var(--color-accent-warm)'
                          : 'var(--color-text-dim)',
                  }}
                />
                <span>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{risk.area}:</strong>{" "}
                  {risk.risk}
                </span>
              </li>
            ))}
            {site.riskAreas.length > 3 && (
              <li className="text-sm italic" style={{ color: 'var(--color-text-dim)' }}>
                + {site.riskAreas.length - 3} more risk areas
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Enhancement Opportunities */}
      {site.enhancementReady.length > 0 && (
        <div
          className="rounded-lg border p-5"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <ArrowUpRight className="h-5 w-5" style={{ color: 'var(--color-success)' }} />
            <h4 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Enhancement Opportunities
            </h4>
          </div>
          <p className="mb-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            The following modules are ready for enhancement:
          </p>
          <ul className="space-y-2">
            {site.enhancementReady.slice(0, 5).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--color-success)' }} />
                {item}
              </li>
            ))}
            {site.enhancementReady.length > 5 && (
              <li className="text-sm italic" style={{ color: 'var(--color-text-dim)' }}>
                + {site.enhancementReady.length - 5} more items
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Technical Debt Warning */}
      {site.needsRefactorFirst.length > 0 && (
        <div
          className="rounded-lg border-l-4 p-4"
          style={{
            borderColor: 'var(--color-accent-warm)',
            backgroundColor: 'rgba(245, 166, 35, 0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-5 w-5" style={{ color: 'var(--color-accent-warm)' }} />
            <h4 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Requires Refactoring First
            </h4>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            These areas need technical cleanup before new features can be added:
          </p>
          <ul className="mt-2 space-y-1">
            {site.needsRefactorFirst.map((item, i) => (
              <li key={i} className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                • {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Roadmap Connection */}
      {site.primaryAffectedPhases && site.primaryAffectedPhases.length > 0 && (
        <div
          className="rounded-lg border p-4"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Affected Roadmap Phases
          </h4>
          <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            Work on this site impacts the following roadmap phases:
          </p>
          <div className="flex flex-wrap gap-2">
            {site.primaryAffectedPhases.map((phase, i) => (
              <span
                key={i}
                className="rounded px-2 py-1 text-xs font-medium"
                style={{
                  backgroundColor: 'rgba(79, 110, 247, 0.15)',
                  color: 'var(--color-accent)',
                }}
              >
                {phase}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
