"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = RadixAccordion.Root;
export const AccordionItem = RadixAccordion.Item;

interface AccordionTriggerProps {
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function AccordionTrigger({ className, children }: AccordionTriggerProps) {
  return (
    <RadixAccordion.Header>
      <RadixAccordion.Trigger
        className={cn(
          "flex w-full items-center justify-between py-4 text-left font-medium text-slate-900 transition-all hover:text-indigo-600",
          "dark:text-slate-100 dark:hover:text-indigo-400",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200" />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
}

interface AccordionContentProps {
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function AccordionContent({ className, children }: AccordionContentProps) {
  return (
    <RadixAccordion.Content
      className={cn(
        "overflow-hidden text-sm text-slate-600 dark:text-slate-400",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className,
      )}
    >
      <div className="pb-4">{children}</div>
    </RadixAccordion.Content>
  );
}
