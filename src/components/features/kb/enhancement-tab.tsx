import { Zap, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Site } from "@/types/site";

interface EnhancementTabProps {
  readonly site: Site;
}

export function EnhancementTab({ site }: EnhancementTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-emerald-700 dark:text-emerald-400">
            <Zap className="h-5 w-5" />
            Ready for Enhancement ({site.enhancementReady.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {site.enhancementReady.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-slate-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-slate-300"
              >
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-orange-700 dark:text-orange-400">
            <Wrench className="h-5 w-5" />
            Refactor First ({site.needsRefactorFirst.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
            These modules must be refactored before building new features on top of them.
          </p>
          <ul className="space-y-2">
            {site.needsRefactorFirst.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 text-sm text-slate-700 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-slate-300"
              >
                <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
