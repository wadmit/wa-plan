export type TechDebtSeverity = "critical" | "high" | "medium" | "low";
export type SiteStatus = "Mature" | "Active" | "Early Stage" | "Partially Mocked" | "Experimental";

export interface SiteModule {
  readonly name: string;
  readonly purpose: string;
  readonly keyDeps: readonly string[];
}

export interface TechDebt {
  readonly issue: string;
  readonly location: string;
  readonly severity: TechDebtSeverity;
}

export interface RiskArea {
  readonly area: string;
  readonly risk: string;
  readonly level: "critical" | "high" | "medium";
}

export interface FeatureItem {
  readonly name: string;
  readonly status: "done" | "partial" | "missing";
  readonly notes?: string;
}

export interface Site {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly purpose: string;
  readonly status: SiteStatus;
  readonly techStack: readonly string[];
  readonly framework: string;
  readonly architecture: string;
  readonly modules: readonly SiteModule[];
  readonly featuresExisting: readonly string[];
  readonly featuresIncomplete: readonly string[];
  readonly techDebt: readonly TechDebt[];
  readonly riskAreas: readonly RiskArea[];
  readonly enhancementReady: readonly string[];
  readonly needsRefactorFirst: readonly string[];
  readonly moduleCount: number;
  readonly techDebtCount: number;
}
