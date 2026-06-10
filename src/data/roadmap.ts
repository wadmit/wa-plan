import type { Phase, ProblemArea, Guardrail } from "@/types/roadmap";

export const PHASES: readonly Phase[] = [
  {
    id: "phase-1",
    label: "Phase 1",
    days: "Day 1–15",
    focus: "Foundation",
    color: "indigo",
    deliverables: [
      "Role + scope + permissions model",
      "Lead ownership fields (creator, owner, assigner, source, campaign)",
      "Sidebar and API filtered by role",
      "Partner hierarchy enforced",
      "Basic audit log",
    ],
  },
  {
    id: "phase-2",
    label: "Phase 2",
    days: "Day 16–30",
    focus: "Lead Lifecycle",
    color: "blue",
    deliverables: [
      "Full lifecycle stage pipeline",
      "Lead quality (Hot/Warm/Cold) and contact status",
      "Lead timeline — audit trail on every lead",
      "SLA rules per lead type",
      "Lead Leak Dashboard with escalation alerts",
    ],
  },
  {
    id: "phase-3",
    label: "Phase 3",
    days: "Day 31–45",
    focus: "Sales UX",
    color: "cyan",
    deliverables: [
      "Smart saved views (My Leads, Hot, Follow-Up Today, etc.)",
      "Inline quick-actions per lead row",
      "Conversation queues (Hot / Replied / SLA At Risk / AI Suggested)",
      "Lead intelligence right-rail panel",
    ],
  },
  {
    id: "phase-4",
    label: "Phase 4",
    days: "Day 46–60",
    focus: "AI Assist + Partners",
    color: "violet",
    deliverables: [
      "AI lead summary + conversation summary",
      "AI reply suggestion (human sends)",
      "Next best action card",
      "Risk / SLA warning card",
      "Partner accept/reject flow with mandatory reason",
    ],
  },
  {
    id: "phase-5",
    label: "Phase 5",
    days: "Day 61–75",
    focus: "Marketing",
    color: "purple",
    deliverables: [
      "Partner Facebook form connect inside WiseAdmit",
      "Campaign tracking cleanup",
      "Manual CSV spend upload",
      "Full funnel spend attribution (Spend → Enrollment)",
    ],
  },
  {
    id: "phase-6",
    label: "Phase 6",
    days: "Day 76–90",
    focus: "Analytics & Recovery",
    color: "rose",
    deliverables: [
      "Marketing ROI dashboard (best/worst campaigns, cost per stage)",
      "Application Operations Dashboard (docs pending, stuck > 7 days)",
      "Payment recovery automation",
      "Partner performance score",
    ],
  },
] as const;

export const PROBLEM_AREAS: readonly ProblemArea[] = [
  {
    id: 1,
    title: "Access & Permissions",
    summary:
      "Every user needs role + scope + hierarchy. Partners must never see other partners' data. Sidebar and API must filter by role automatically.",
    priority: "critical",
    phase: "Day 1–15",
    doFirst: true,
    keyActions: [
      "Add scope per role (global / country / region / partner / own)",
      "Add explicit permission groups (leads, conversations, marketing, finance, settings)",
      "Enforce partner hierarchy: Admin → Country Admin → Regional Admin → Partner → Sub Partner",
      "Filter sidebar and all API responses by role automatically",
    ],
  },
  {
    id: 2,
    title: "Lead Ownership",
    summary:
      "Every lead must clearly record who created it, who owns it, who is assigned, which campaign/source it came from, and who gets credit on conversion.",
    priority: "critical",
    phase: "Day 1–15",
    doFirst: true,
    keyActions: [
      "Record creator, owner, assignee on every lead",
      "Tag lead source: partner-generated / WiseAdmit-owned / distributed",
      "Link campaign / form / source to every lead",
      "Credit tracking for partner conversion attribution",
    ],
  },
  {
    id: 3,
    title: "Lead Lifecycle Tracking",
    summary:
      "Replace vague statuses with a proper 14-stage lifecycle pipeline. Add lead quality (Hot/Warm/Cold) and contact status as separate fields.",
    priority: "critical",
    phase: "Day 16–30",
    doFirst: false,
    keyActions: [
      "Implement: Captured → Assigned → First Contact → Conversation Active → Qualified → WiseScore → Program Shortlisted → Application Started → Docs Pending → Payment Pending → Submitted → University Reviewing → Enrolled / Lost",
      "Add lead quality field: Hot / Warm / Cold",
      "Add contact status: Not Contacted / Contacted / Replied / No Response",
      "Build lead timeline (full audit trail) on every lead profile",
    ],
  },
  {
    id: 4,
    title: "Lead Leak Prevention",
    summary:
      "The system must detect and surface lead leakage with SLA-based alerts. Build a Lead Leak Dashboard and escalation logic.",
    priority: "high",
    phase: "Day 16–30",
    doFirst: false,
    keyActions: [
      "Hot lead not contacted → alert at 15 min",
      "Normal lead not contacted → alert at 1 hr",
      "Partner lead not accepted → alert at 30 min",
      "Student reply unanswered → alert at 15 min",
      "WiseScore completed, no action → alert at 1 hr",
      "Lead Leak Dashboard showing all SLA breaches",
      "Escalate to manager if missed; recall from partner if high-value lead is untouched",
    ],
  },
  {
    id: 5,
    title: "Lead Manager UX",
    summary:
      "Replace the flat lead list with smart saved views and inline quick-actions. Sales team should never need to navigate away.",
    priority: "high",
    phase: "Day 31–45",
    doFirst: false,
    keyActions: [
      "Smart views: My Leads / Hot / Follow-Up Today / Student Replied / WiseScore Done / Payment Pending / Stuck / Partner Leads / Unassigned",
      "Each row shows: name, quality, stage, source, assigned user, last activity, next follow-up, SLA status",
      "Inline actions: Call · WhatsApp · Assign · Send WiseScore · Add Follow-Up · Start Application · Mark Lost",
    ],
  },
  {
    id: 6,
    title: "Conversations as Main Workspace",
    summary:
      "The inbox must become the execution center. Counselors should never need to leave the conversation to act on a lead.",
    priority: "high",
    phase: "Day 31–45",
    doFirst: false,
    keyActions: [
      "Left rail: queue-based buckets (Hot / Replied / SLA At Risk / AI Suggested)",
      "Center: chat + templates + AI suggestion",
      "Right rail: lead intelligence panel (source, score, stage, SLA, next action, risk)",
    ],
  },
  {
    id: 7,
    title: "AI — Suggest First, Replace Never",
    summary:
      "Start with Phase 1 AI assist only. Do not enable auto-reply. Log every suggestion to improve over time.",
    priority: "high",
    phase: "Day 46–60",
    doFirst: false,
    keyActions: [
      "Lead summary card",
      "Conversation summary",
      "Reply suggestion (human must send)",
      "Next best action card",
      "Risk / SLA warning",
      "Log every AI suggestion: used, ignored, or edited",
    ],
  },
  {
    id: 8,
    title: "Partner Mode",
    summary:
      "No separate partner dashboard. Use the existing WiseAdmit dashboard with restricted access. Partners see only their own data.",
    priority: "high",
    phase: "Day 46–60",
    doFirst: false,
    keyActions: [
      "Partners see: own leads, own conversations, own students, own Facebook forms, own campaign links, own performance reports",
      "Partners must NOT see: global leads, other partners, global revenue, internal notes, admin settings",
      "Partner lead flow: WiseAdmit sends → partner accepts/rejects → SLA timer starts → WiseAdmit monitors → can recall",
    ],
  },
  {
    id: 9,
    title: "Partner Facebook Forms",
    summary:
      "Partners connect their own Facebook pages and lead forms from inside WiseAdmit. Leads enter automatically tagged as partner-generated.",
    priority: "medium",
    phase: "Day 61–75",
    doFirst: false,
    keyActions: [
      "Connect partner Facebook page inside WiseAdmit",
      "Map each form to program / destination / intake / counselor",
      "Leads auto-enter WiseAdmit tagged as partner-generated",
      "Show integration health (token status, last lead received, webhook working)",
    ],
  },
  {
    id: 10,
    title: "Marketing ROI",
    summary:
      "Track full funnel from spend to enrollment. Start with manual CSV spend upload — don't wait for Ads API.",
    priority: "medium",
    phase: "Day 61–75",
    doFirst: false,
    keyActions: [
      "Manual CSV spend upload per campaign",
      "Track: Spend → Clicks → Leads → Qualified → WiseScore → Application → Payment → Enrollment",
      "Key metrics: CPL, CPA, CPP, ROAS, Revenue per campaign",
      "Marketing ROI Dashboard: best/worst campaigns, cost per stage",
    ],
  },
  {
    id: 11,
    title: "Meta Conversion Tracking (CAPI Health)",
    summary:
      "Critical lifecycle events must be sent to Meta. Track send state for every event and alert on failures.",
    priority: "medium",
    phase: "Day 61–75",
    doFirst: false,
    keyActions: [
      "Send to Meta: Lead Captured, WiseScore Completed, Application Started, Payment Completed, Enrollment",
      "Track send state: queued → sent → failed → retried",
      "Alert if failure rate exceeds threshold",
      "Attribution completeness report: % of paid applications with source linkage",
    ],
  },
  {
    id: 12,
    title: "Application & Student Journey",
    summary:
      "Build an Application Operations Dashboard. Make stuck states visible to the team and automate reminders.",
    priority: "medium",
    phase: "Day 76–90",
    doFirst: false,
    keyActions: [
      "Application Ops Dashboard: docs pending, payment pending, stuck > 7 days",
      "University-level student count tracking",
      "Automated reminders for stuck states",
      "Student portal: progress bar, missing doc checklist, payment reminder, next step CTA",
    ],
  },
  {
    id: 13,
    title: "Additional Team Requests",
    summary:
      "Invoice system, service requests, support tickets, gamification, announcement feed, franchise analytics, and more.",
    priority: "low",
    phase: "Day 76–90",
    doFirst: false,
    keyActions: [
      "Invoice system: Admin ↔ Partner invoicing",
      "Service request system for partners",
      "Ticket / support system inside dashboard",
      "Membership / certification tracking for partner upgrades",
      "Gamification: partner and franchise levels",
      "Announcement feed: PDFs, updates, broadcasts",
      "Franchise analytics: program-wise revenue, student flow, cost analysis",
    ],
  },
] as const;

export const GUARDRAILS: readonly Guardrail[] = [
  { text: "Do not build a separate partner dashboard" },
  { text: "Do not enable full AI auto-reply" },
  { text: "Do not build multi-tenant white-label" },
  { text: "Do not wait for Ads API sync before launching ROI dashboard" },
  { text: "Do not add new features before access and lifecycle foundation is stable" },
] as const;
