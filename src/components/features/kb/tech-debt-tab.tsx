import { Badge } from "@/components/ui/badge";
import type { Site, TechDebtSeverity } from "@/types/site";

function severityOrder(s: TechDebtSeverity): number {
  return { critical: 0, high: 1, medium: 2, low: 3 }[s];
}

interface TechDebtTabProps {
  readonly site: Site;
}

export function TechDebtTab({ site }: TechDebtTabProps) {
  const sorted = [...site.techDebt].sort(
    (a, b) => severityOrder(a.severity) - severityOrder(b.severity),
  );

  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
    >
      <div
        className="border-b px-6 py-3"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-tertiary)' }}
      >
        <div className="flex flex-wrap gap-3 text-xs">
          {(["critical", "high", "medium", "low"] as TechDebtSeverity[]).map((s) => {
            const count = site.techDebt.filter((d) => d.severity === s).length;
            return count > 0 ? (
              <span key={s} className="flex items-center gap-1.5">
                <Badge variant={s}>{s}</Badge>
                <span style={{ color: 'var(--text-muted)' }}>{count}</span>
              </span>
            ) : null;
          })}
        </div>
      </div>
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
              Severity
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Issue
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell"
              style={{ color: 'var(--text-muted)' }}
            >
              Location
            </th>
          </tr>
        </thead>
        <tbody style={{ borderColor: 'var(--border-default)' }}>
          {sorted.map((debt, index) => (
            <tr
              key={index}
              className="border-b last:border-b-0"
              style={{
                borderColor: 'var(--border-default)',
                backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
              }}
            >
              <td className="px-6 py-4">
                <Badge variant={debt.severity}>{debt.severity}</Badge>
              </td>
              <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>
                {debt.issue}
              </td>
              <td className="px-6 py-4 hidden md:table-cell">
                <code
                  className="rounded px-1.5 py-0.5 text-xs"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {debt.location}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
