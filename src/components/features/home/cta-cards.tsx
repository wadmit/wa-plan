import Link from "next/link";
import { Map, BookOpen, ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const BUSINESS_FEATURES = [
  "What is being built and why",
  "What risks exist and how they are mitigated",
  "What is intentionally out of scope",
  "Current priorities and timeline",
] as const;

const ENGINEERING_FEATURES = [
  "Module maps and technical stacks",
  "Known technical liabilities",
  "Phase dependencies and readiness",
  "API and data contract status",
] as const;

export function CtaCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Business Team Card */}
      <Link
        href={ROUTES.ROADMAP}
        className="group relative overflow-hidden rounded-lg border p-6 transition-all hover:opacity-90"
        style={{
          borderColor: 'var(--color-border)',
          borderLeftWidth: '2px',
          borderLeftColor: 'var(--color-accent-warm)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--color-accent-warm)', opacity: 0.9 }}>
          <Map className="h-5 w-5" style={{ color: '#0B0F1A' }} />
        </div>
        <h2 className="mb-2 text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Business Team
        </h2>
        <p className="mb-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          You need: what is being built, in what order, why it matters, what risks exist, and which
          features have intentionally been left out of scope.
        </p>
        <ul className="mb-6 space-y-2">
          {BUSINESS_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <Check className="h-4 w-4 shrink-0" style={{ color: 'var(--color-success)' }} />
              {feature}
            </li>
          ))}
        </ul>
        <span
          className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
          style={{ color: 'var(--color-accent)' }}
        >
          Start with the Roadmap <ArrowRight className="h-4 w-4" />
        </span>
      </Link>

      {/* Engineering Team Card */}
      <Link
        href={ROUTES.KB}
        className="group relative overflow-hidden rounded-lg border p-6 transition-all hover:opacity-90"
        style={{
          borderColor: 'var(--color-border)',
          borderLeftWidth: '2px',
          borderLeftColor: 'var(--color-accent)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--color-accent)' }}>
          <BookOpen className="h-5 w-5" style={{ color: '#0B0F1A' }} />
        </div>
        <h2 className="mb-2 text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Engineering Team
        </h2>
        <p className="mb-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          You need: module maps, tech stack, technical liabilities, enhancement readiness, phase
          dependencies, and API/data contract status per site.
        </p>
        <ul className="mb-6 space-y-2">
          {ENGINEERING_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <Check className="h-4 w-4 shrink-0" style={{ color: 'var(--color-success)' }} />
              {feature}
            </li>
          ))}
        </ul>
        <span
          className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
          style={{ color: 'var(--color-accent)' }}
        >
          Start with the Knowledge Base <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}
