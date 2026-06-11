import { Zap, Wrench } from "lucide-react";
import type { Site } from "@/types/site";

interface EnhancementTabProps {
  readonly site: Site;
}

export function EnhancementTab({ site }: EnhancementTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Ready for Enhancement */}
      <div
        className="rounded-lg border p-5"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <h3
          className="mb-4 flex items-center gap-2 text-base font-semibold"
          style={{ color: 'var(--status-success)' }}
        >
          <Zap className="h-5 w-5" />
          Ready for Enhancement ({site.enhancementReady.length})
        </h3>
        <ul className="space-y-2">
          {site.enhancementReady.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-lg border px-3 py-2 text-sm"
              style={{
                borderColor: 'var(--border-default)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
              }}
            >
              <Zap
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: 'var(--status-success)' }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Refactor First */}
      <div
        className="rounded-lg border p-5"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <h3
          className="mb-4 flex items-center gap-2 text-base font-semibold"
          style={{ color: 'var(--status-warning)' }}
        >
          <Wrench className="h-5 w-5" />
          Refactor First ({site.needsRefactorFirst.length})
        </h3>
        <p className="mb-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          These modules must be refactored before building new features on top of them.
        </p>
        <ul className="space-y-2">
          {site.needsRefactorFirst.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-lg border px-3 py-2 text-sm"
              style={{
                borderColor: 'var(--border-default)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
              }}
            >
              <Wrench
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: 'var(--status-warning)' }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
