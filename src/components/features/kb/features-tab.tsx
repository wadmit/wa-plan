import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Site } from "@/types/site";

interface FeaturesTabProps {
  readonly site: Site;
}

export function FeaturesTab({ site }: FeaturesTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            Implemented ({site.featuresExisting.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {site.featuresExisting.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-orange-700 dark:text-orange-400">
            <AlertCircle className="h-5 w-5" />
            Incomplete / Partial ({site.featuresIncomplete.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {site.featuresIncomplete.length === 0 ? (
            <p className="text-sm text-slate-500">No incomplete features recorded.</p>
          ) : (
            <ul className="space-y-2">
              {site.featuresIncomplete.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
