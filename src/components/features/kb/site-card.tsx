import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { Site, SiteStatus } from "@/types/site";

function statusVariant(s: SiteStatus): "success" | "default" | "medium" | "outline" {
  if (s === "Mature" || s === "Active") return "success";
  if (s === "Partially Mocked") return "medium";
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
      <Card className="h-full transition-all hover:border-indigo-300 hover:shadow-md dark:hover:border-indigo-700">
        <CardContent className="flex h-full flex-col gap-4 pt-6">
          <div className="flex items-start justify-between gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/40">
              <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <Badge variant={statusVariant(site.status)}>{site.status}</Badge>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-400">
              {site.name}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{site.url}</p>
          </div>

          <p className="flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3">
            {site.purpose}
          </p>

          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{site.framework}</p>
            <div className="flex flex-wrap gap-1">
              {site.techStack.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                >
                  {t.split(" ")[0]}
                </span>
              ))}
              {site.techStack.length > 3 && (
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800">
                  +{site.techStack.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1 text-slate-500">
                <Layers className="h-3 w-3" />
                {site.moduleCount} modules
              </span>
              <span
                className={cn(
                  "flex items-center gap-1",
                  critical > 0 ? "text-red-600 dark:text-red-400" : "text-slate-500",
                )}
              >
                <AlertTriangle className="h-3 w-3" />
                {site.techDebtCount} issues
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-3 w-3" />
                {site.enhancementReady.length} ready
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
