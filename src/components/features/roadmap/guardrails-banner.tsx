import { AlertTriangle } from "lucide-react";
import { GUARDRAILS } from "@/data/roadmap";

export function GuardrailsBanner() {
  return (
    <div
      className="rounded-lg border p-5"
      style={{
        borderColor: 'rgba(245, 166, 35, 0.3)',
        borderLeftWidth: '4px',
        borderLeftColor: 'var(--color-accent-warm)',
        backgroundColor: 'rgba(245, 166, 35, 0.08)',
      }}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0"
          style={{ color: 'var(--color-accent-warm)' }}
        />
        <div className="flex-1">
          <h3
            className="mb-4 text-sm font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Strategic Guardrails — These are not deprioritised. They are intentionally out of scope.
          </h3>
          <ul className="space-y-3">
            {GUARDRAILS.map((g, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span
                  className="mt-0.5 shrink-0 font-bold"
                  style={{ color: 'var(--color-accent-warm)' }}
                >
                  {g.icon}
                </span>
                <div>
                  <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {g.text}
                  </span>
                  <span className="mx-2" style={{ color: 'var(--color-text-dim)' }}>→</span>
                  <span>{g.explanation}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
