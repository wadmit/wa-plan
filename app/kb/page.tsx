import { BookOpen, AlertTriangle, ChevronDown } from "lucide-react";
import { SITES } from "@/data/sites";
import { SiteCard } from "@/components/features/kb/site-card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function KbIndexPage() {
  const totalCritical = SITES.reduce((s, site) => s + site.techDebt.filter((d) => d.severity === "critical").length, 0);
  const sitesWithCritical = SITES.filter((s) => s.techDebt.some((d) => d.severity === "critical"));

  return (
    <div
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Header */}
      <div className="mb-8 flex items-start gap-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <BookOpen className="h-5 w-5" style={{ color: '#0B0F1A' }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Knowledge Base
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Technical intelligence reports for all {SITES.length} WiseAdmit sites. Module maps, feature
            inventories, tech debt, risk areas, and enhancement readiness.
          </p>
        </div>
      </div>

      {/* Critical Issues Callout */}
      {totalCritical > 0 && (
        <div
          className="mb-6 rounded-lg border-l-4 p-4"
          style={{
            borderColor: 'var(--color-danger)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" style={{ color: 'var(--color-danger)' }} />
            <p style={{ color: 'var(--color-text-primary)' }}>
              <strong>{totalCritical} critical issues</strong>{" "}
              <span style={{ color: 'var(--color-text-secondary)' }}>
                flagged across the system
              </span>
            </p>
          </div>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Affected:{" "}
            {sitesWithCritical.map((s, i) => (
              <span key={s.id}>
                <a
                  href={`/kb/${s.id}`}
                  className="hover:underline"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {s.name}
                </a>
                {i < sitesWithCritical.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Status Legend */}
      <div
        className="mb-6 rounded-lg border p-4"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
          Status Key
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>Active — live, in production</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-warm)' }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>In Progress — Backend Incomplete — UI exists, backend incomplete</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#3B82F6' }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>Mature — stable, low churn</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--color-danger)' }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>Early Stage — scaffolded, not production-ready</span>
          </div>
        </div>
      </div>

      {/* How to Read Accordion */}
      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="how-to-read" style={{ borderColor: 'var(--color-border)' }}>
          <AccordionTrigger className="text-sm hover:no-underline text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-2">
              What do these reports tell me?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Each report shows what a site can do today, what is broken or incomplete, and what is ready
              to improve next. <strong style={{ color: 'var(--color-text-primary)' }}>Business users</strong> should read the Issues, Risks, and
              Enhancement sections first. <strong style={{ color: 'var(--color-text-primary)' }}>Developers</strong> can use the Modules, Features,
              and Known Technical Liabilities sections for implementation planning.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Stats Summary */}
      <div
        className="mb-6 flex flex-wrap gap-4 rounded-lg border p-4"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{SITES.length}</span> sites
        </div>
        <div className="h-5 w-px" style={{ backgroundColor: 'var(--color-border)' }} />
        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {SITES.reduce((s, site) => s + site.moduleCount, 0)}
          </span>{" "}
          total modules
        </div>
        <div className="h-5 w-px" style={{ backgroundColor: 'var(--color-border)' }} />
        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--color-danger)' }}>
            {totalCritical}
          </span>{" "}
          critical issues
        </div>
        <div className="h-5 w-px" style={{ backgroundColor: 'var(--color-border)' }} />
        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--color-success)' }}>
            {SITES.reduce((s, site) => s + site.enhancementReady.length, 0)}
          </span>{" "}
          modules ready to enhance
        </div>
      </div>

      {/* Site Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SITES.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </div>
  );
}
