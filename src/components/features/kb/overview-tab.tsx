import { ExternalLink, Server, Layout, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Site } from "@/types/site";

interface OverviewTabProps {
  readonly site: Site;
}

export function OverviewTab({ site }: OverviewTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Server className="h-4 w-4 text-indigo-500" />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Purpose</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">{site.purpose}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Live URL</p>
            <a
              href={`https://${site.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {site.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Framework</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">{site.framework}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Architecture</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">{site.architecture}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4 text-indigo-500" />
            Tech Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {site.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layout className="h-4 w-4 text-indigo-500" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Modules", value: site.moduleCount, color: "text-indigo-600 dark:text-indigo-400" },
              { label: "Features Done", value: site.featuresExisting.length, color: "text-emerald-600 dark:text-emerald-400" },
              { label: "Features Incomplete", value: site.featuresIncomplete.length, color: "text-orange-600 dark:text-orange-400" },
              { label: "Tech Debt Items", value: site.techDebtCount, color: "text-red-600 dark:text-red-400" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-800/50">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
