"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, BookOpen, Home, ChevronRight, Menu, X } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ElementType;
  readonly description?: string;
}

const MAIN_NAV: readonly NavItem[] = [
  { label: "Home", href: ROUTES.HOME, icon: Home, description: "Overview & quick links" },
  { label: "Roadmap", href: ROUTES.ROADMAP, icon: Map, description: "90-day development plan" },
  { label: "Knowledge Base", href: ROUTES.KB, icon: BookOpen, description: "Technical documentation" },
] as const;

interface DocsLayoutProps {
  readonly children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle - Brand colors */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 rounded-md p-2 lg:hidden"
        style={{ backgroundColor: '#002252', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        {sidebarOpen ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <Menu className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Sidebar - Brand Blue Background */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-[var(--sidebar-width)] transform border-r transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          backgroundColor: '#002252',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b p-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded"
                style={{ backgroundColor: '#EE701E' }}
              >
                <span className="text-sm font-bold text-white">W</span>
              </div>
              <div>
                <span className="block text-sm font-semibold text-white">
                  WiseAdmit
                </span>
                <span className="block text-xs text-white/60">
                  Product Documentation
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {MAIN_NAV.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                        isActive && "font-medium"
                      )}
                      style={{
                        backgroundColor: isActive ? 'rgba(238, 112, 30, 0.2)' : 'transparent',
                        color: isActive ? '#EE701E' : 'rgba(255,255,255,0.8)',
                      }}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      )}
                    </Link>
                    {isActive && item.description && (
                      <p className="ml-7 mt-0.5 text-xs text-white/50">
                        {item.description}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div
            className="border-t p-4 text-xs text-white/50"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <p>Internal Documentation</p>
            <p className="mt-1">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content - Full width */}
      <main className="flex-1 overflow-x-hidden w-full">
        <div className="px-4 py-6 lg:px-6 lg:py-8 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
