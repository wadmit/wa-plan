import { Globe, AlertCircle, Calendar, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCard {
  readonly label: string;
  readonly value: string;
  readonly description: string;
  readonly icon: React.ElementType;
  readonly color: string;
}

const STATS: readonly StatCard[] = [
  {
    label: "Sites in System",
    value: "8",
    description: "Across admin, student, AI, counsellor, and more",
    icon: Globe,
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    label: "Problem Areas",
    value: "13",
    description: "Identified from the strategic problem statement",
    icon: AlertCircle,
    color: "text-orange-600 bg-orange-100",
  },
  {
    label: "Delivery Plan",
    value: "90 days",
    description: "Structured delivery timeline across 6 phases",
    icon: Calendar,
    color: "text-violet-600 bg-violet-100",
  },
  {
    label: "Delivery Phases",
    value: "6",
    description: "From foundation through analytics and recovery",
    icon: Layers,
    color: "text-emerald-600 bg-emerald-100",
  },
] as const;

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="flex flex-col gap-3 pt-6">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
