import { HeroSection } from "@/components/features/home/hero-section";
import { StatCards } from "@/components/features/home/stat-cards";
import { CtaCards } from "@/components/features/home/cta-cards";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <section>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              At a Glance
            </h2>
            <StatCards />
          </section>
          <section>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Where to Start
            </h2>
            <CtaCards />
          </section>
        </div>
      </div>
    </>
  );
}
