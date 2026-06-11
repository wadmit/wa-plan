import Link from "next/link";
import { ArrowRight, Map, BookOpen } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  return (
    <div
      className="relative overflow-hidden border-b px-4 py-20 sm:px-6 lg:px-8"
      style={{
        backgroundColor: '#0B0F1A',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(79, 110, 247, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-5xl text-center">
        {/* Confidential badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            borderColor: 'rgba(79, 110, 247, 0.4)',
            backgroundColor: 'rgba(79, 110, 247, 0.15)',
            color: '#8892B0',
          }}
        >
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          Internal — Confidential
        </div>

        {/* Title */}
        <h1
          className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          style={{ color: 'var(--color-text-primary)' }}
        >
          WiseAdmit{" "}
          <span style={{ color: 'var(--color-accent)' }}>HQ</span>
        </h1>

        {/* Dual audience subtitle */}
        <p
          className="mx-auto mb-8 max-w-3xl text-lg"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Product operations hub for the WiseAdmit platform
        </p>

        {/* Two ways to read this site */}
        <div className="mx-auto mb-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          <div
            className="rounded-lg border p-4 text-left"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <p className="mb-2 font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              For Business Team
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              See what's shipping, when, and what has been deliberately left out.
            </p>
          </div>
          <div
            className="rounded-lg border p-4 text-left"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <p className="mb-2 font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              For Engineering
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Jump to module maps, technical liabilities, enhancement queues, and phase dependencies.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={ROUTES.ROADMAP}
            className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:shadow-xl"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#0B0F1A',
            }}
          >
            <Map className="h-4 w-4" />
            View 90-Day Roadmap
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={ROUTES.KB}
            className="flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-all"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
            }}
          >
            <BookOpen className="h-4 w-4" />
            Explore Knowledge Base
          </Link>
        </div>
      </div>
    </div>
  );
}
