"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SITES } from "@/data/sites";
import { ROUTES } from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/features/kb/overview-tab";
import { ModulesTab } from "@/components/features/kb/modules-tab";
import { FeaturesTab } from "@/components/features/kb/features-tab";
import { TechDebtTab } from "@/components/features/kb/tech-debt-tab";
import { RiskAreasTab } from "@/components/features/kb/risk-areas-tab";
import { EnhancementTab } from "@/components/features/kb/enhancement-tab";
import type { SiteStatus } from "@/types/site";

function statusVariant(s: SiteStatus): "success" | "default" | "medium" | "outline" {
  if (s === "Mature" || s === "Active") return "success";
  if (s === "Partially Mocked") return "medium";
  if (s === "Early Stage") return "outline";
  return "default";
}

interface PageProps {
  readonly params: Promise<{ site: string }>;
}

export default function KbSitePage({ params }: PageProps) {
  const { site: siteId } = use(params);
  const site = SITES.find((s) => s.id === siteId);

  if (!site) {
    notFound();
  }

  const criticalCount = site.techDebt.filter((d) => d.severity === "critical").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href={ROUTES.KB}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Knowledge Base
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{site.name}</h1>
              <Badge variant={statusVariant(site.status)}>{site.status}</Badge>
              {criticalCount > 0 && (
                <Badge variant="critical">{criticalCount} critical</Badge>
              )}
            </div>
            <a
              href={`https://${site.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {site.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              {site.framework}
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              {site.moduleCount} modules
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <div className="overflow-x-auto">
          <TabsList className="mb-6 min-w-max">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="tech-debt">
              Tech Debt
              {criticalCount > 0 && (
                <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white">
                  {criticalCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="risks">Risk Areas</TabsTrigger>
            <TabsTrigger value="enhancement">Enhancement</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <OverviewTab site={site} />
        </TabsContent>

        <TabsContent value="modules">
          <ModulesTab site={site} />
        </TabsContent>

        <TabsContent value="features">
          <FeaturesTab site={site} />
        </TabsContent>

        <TabsContent value="tech-debt">
          <TechDebtTab site={site} />
        </TabsContent>

        <TabsContent value="risks">
          <RiskAreasTab site={site} />
        </TabsContent>

        <TabsContent value="enhancement">
          <EnhancementTab site={site} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
