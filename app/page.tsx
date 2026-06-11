import { HeroSection } from "@/components/features/home/hero-section";
import { StatCards } from "@/components/features/home/stat-cards";
import { CtaCards } from "@/components/features/home/cta-cards";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="space-y-12">
          {/* Stats Bar */}
          <section>
            <StatCards />
          </section>

          {/* Two Ways to Read */}
          <section>
            <h2
              className="mb-6 text-center text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-text-dim)' }}
            >
              Two Ways to Read This Site
            </h2>
            <CtaCards />
          </section>
        </div>
      </div>
    </>
  );
}
