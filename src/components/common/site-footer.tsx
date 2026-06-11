"use client";

import { Clock, Shield } from "lucide-react";

export function SiteFooter() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <footer
      className="mt-auto border-t py-6"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm" style={{ color: 'var(--color-text-dim)' }}>
          WiseAdmit HQ &mdash; Internal Knowledge Base &amp; Roadmap
        </p>

        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-dim)' }}>
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Confidential
          </span>
          <span className="h-4 w-px" style={{ backgroundColor: 'var(--color-border)' }} />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Last updated: {lastUpdated}
          </span>
        </div>
      </div>
    </footer>
  );
}
