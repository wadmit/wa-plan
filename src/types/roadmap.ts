export type PriorityLevel = "critical" | "high" | "medium" | "low";
export type PhaseStatus = "current" | "upcoming" | "complete" | "at-risk";

export interface Phase {
  readonly id: string;
  readonly label: string;
  readonly days: string;
  readonly focus: string;
  readonly deliverables: readonly string[];
  readonly color: string;
  readonly status: PhaseStatus;
  readonly businessObjective: string;
  readonly whyItExists: string;
  readonly keyOutcomes: readonly string[];
  readonly ownerTeam: string;
  readonly dependencies: readonly string[];
  readonly successMetrics: readonly string[];
  readonly acceptanceCriteria: readonly string[];
  readonly risks: readonly string[];
}

export interface ProblemArea {
  readonly id: number;
  readonly title: string;
  readonly summary: string;
  readonly priority: PriorityLevel;
  readonly phase: string;
  readonly keyActions: readonly string[];
  readonly doFirst: boolean;
}

export interface Guardrail {
  readonly icon: string;
  readonly text: string;
  readonly explanation: string;
}

export interface WhatsAppFeature {
  readonly userStory: string;
  readonly businessValue: readonly string[];
  readonly dataModel: readonly { readonly field: string; readonly type: string; readonly description: string }[];
  readonly apiContracts: readonly { readonly method: string; readonly endpoint: string; readonly purpose: string }[];
}
