import type { Site } from "@/types/site";

interface ModulesTabProps {
  readonly site: Site;
}

export function ModulesTab({ site }: ModulesTabProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Module
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Purpose
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Key Dependencies
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {site.modules.map((mod) => (
            <tr key={mod.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="px-6 py-4">
                <span className="font-medium text-slate-900 dark:text-slate-100">{mod.name}</span>
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{mod.purpose}</td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {mod.keyDeps.map((dep) => (
                    <span
                      key={dep}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    >
                      {dep}
                    </span>
                  ))}
                  {mod.keyDeps.length === 0 && (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
