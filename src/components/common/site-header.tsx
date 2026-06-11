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
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'rgba(11, 15, 26, 0.85)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <Layers className="h-4 w-4" style={{ color: '#0B0F1A' }} />
          </div>
          <span className="text-base tracking-tight">
            WiseAdmit <span style={{ color: 'var(--color-text-dim)' }}>HQ</span>
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
                    ? "text-[var(--color-accent)]"
                    : "hover:text-[var(--color-text-primary)]"
                )}
                style={{
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive ? 'rgba(79, 110, 247, 0.1)' : 'transparent',
                }}
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
