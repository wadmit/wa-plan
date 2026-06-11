import type { Site } from "@/types/site";

interface ModulesTabProps {
  readonly site: Site;
}

export function ModulesTab({ site }: ModulesTabProps) {
  return (
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
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Module
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Purpose
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Key Dependencies
            </th>
          </tr>
        </thead>
        <tbody style={{ borderColor: 'var(--border-default)' }}>
          {site.modules.map((mod, index) => (
            <tr
              key={mod.name}
              className="border-b last:border-b-0"
              style={{
                borderColor: 'var(--border-default)',
                backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
              }}
            >
              <td className="px-6 py-4">
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {mod.name}
                </span>
              </td>
              <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>
                {mod.purpose}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {mod.keyDeps.map((dep) => (
                    <span
                      key={dep}
                      className="rounded px-2 py-0.5 text-xs"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                        border: `1px solid var(--border-default)`,
                      }}
                    >
                      {dep}
                    </span>
                  ))}
                  {mod.keyDeps.length === 0 && (
                    <span style={{ color: 'var(--text-muted)' }}>—</span>
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
