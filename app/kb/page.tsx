import { BookOpen, AlertTriangle, ChevronDown } from "lucide-react";
import { SITES } from "@/data/sites";
import { SiteCard } from "@/components/features/kb/site-card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { DocsLayout } from "@/components/common/docs-layout";

export default function KbIndexPage() {
  const totalCritical = SITES.reduce((s, site) => s + site.techDebt.filter((d) => d.severity === "critical").length, 0);
  const sitesWithCritical = SITES.filter((s) => s.techDebt.some((d) => d.severity === "critical"));

  return (
    <DocsLayout>
      {/* Header - Blue accent bar */}
      <div className="mb-6 pb-4 border-b-2" style={{ borderColor: '#002252' }}>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="rounded px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: '#002252', color: 'white' }}
          >
            Documentation
          </span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#EE701E', color: 'white' }}>
            {SITES.length} Sites
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#002252' }}>
          Knowledge Base
        </h1>
        <p className="mt-2 text-lg" style={{ color: '#495057' }}>
          Technical documentation for all WiseAdmit sites
        </p>
      </div>

      {/* Critical Issues Callout - Red tinted */}
      {totalCritical > 0 && (
        <div
          className="mb-6 rounded-lg border-l-4 p-4"
          style={{
            borderColor: '#dc3545',
            backgroundColor: 'rgba(220, 53, 69, 0.08)',
          }}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" style={{ color: '#dc3545' }} />
            <p style={{ color: '#002252' }}>
              <strong style={{ color: '#dc3545' }}>{totalCritical} critical issues</strong>{" "}
              <span style={{ color: '#495057' }}>
                flagged across the system
              </span>
            </p>
          </div>
          <p className="mt-2 text-sm" style={{ color: '#495057' }}>
            Affected:{" "}
            {sitesWithCritical.map((s, i) => (
              <span key={s.id}>
                <a
                  href={`/kb/${s.id}`}
                  className="hover:underline font-medium"
                  style={{ color: '#EE701E' }}
                >
                  {s.name}
                </a>
                {i < sitesWithCritical.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Status Legend - With color badges */}
      <div
        className="mb-6 rounded-lg border p-4"
        style={{ borderColor: '#dee2e6', backgroundColor: '#f8f9fa' }}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6c757d' }}>
          Status Key
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)' }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#28a745' }} />
            <span style={{ color: '#495057' }}>Active</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(238, 112, 30, 0.1)' }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#EE701E' }} />
            <span style={{ color: '#495057' }}>In Progress</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(0, 34, 82, 0.1)' }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#002252' }} />
            <span style={{ color: '#495057' }}>Mature</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#dc3545' }} />
            <span style={{ color: '#495057' }}>Early Stage</span>
          </div>
        </div>
      </div>

      {/* How to Read Accordion */}
      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="how-to-read" style={{ borderColor: 'var(--border-default)' }}>
          <AccordionTrigger className="text-sm hover:no-underline text-[var(--text-secondary)]">
            <span className="flex items-center gap-2">
              What do these reports tell me?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Each report shows what a site can do today, what is broken or incomplete, and what is ready
              to improve next. <strong style={{ color: 'var(--text-primary)' }}>Business users</strong> should read the Issues, Risks, and
              Enhancement sections first. <strong style={{ color: 'var(--text-primary)' }}>Developers</strong> can use the Modules, Features,
              and Known Technical Liabilities sections for implementation planning.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Stats Summary - Color coded stats */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border p-3 text-center" style={{ borderColor: '#dee2e6', backgroundColor: '#f8f9fa' }}>
          <p className="text-2xl font-bold" style={{ color: '#002252' }}>{SITES.length}</p>
          <p className="text-xs" style={{ color: '#6c757d' }}>Sites</p>
        </div>
        <div className="rounded-lg border p-3 text-center" style={{ borderColor: '#dee2e6', backgroundColor: '#f8f9fa' }}>
          <p className="text-2xl font-bold" style={{ color: '#002252' }}>
            {SITES.reduce((s, site) => s + site.moduleCount, 0)}
          </p>
          <p className="text-xs" style={{ color: '#6c757d' }}>Modules</p>
        </div>
        <div className="rounded-lg border p-3 text-center" style={{ borderColor: totalCritical > 0 ? '#dc3545' : '#dee2e6', backgroundColor: totalCritical > 0 ? 'rgba(220, 53, 69, 0.05)' : '#f8f9fa' }}>
          <p className="text-2xl font-bold" style={{ color: totalCritical > 0 ? '#dc3545' : '#28a745' }}>{totalCritical}</p>
          <p className="text-xs" style={{ color: '#6c757d' }}>Critical Issues</p>
        </div>
        <div className="rounded-lg border p-3 text-center" style={{ borderColor: '#28a745', backgroundColor: 'rgba(40, 167, 69, 0.05)' }}>
          <p className="text-2xl font-bold" style={{ color: '#28a745' }}>
            {SITES.reduce((s, site) => s + site.enhancementReady.length, 0)}
          </p>
          <p className="text-xs" style={{ color: '#6c757d' }}>Ready to Enhance</p>
        </div>
      </div>

      {/* Site Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SITES.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </DocsLayout>
  );
}
