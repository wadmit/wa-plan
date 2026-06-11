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
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-800/50 dark:bg-orange-950/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-orange-800 dark:text-orange-300">
          <ShieldAlert className="h-4 w-4" />
          High-coupling regression risk areas — touch carefully. Changes here affect many dependents.
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 w-24">
                Risk
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Area
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sorted.map((risk, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="px-6 py-4">
                  <Badge variant={riskVariant(risk.level)}>{risk.level}</Badge>
                </td>
                <td className="px-6 py-4">
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {risk.area}
                  </code>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{risk.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
