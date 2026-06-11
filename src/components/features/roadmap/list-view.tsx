"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PROBLEM_AREAS } from "@/data/roadmap";
import type { PriorityLevel } from "@/types/roadmap";

interface ListViewProps {
  readonly audienceView?: "business" | "engineering" | "full";
}

function priorityVariant(p: PriorityLevel) {
  return p === "critical" ? "critical" : p === "high" ? "high" : p === "medium" ? "medium" : "low";
}

export function ListView({ audienceView = "full" }: ListViewProps) {
  return (
    <div
      className="divide-y rounded-lg border"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <Accordion type="multiple" className="w-full">
        {PROBLEM_AREAS.map((problem) => (
          <AccordionItem
            key={problem.id}
            value={`problem-${problem.id}`}
            className="border-0 px-6"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <AccordionTrigger className="gap-4 py-5 hover:no-underline">
              <div className="flex flex-1 items-center gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: 'var(--color-surface-hover)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {problem.id}
                </span>
                <span
                  className="flex-1 text-left text-sm font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {problem.title}
                </span>
                <div className="flex items-center gap-2 pr-2">
                  {problem.doFirst && (
                    <span
                      className="rounded px-2 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: 'rgba(79, 110, 247, 0.2)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      ⚡ Do First
                    </span>
                  )}
                  <Badge variant={priorityVariant(problem.priority)}>{problem.priority}</Badge>
                  <span
                    className="hidden text-xs sm:block"
                    style={{ color: 'var(--color-text-dim)' }}
                  >
                    {problem.phase}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-2 pl-10 pr-4">
                {(audienceView === "business" || audienceView === "full") && (
                  <p className="mb-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {problem.summary}
                  </p>
                )}
                {(audienceView === "engineering" || audienceView === "full") && (
                  <div>
                    <h4
                      className="mb-2 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--color-text-dim)' }}
                    >
                      Key Actions
                    </h4>
                    <ul className="space-y-1.5">
                      {problem.keyActions.map((action, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span
                            className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: 'var(--color-accent)' }}
                          />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
