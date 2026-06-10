"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = RadixTabs.Root;

interface TabsListProps {
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function TabsList({ className, children }: TabsListProps) {
  return (
    <RadixTabs.List
      className={cn(
        "flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800",
        className,
      )}
    >
      {children}
    </RadixTabs.List>
  );
}

interface TabsTriggerProps {
  readonly value: string;
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function TabsTrigger({ value, className, children }: TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      value={value}
      className={cn(
        "flex-1 rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-all",
        "hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100",
        "data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm",
        "dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-indigo-400",
        className,
      )}
    >
      {children}
    </RadixTabs.Trigger>
  );
}

interface TabsContentProps {
  readonly value: string;
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function TabsContent({ value, className, children }: TabsContentProps) {
  return (
    <RadixTabs.Content value={value} className={cn("mt-6 outline-none", className)}>
      {children}
    </RadixTabs.Content>
  );
}
