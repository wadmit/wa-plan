import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "outline"
  | "success"
  | "accent"
  | "warning"
  | "ready-to-build"
  | "needs-review"
  | "business-impact"
  | "automation"
  | "ai-assist"
  | "human-review"
  | "sla-risk"
  | "bot-interacted"
  | "high-intent";

interface BadgeProps {
  readonly variant?: BadgeVariant;
  readonly className?: string;
  readonly children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30",
  critical: "bg-[var(--color-danger)]/20 text-[var(--color-danger)] border border-[var(--color-danger)]/30",
  high: "bg-[var(--color-accent-warm)]/20 text-[var(--color-accent-warm)] border border-[var(--color-accent-warm)]/30",
  medium: "bg-[var(--color-text-secondary)]/20 text-[var(--color-text-secondary)] border border-[var(--color-text-secondary)]/30",
  low: "bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20",
  outline: "border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-transparent",
  success: "bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/30",
  accent: "bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30",
  warning: "bg-[var(--color-accent-warm)]/20 text-[var(--color-accent-warm)] border border-[var(--color-accent-warm)]/30",
  "ready-to-build": "bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/30",
  "needs-review": "bg-[var(--color-accent-warm)]/20 text-[var(--color-accent-warm)] border border-[var(--color-accent-warm)]/30",
  "business-impact": "bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30",
  automation: "bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30",
  "ai-assist": "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  "human-review": "bg-[var(--color-accent-warm)]/20 text-[var(--color-accent-warm)] border border-[var(--color-accent-warm)]/30",
  "sla-risk": "bg-[var(--color-danger)]/20 text-[var(--color-danger)] border border-[var(--color-danger)]/30",
  "bot-interacted": "bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30",
  "high-intent": "bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/30",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
