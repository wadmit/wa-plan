"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, BookOpen, Home, Layers } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ElementType;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: ROUTES.HOME, icon: Home },
  { label: "Roadmap", href: ROUTES.ROADMAP, icon: Map },
  { label: "Knowledge Base", href: ROUTES.KB, icon: BookOpen },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="text-base tracking-tight">
            WiseAdmit <span className="font-light text-slate-500">HQ</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === ROUTES.HOME
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
