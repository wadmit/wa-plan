export type TechDebtSeverity = "critical" | "high" | "medium" | "low";
export type SiteStatus = "Active" | "In Progress — Backend Incomplete" | "Mature" | "Early Stage";

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
  readonly level: "critical" | "high" | "medium" | "low";
}

export interface FeatureItem {
  readonly name: string;
  readonly status: "done" | "partial" | "missing";
  readonly notes?: string;
}

export interface Enhancement {
  readonly name: string;
  readonly status: "planned" | "in-progress" | "ready";
  readonly businessValue: string;
  readonly technicalScope: string;
  readonly dependencies: readonly string[];
  readonly riskLevel: "low" | "medium" | "high";
  readonly humanControlRule?: string;
}

export interface Site {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly purpose: string;
  readonly plainEnglishPurpose?: string;
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
  readonly businessOwner?: string;
  readonly primaryAffectedPhases?: readonly string[];
}
