import { CheckCircle2, AlertCircle } from "lucide-react";
import type { Site } from "@/types/site";

interface FeaturesTabProps {
  readonly site: Site;
}

export function FeaturesTab({ site }: FeaturesTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Implemented Features */}
      <div
        className="rounded-lg border p-5"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <h3
          className="mb-4 flex items-center gap-2 text-base font-semibold"
          style={{ color: 'var(--status-success)' }}
        >
          <CheckCircle2 className="h-5 w-5" />
          Implemented ({site.featuresExisting.length})
        </h3>
        <ul className="space-y-2">
          {site.featuresExisting.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: 'var(--status-success)' }}
              />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Incomplete Features */}
      <div
        className="rounded-lg border p-5"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <h3
          className="mb-4 flex items-center gap-2 text-base font-semibold"
          style={{ color: 'var(--status-warning)' }}
        >
          <AlertCircle className="h-5 w-5" />
          Incomplete / Partial ({site.featuresIncomplete.length})
        </h3>
        {site.featuresIncomplete.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No incomplete features recorded.
          </p>
        ) : (
          <ul className="space-y-2">
            {site.featuresIncomplete.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: 'var(--status-warning)' }}
                />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
