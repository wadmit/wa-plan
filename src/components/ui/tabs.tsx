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
        "flex gap-1 rounded-lg border p-1",
        className,
      )}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-default)',
      }}
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
        "flex-1 rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium transition-all",
        "text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)]",
        "data-[state=active]:bg-[var(--color-accent)]/10 data-[state=active]:text-[var(--color-accent)] data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-accent)]",
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
