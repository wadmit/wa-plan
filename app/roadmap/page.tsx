"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TimelineView } from "@/components/features/roadmap/timeline-view";
import { BoardView } from "@/components/features/roadmap/board-view";
import { ListView } from "@/components/features/roadmap/list-view";
import { GuardrailsBanner } from "@/components/features/roadmap/guardrails-banner";
import { Map, LayoutGrid, List } from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
            <Map className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              90-Day Roadmap
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              17 problem areas · 6 delivery phases · structure, ownership, discipline
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-sm text-slate-600 dark:text-slate-400">
          Derived from the WiseAdmit strategic problem statement. The core thesis: WiseAdmit has a
          process and discipline problem — not a feature problem. The goal is not to build more
          features, but to make the existing system work with structure, ownership, and clear
          accountability.
        </p>
      </div>

      <div className="mb-8">
        <GuardrailsBanner />
      </div>

      <Tabs defaultValue="timeline">
        <TabsList className="mb-6">
          <TabsTrigger value="timeline">
            <span className="flex items-center gap-1.5">
              <Map className="h-4 w-4" />
              Timeline
            </span>
          </TabsTrigger>
          <TabsTrigger value="board">
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="h-4 w-4" />
              Board
            </span>
          </TabsTrigger>
          <TabsTrigger value="list">
            <span className="flex items-center gap-1.5">
              <List className="h-4 w-4" />
              List
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <TimelineView />
        </TabsContent>

        <TabsContent value="board">
          <div className="overflow-x-auto pb-4">
            <div className="min-w-225">
              <BoardView />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <ListView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
