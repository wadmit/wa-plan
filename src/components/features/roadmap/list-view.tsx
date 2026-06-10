"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PROBLEM_AREAS } from "@/data/roadmap";
import type { PriorityLevel } from "@/types/roadmap";

function priorityVariant(p: PriorityLevel) {
  return p === "critical" ? "critical" : p === "high" ? "high" : p === "medium" ? "medium" : "low";
}

export function ListView() {
  return (
    <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-700 dark:bg-slate-900">
      <Accordion type="multiple" className="w-full">
        {PROBLEM_AREAS.map((problem) => (
          <AccordionItem
            key={problem.id}
            value={`problem-${problem.id}`}
            className="border-0 px-6"
          >
            <AccordionTrigger className="gap-4 py-5">
              <div className="flex flex-1 items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {problem.id}
                </span>
                <span className="flex-1 text-left text-sm font-semibold">{problem.title}</span>
                <div className="flex items-center gap-2 pr-2">
                  {problem.doFirst && (
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                      ⚡ Do First
                    </span>
                  )}
                  <Badge variant={priorityVariant(problem.priority)}>{problem.priority}</Badge>
                  <span className="hidden text-xs text-slate-400 sm:block">{problem.phase}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-2 pl-10 pr-4">
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">{problem.summary}</p>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Key Actions
                  </h4>
                  <ul className="space-y-1.5">
                    {problem.keyActions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
