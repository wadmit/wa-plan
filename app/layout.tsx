import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { SiteHeader } from "@/components/common/site-header";
import { SiteFooter } from "@/components/common/site-footer";

export const metadata: Metadata = {
  title: "WiseAdmit HQ — Knowledge Base & Roadmap",
  description: "Internal knowledge base and 90-day roadmap for the WiseAdmit platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
