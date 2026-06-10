import { ShieldAlert } from "lucide-react";
import { GUARDRAILS } from "@/data/roadmap";

export function GuardrailsBanner() {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-800/50 dark:bg-rose-950/30">
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
        <div>
          <h3 className="mb-3 text-sm font-semibold text-rose-900 dark:text-rose-200">
            What NOT to do (guardrails)
          </h3>
          <ul className="space-y-1.5">
            {GUARDRAILS.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-rose-800 dark:text-rose-300">
                <span className="mt-0.5 shrink-0 text-rose-400">✕</span>
                {g.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
