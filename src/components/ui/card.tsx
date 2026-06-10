import { cn } from "@/lib/utils";

interface CardProps {
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn("px-6 pt-6 pb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
  return <h3 className={cn("text-lg font-semibold text-slate-900 dark:text-slate-100", className)}>{children}</h3>;
}

export function CardDescription({ className, children }: CardProps) {
  return <p className={cn("text-sm text-slate-500 dark:text-slate-400", className)}>{children}</p>;
}

export function CardContent({ className, children }: CardProps) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}
