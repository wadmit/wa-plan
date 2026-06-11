import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "WiseAdmit HQ — Product Documentation",
  description: "Internal product documentation and roadmap for the WiseAdmit platform. Technical specifications, 90-day development roadmap, and strategic planning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className="min-h-screen"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
