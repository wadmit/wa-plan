import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "critical" | "high" | "medium" | "low" | "outline" | "success";

interface BadgeProps {
  readonly variant?: BadgeVariant;
  readonly className?: string;
  readonly children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-indigo-100 text-indigo-800",
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
  outline: "border border-slate-300 text-slate-600 bg-transparent",
  success: "bg-emerald-100 text-emerald-800",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
