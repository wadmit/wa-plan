import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import type { Site, SiteStatus } from "@/types/site";

function statusVariant(s: SiteStatus): "success" | "default" | "medium" | "outline" {
  if (s === "Mature" || s === "Active") return "success";
  if (s === "In Progress — Backend Incomplete") return "medium";
  if (s === "Early Stage") return "outline";
  return "default";
}

function criticalCount(site: Site): number {
  return site.techDebt.filter((d) => d.severity === "critical").length;
}

interface SiteCardProps {
  readonly site: Site;
}

export function SiteCard({ site }: SiteCardProps) {
  const critical = criticalCount(site);
  return (
    <Link href={ROUTES.KB_SITE(site.id)} className="group block">
      <div
        className="h-full rounded-lg border p-5 transition-all hover:border-[var(--accent-primary)]"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="flex h-full flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <Layers className="h-5 w-5" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <Badge variant={statusVariant(site.status)}>{site.status}</Badge>
          </div>

          {/* Name & URL */}
          <div>
            <h3
              className="font-semibold transition-colors group-hover:text-[var(--accent-primary)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {site.name}
            </h3>
            <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              {site.url}
            </p>
          </div>

          {/* Purpose */}
          <p
            className="flex-1 text-xs leading-relaxed line-clamp-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            {site.purpose}
          </p>

          {/* Tech Stack */}
          <div className="space-y-2">
            <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {site.framework}
            </p>
            <div className="flex flex-wrap gap-1">
              {site.techStack.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded px-2 py-0.5 text-xs"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t.split(" ")[0]}
                </span>
              ))}
              {site.techStack.length > 3 && (
                <span
                  className="rounded px-2 py-0.5 text-xs"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
                >
                  +{site.techStack.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Footer Stats */}
          <div
            className="flex items-center justify-between border-t pt-3"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                <Layers className="h-3 w-3" />
                {site.moduleCount} modules
              </span>
              <span
                className="flex items-center gap-1"
                style={{ color: critical > 0 ? 'var(--status-danger)' : 'var(--text-muted)' }}
              >
                <AlertTriangle className="h-3 w-3" />
                {site.techDebtCount} issues
              </span>
              <span className="flex items-center gap-1" style={{ color: 'var(--status-success)' }}>
                <CheckCircle className="h-3 w-3" />
                {site.enhancementReady.length} ready
              </span>
            </div>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              style={{ color: 'var(--text-muted)' }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
