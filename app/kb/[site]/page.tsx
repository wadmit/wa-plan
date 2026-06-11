"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import { ArrowLeft, ExternalLink, Briefcase, Code } from "lucide-react";
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
import { ForBusinessTab } from "@/components/features/kb/for-business-tab";
import type { SiteStatus } from "@/types/site";

function statusVariant(s: SiteStatus): "success" | "default" | "medium" | "outline" {
  if (s === "Mature" || s === "Active") return "success";
  if (s === "In Progress — Backend Incomplete") return "medium";
  if (s === "Early Stage") return "outline";
  return "default";
}

interface PageProps {
  readonly params: Promise<{ site: string }>;
}

export default function KbSitePage({ params }: PageProps) {
  const { site: siteId } = use(params);
  const site = SITES.find((s) => s.id === siteId);
  const [audienceView, setAudienceView] = useState<"business" | "engineering">("engineering");

  // Check for query param audience preference
  useEffect(() => {
    const url = new URL(window.location.href);
    const audience = url.searchParams.get("audience");
    if (audience === "business" || audience === "engineering") {
      setAudienceView(audience);
    }
  }, []);

  if (!site) {
    notFound();
  }

  const criticalCount = site.techDebt.filter((d) => d.severity === "critical").length;

  return (
    <div
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href={ROUTES.KB}
          className="mb-4 inline-flex items-center gap-1.5 text-sm hover:underline"
          style={{ color: 'var(--color-text-dim)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Knowledge Base
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {site.name}
              </h1>
              <Badge variant={statusVariant(site.status)}>{site.status}</Badge>
              {criticalCount > 0 && (
                <Badge variant="critical">{criticalCount} critical</Badge>
              )}
            </div>
            <a
              href={`https://${site.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--color-text-dim)' }}
            >
              {site.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Audience Toggle */}
          <div
            className="flex rounded-lg border p-1"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <button
              onClick={() => setAudienceView("business")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                backgroundColor: audienceView === "business" ? 'var(--color-accent)' : 'transparent',
                color: audienceView === "business" ? '#0B0F1A' : 'var(--color-text-secondary)',
              }}
            >
              <Briefcase className="h-3.5 w-3.5" />
              Business View
            </button>
            <button
              onClick={() => setAudienceView("engineering")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                backgroundColor: audienceView === "engineering" ? 'var(--color-accent)' : 'transparent',
                color: audienceView === "engineering" ? '#0B0F1A' : 'var(--color-text-secondary)',
              }}
            >
              <Code className="h-3.5 w-3.5" />
              Engineering
            </button>
          </div>
        </div>
      </div>

      {/* Description for Business View */}
      {audienceView === "business" && site.plainEnglishPurpose && (
        <div
          className="mb-6 rounded-lg border p-4"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <p className="text-sm italic" style={{ color: 'var(--color-text-secondary)' }}>
            {site.plainEnglishPurpose}
          </p>
        </div>
      )}

      {/* Tech Stack Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span
          className="rounded-lg border px-3 py-1.5 text-xs font-medium"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
        >
          {site.framework}
        </span>
        <span
          className="rounded-lg border px-3 py-1.5 text-xs font-medium"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
        >
          {site.moduleCount} modules
        </span>
        {site.techStack.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-lg border px-3 py-1.5 text-xs font-medium"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-dim)' }}
          >
            {t.split(" ")[0]}
          </span>
        ))}
        {site.techStack.length > 3 && (
          <span
            className="rounded-lg border px-3 py-1.5 text-xs font-medium"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-dim)' }}
          >
            +{site.techStack.length - 3}
          </span>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue={audienceView === "business" ? "for-business" : "overview"}>
        <div className="overflow-x-auto">
          <TabsList className="mb-6 min-w-max">
            {audienceView === "business" && (
              <TabsTrigger value="for-business">For Business</TabsTrigger>
            )}
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="tech-debt">
              Tech Debt
              {criticalCount > 0 && (
                <span
                  className="ml-1.5 rounded-full px-1.5 py-0.5 text-xs font-bold"
                  style={{ backgroundColor: 'var(--color-danger)', color: 'white' }}
                >
                  {criticalCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="risks">Risk Areas</TabsTrigger>
            <TabsTrigger value="enhancement">Enhancement</TabsTrigger>
          </TabsList>
        </div>

        {audienceView === "business" && (
          <TabsContent value="for-business">
            <ForBusinessTab site={site} />
          </TabsContent>
        )}

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
