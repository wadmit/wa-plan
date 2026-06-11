import { DocsLayout } from "@/components/common/docs-layout";
import Link from "next/link";
import { Map, BookOpen, ArrowRight, Layers, Clock, Shield } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { SITES } from "@/data/sites";
import { PHASES } from "@/data/roadmap";

export default function Home() {
  const totalModules = SITES.reduce((sum, site) => sum + site.moduleCount, 0);
  const totalTechDebt = SITES.reduce((sum, site) => sum + site.techDebtCount, 0);

  return (
    <DocsLayout>
      <div className="space-y-10">
        {/* Hero */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Shield className="h-4 w-4" />
            <span>Internal Documentation</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            WiseAdmit HQ
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
            Product documentation and technical roadmap for the WiseAdmit platform.
            Engineering specifications, 90-day development plan, and system architecture.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value={SITES.length.toString()} label="Sites" />
          <StatCard value={totalModules.toString()} label="Modules" />
          <StatCard value={PHASES.length.toString()} label="Phases" labelDetail="90 days" />
          <StatCard value={totalTechDebt.toString()} label="Tech Debt Items" />
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Quick Access
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <QuickLinkCard
              href={ROUTES.ROADMAP}
              icon={Map}
              title="Development Roadmap"
              description="90-day implementation plan with 6 phases from foundation to platform hardening."
            />
            <QuickLinkCard
              href={ROUTES.KB}
              icon={BookOpen}
              title="Technical Documentation"
              description="Site specifications, module maps, tech debt, and risk areas for all 8 sites."
            />
          </div>
        </div>

        {/* Current Phase */}
        <div
          className="rounded-lg border p-6"
          style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Clock className="h-4 w-4" />
            <span>Current Phase</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Phase 1: Foundation
          </h3>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
            Day 1–15 · Role-based access control and lead ownership foundation
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className="rounded px-2 py-1 text-xs"
              style={{ backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)' }}
            >
              In Progress
            </span>
            <span
              className="rounded px-2 py-1 text-xs"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
            >
              6 deliverables
            </span>
            <span
              className="rounded px-2 py-1 text-xs"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
            >
              Platform Engineering
            </span>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

function StatCard({ value, label, labelDetail }: { value: string; label: string; labelDetail?: string }) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>
        {value}
      </div>
      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {label}
        {labelDetail && (
          <span style={{ color: 'var(--text-muted)' }}> · {labelDetail}</span>
        )}
      </div>
    </div>
  );
}

function QuickLinkCard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-lg border p-5 transition-colors hover:border-[var(--accent-primary)]"
      style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-secondary)' }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <Icon className="h-5 w-5" style={{ color: 'var(--accent-primary)' }} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h3>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            style={{ color: 'var(--text-muted)' }}
          />
        </div>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>
    </Link>
  );
}
