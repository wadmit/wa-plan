import { cn } from "@/lib/utils";

interface CardProps {
  readonly className?: string;
  readonly children: React.ReactNode;
}

interface AccentCardProps extends CardProps {
  readonly accentColor?: string;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-colors hover:bg-[var(--color-surface-hover)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AccentCard({ className, children, accentColor = "var(--color-accent)" }: AccentCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-colors hover:bg-[var(--color-surface-hover)]",
        className,
      )}
      style={{ borderLeftWidth: "2px", borderLeftColor: accentColor }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn("px-6 pt-6 pb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
  return <h3 className={cn("text-lg font-semibold text-[var(--color-text-primary)]", className)}>{children}</h3>;
}

export function CardDescription({ className, children }: CardProps) {
  return <p className={cn("text-sm text-[var(--color-text-secondary)]", className)}>{children}</p>;
}

export function CardContent({ className, children }: CardProps) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}
