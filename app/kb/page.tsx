import { BookOpen } from "lucide-react";
import { SITES } from "@/data/sites";
import { SiteCard } from "@/components/features/kb/site-card";

export default function KbIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Knowledge Base</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Technical intelligence reports for all {SITES.length} WiseAdmit sites. Module maps, feature
            inventories, tech debt, risk areas, and enhancement readiness.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{SITES.length}</span> sites
        </div>
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {SITES.reduce((s, site) => s + site.moduleCount, 0)}
          </span>{" "}
          total modules
        </div>
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-red-600 dark:text-red-400">
            {SITES.reduce((s, site) => s + site.techDebt.filter((d) => d.severity === "critical").length, 0)}
          </span>{" "}
          critical issues
        </div>
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {SITES.reduce((s, site) => s + site.enhancementReady.length, 0)}
          </span>{" "}
          modules ready to enhance
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SITES.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </div>
  );
}
