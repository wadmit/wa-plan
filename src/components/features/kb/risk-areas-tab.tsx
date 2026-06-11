import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Site } from "@/types/site";

function riskVariant(level: "critical" | "high" | "medium" | "low"): "critical" | "high" | "medium" | "low" {
  return level;
}

interface RiskAreasTabProps {
  readonly site: Site;
}

export function RiskAreasTab({ site }: RiskAreasTabProps) {
  const sorted = [...site.riskAreas].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.level] - order[b.level];
  });

  return (
    <div className="space-y-4">
      {/* Warning Banner */}
      <div
        className="rounded-lg border-l-4 p-4"
        style={{
          borderColor: 'var(--status-warning)',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: 'var(--status-warning)' }}
        >
          <ShieldAlert className="h-4 w-4" />
          High-coupling regression risk areas — touch carefully. Changes here affect many dependents.
        </div>
      </div>

      {/* Risk Table */}
      <div
        className="overflow-hidden rounded-lg border"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b"
              style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-tertiary)' }}
            >
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider w-24"
                style={{ color: 'var(--text-muted)' }}
              >
                Risk
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Area
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Reason
              </th>
            </tr>
          </thead>
          <tbody style={{ borderColor: 'var(--border-default)' }}>
            {sorted.map((risk, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0"
                style={{
                  borderColor: 'var(--border-default)',
                  backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                }}
              >
                <td className="px-6 py-4">
                  <Badge variant={riskVariant(risk.level)}>{risk.level}</Badge>
                </td>
                <td className="px-6 py-4">
                  <code
                    className="rounded px-1.5 py-0.5 text-xs"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {risk.area}
                  </code>
                </td>
                <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>
                  {risk.risk}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
