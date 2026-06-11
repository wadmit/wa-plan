interface Stat {
  readonly value: string;
  readonly label: string;
}

const STATS: readonly Stat[] = [
  { value: "8", label: "Sites" },
  { value: "17", label: "Problems" },
  { value: "90", label: "Days" },
  { value: "6", label: "Phases" },
] as const;

export function StatCards() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-8 border-y py-6 sm:gap-16"
      style={{
        borderColor: 'var(--color-border)',
      }}
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center text-center">
          <span
            className="text-3xl font-bold sm:text-4xl"
            style={{ color: 'var(--color-accent)' }}
          >
            {stat.value}
          </span>
          <span
            className="mt-1 font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--color-text-dim)' }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
