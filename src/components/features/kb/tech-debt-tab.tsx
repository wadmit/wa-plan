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
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-wrap gap-3 text-xs">
          {(["critical", "high", "medium", "low"] as TechDebtSeverity[]).map((s) => {
            const count = site.techDebt.filter((d) => d.severity === s).length;
            return count > 0 ? (
              <span key={s} className="flex items-center gap-1.5">
                <Badge variant={s}>{s}</Badge>
                <span className="text-slate-500">{count}</span>
              </span>
            ) : null;
          })}
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/50">
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 w-20">
              Severity
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Issue
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {sorted.map((debt, i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <td className="px-6 py-4">
                <Badge variant={debt.severity}>{debt.severity}</Badge>
              </td>
              <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{debt.issue}</td>
              <td className="px-6 py-4 hidden md:table-cell">
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
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
