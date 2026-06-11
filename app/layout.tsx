import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { SiteHeader } from "@/components/common/site-header";
import { SiteFooter } from "@/components/common/site-footer";

export const metadata: Metadata = {
  title: "WiseAdmit HQ — Product Planning Hub",
  description: "Internal product operations dashboard for business and engineering teams. 90-day roadmap, technical intelligence, and strategic planning for the WiseAdmit platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col" style={{ backgroundColor: '#0B0F1A', color: '#F0F2FF' }}>
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
