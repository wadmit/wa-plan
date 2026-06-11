"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TimelineView } from "@/components/features/roadmap/timeline-view";
import { BoardView } from "@/components/features/roadmap/board-view";
import { ListView } from "@/components/features/roadmap/list-view";
import { GuardrailsBanner } from "@/components/features/roadmap/guardrails-banner";
import { Map, LayoutGrid, List, Briefcase, Code, Eye } from "lucide-react";

type AudienceView = "business" | "engineering" | "full";

export default function RoadmapPage() {
  const [audienceView, setAudienceView] = useState<AudienceView>("full");

  // Calculate progress (assume 90 days from start)
  const progressPercent = 15; // Hardcoded for now

  return (
    <div
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Progress Indicator */}
      <div className="mb-6">
        <div
          className="h-1 w-full rounded-full"
          style={{ backgroundColor: 'var(--color-border)' }}
        >
          <div
            className="h-1 rounded-full transition-all"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: 'var(--color-accent)',
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs" style={{ color: 'var(--color-text-dim)' }}>
          <span>90-Day Roadmap Progress</span>
          <span>{progressPercent}% Complete</span>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <Map className="h-5 w-5" style={{ color: '#0B0F1A' }} />
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                90-Day Roadmap
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                17 problem areas · 6 delivery phases · structure, ownership, discipline
              </p>
            </div>
          </div>

          {/* Audience View Toggle */}
          <div
            className="flex rounded-lg border p-1"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <button
              onClick={() => setAudienceView("business")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all"
              style={{
                backgroundColor: audienceView === "business" ? 'var(--color-accent)' : 'transparent',
                color: audienceView === "business" ? '#0B0F1A' : 'var(--color-text-secondary)',
              }}
            >
              <Briefcase className="h-4 w-4" />
              Business
            </button>
            <button
              onClick={() => setAudienceView("engineering")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all"
              style={{
                backgroundColor: audienceView === "engineering" ? 'var(--color-accent)' : 'transparent',
                color: audienceView === "engineering" ? '#0B0F1A' : 'var(--color-text-secondary)',
              }}
            >
              <Code className="h-4 w-4" />
              Engineering
            </button>
            <button
              onClick={() => setAudienceView("full")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all"
              style={{
                backgroundColor: audienceView === "full" ? 'var(--color-accent)' : 'transparent',
                color: audienceView === "full" ? '#0B0F1A' : 'var(--color-text-secondary)',
              }}
            >
              <Eye className="h-4 w-4" />
              Full
            </button>
          </div>
        </div>

        <p className="max-w-3xl text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Derived from the WiseAdmit strategic problem statement. The core thesis: WiseAdmit has a
          process and discipline problem — not a feature problem. The goal is not to build more
          features, but to make the existing system work with structure, ownership, and clear
          accountability.
        </p>
      </div>

      {/* Guardrails */}
      <div className="mb-8">
        <GuardrailsBanner />
      </div>

      {/* Phase Dependency Warning */}
      <div
        className="mb-8 rounded-lg border-l-4 p-4"
        style={{
          borderColor: 'var(--color-accent)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <span style={{ color: 'var(--color-accent)' }}>⚠</span>{" "}
          <strong style={{ color: 'var(--color-text-primary)' }}>
            Phase 1 is a prerequisite for all other phases.
          </strong>{" "}
          Do not begin Phase 2 work until role/permission model and lead ownership fields are live and tested.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="timeline">
        <TabsList className="mb-6">
          <TabsTrigger value="timeline">
            <span className="flex items-center gap-1.5">
              <Map className="h-4 w-4" />
              Timeline View
              <span className="ml-1 text-xs opacity-60">(planning conversations)</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="board">
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="h-4 w-4" />
              Kanban Board
              <span className="ml-1 text-xs opacity-60">(sprint planning)</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="list">
            <span className="flex items-center gap-1.5">
              <List className="h-4 w-4" />
              Full List
              <span className="ml-1 text-xs opacity-60">(dev tracking)</span>
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <TimelineView audienceView={audienceView} />
        </TabsContent>

        <TabsContent value="board">
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[900px]">
              <BoardView audienceView={audienceView} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <ListView audienceView={audienceView} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
