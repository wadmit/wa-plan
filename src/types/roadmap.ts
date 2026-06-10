export type PriorityLevel = "critical" | "high" | "medium" | "low";

export interface Phase {
  readonly id: string;
  readonly label: string;
  readonly days: string;
  readonly focus: string;
  readonly deliverables: readonly string[];
  readonly color: string;
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
  readonly text: string;
}
