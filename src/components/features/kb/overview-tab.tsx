import { ExternalLink, Server, Layout, Package } from "lucide-react";
import type { Site } from "@/types/site";

interface OverviewTabProps {
  readonly site: Site;
}

export function OverviewTab({ site }: OverviewTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Project Overview Card */}
      <div
        className="rounded-lg border p-5"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <h3
          className="mb-4 flex items-center gap-2 text-base font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          <Server className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
          Project Overview
        </h3>
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Purpose
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{site.purpose}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Live URL
            </p>
            <a
              href={`https://${site.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--accent-primary)' }}
            >
              {site.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Framework
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{site.framework}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Architecture
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{site.architecture}</p>
          </div>
        </div>
      </div>

      {/* Tech Stack Card */}
      <div
        className="rounded-lg border p-5"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <h3
          className="mb-4 flex items-center gap-2 text-base font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          <Package className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {site.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border px-3 py-1.5 text-xs font-medium"
              style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Stats Card */}
      <div
        className="rounded-lg border p-5 lg:col-span-2"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <h3
          className="mb-4 flex items-center gap-2 text-base font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          <Layout className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
          Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Modules", value: site.moduleCount },
            { label: "Features Done", value: site.featuresExisting.length },
            { label: "Features Incomplete", value: site.featuresIncomplete.length },
            { label: "Tech Debt Items", value: site.techDebtCount },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-4 text-center"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
