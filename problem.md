# WiseAdmit — What Needs to Be Done

> One dashboard, role-based access, no lead leakage, partner-safe, AI-assisted, marketing ROI visible.

---

## The Core Problem

WiseAdmit is not missing features. It is missing **structure, ownership, and discipline**. The foundation is strong — leads, conversations, WiseScore, applications, payments, partners, automation, and Meta tracking all exist. What is broken is how they connect and who is responsible for what.

---

## 1. Access & Permissions (Do This First)

The current role system is not enough. Every user needs a **role + scope + hierarchy**.

- Keep existing roles (`admin`, `sales`, `partner`, `sub_partner`, `country_admin`, `regional_admin`, `university_admin`, `student`)
- Add **scope** per role — what data they can see (global / country / region / partner / own)
- Add **explicit permission groups** — leads, conversations, marketing, applications, finance, settings
- Partners must **never** see other partners' leads or data
- Sidebar and API responses must filter by role automatically

**Partner hierarchy to enforce:**
```
Admin → Country Admin → Regional Admin → Partner → Sub Partner
```

---

## 2. Lead Ownership (No More Ambiguity)

Every lead must clearly record:

- Who **created** it
- Who **owns** it (partner-generated / WiseAdmit-owned / distributed)
- Who is **assigned** to it
- Which **campaign / form / source** it came from
- Which **partner / counselor** gets credit if it converts

Without this, attribution is guesswork and partner disputes never end.

---

## 3. Lead Lifecycle Tracking (The Backbone)

Replace vague statuses with a proper lifecycle. Every lead must have a **stage**:

```
Captured → Assigned → First Contact → Conversation Active → Qualified
→ WiseScore → Program Shortlisted → Application Started → Docs Pending
→ Payment Pending → Submitted → University Reviewing → Enrolled / Lost
```

Also track separately:
- **Lead quality** — Hot / Warm / Cold
- **Contact status** — Not Contacted / Contacted / Replied / No Response

A lead timeline (audit trail of every event) must be visible on every lead profile.

---

## 4. Lead Leak Prevention (Stop Silent Loss)

The system must automatically detect and surface:

| Leak Type | SLA |
|---|---|
| Hot lead not contacted | 15 minutes |
| Normal lead not contacted | 1 hour |
| Partner lead not accepted | 30 minutes |
| Student reply unanswered | 15 minutes |
| WiseScore completed, no action | 1 hour |
| Application started, no docs | 24 hours |
| Payment pending | 24 hours |

Build a **Lead Leak Dashboard** that shows all of these in one place. Escalate to manager if missed. Recall from partner if high-value lead is repeatedly untouched.

---

## 5. Lead Manager UX (Make Sales Work Faster)

Replace the current flat list with **smart saved views**:

- My Leads / Hot Leads / Follow-Up Today / Student Replied / WiseScore Done / Payment Pending / Stuck Leads / Partner Leads / Unassigned

Each row must show: name, quality, stage, source, assigned user, last activity, next follow-up, SLA status.

Quick actions inline: Call · WhatsApp · Assign · Send WiseScore · Add Follow-Up · Start Application · Mark Lost.

---

## 6. Conversations as the Main Workspace

The inbox must become the **execution center**, not just a chat window.

- Left rail: queue-based buckets (Hot / Replied / SLA At Risk / AI Suggested)
- Center: chat + templates + AI suggestion
- Right rail: lead intelligence panel (source, score, stage, SLA, next action, risk)

Counselors should never need to leave the conversation to act on a lead.

---

## 7. AI — Suggest First, Replace Never

Do **not** start with auto-reply. Build assist-first:

**Phase 1 (build now):**
- Lead summary
- Conversation summary
- Reply suggestion (human must send)
- Next best action card
- Risk / SLA warning

**Phase 2 (after quality control):**
- Application recovery suggestions
- Partner performance summaries
- Campaign efficiency insights

Log every AI suggestion: was it used, ignored, or edited? Use this to improve over time.

---

## 8. Partner Mode (Inside Existing Dashboard)

Do **not** build a separate partner dashboard. Use the existing WiseAdmit dashboard with restricted access.

Partners should see:
- Own / generated / assigned leads
- Own conversations and follow-ups
- Own students and applications
- Own Facebook forms
- Own campaign links / QR codes
- Own performance reports
- Commission (if allowed)

Partners must **not** see: global leads, other partners, global revenue, internal notes, admin settings.

**Partner lead flow:**
1. WiseAdmit sends lead to partner
2. Partner accepts or rejects (with mandatory reason)
3. SLA timer starts
4. Partner contacts lead
5. WiseAdmit monitors and can recall if SLA missed

---

## 9. Partner Facebook Forms

Partners connect their own Facebook pages and lead forms **from inside WiseAdmit**. Each form maps to:

- Program / destination / intake
- Assigned counselor
- Default lead label and lifecycle stage

Leads enter WiseAdmit automatically, tagged as `partner-generated`. WiseAdmit admin can monitor quality and conversion. Show integration health (token status, last lead received, webhook working).

---

## 10. Marketing ROI

Stop measuring only lead count. Track the full funnel:

```
Spend → Clicks → Leads → Qualified → WiseScore → Application → Payment → Enrollment
```

Key metrics: Cost per lead · Cost per application · Cost per payment · ROAS · Revenue per campaign.

Start with **manual CSV spend upload** — don't wait for Ads API sync.

Build a **Marketing ROI Dashboard** showing best/worst campaigns, cost per stage, and which to pause or scale.

---

## 11. Meta Conversion Tracking (CAPI Health)

Important lifecycle events must be sent to Meta: Lead Captured, WiseScore Completed, Application Started, Payment Completed, Enrollment.

Track send state for every event: queued → sent → failed → retried. Alert if failure rate exceeds threshold. Show attribution completeness (% of paid applications with source linkage).

---

## 12. Application & Student Journey

Build an **Application Operations Dashboard** showing:

- Docs pending / Payment pending / Stuck > 7 days
- University-level student counts (currently hard to track)
- Status tracking visible to the team (not just the student)
- Automated reminders for stuck states

Student portal must show: progress bar, missing document checklist, payment reminder, next step CTA.

---

## 13. Additional Requests (from Team Notes)

- **SuperAdmin / Franchise / Partner segregation** — three clearly separated experiences
- **Invoice system** — Admin ↔ Partner invoicing
- **Service request system** — Partners can request services (CSCA class, features, etc.)
- **Ticket / support system** — Partner-facing, integrated into dashboard (not Slack)
- **Membership / certification tracking** — Partner level upgrades with criteria
- **Gamification** — Partner and franchise levels with scholarship incentives
- **Hot program recommendations** — Show partners which programs to push
- **University at-risk view** — Flag universities with application issues
- **Student at-risk view** — Click through to full student info
- **Book-a-appointment link** — For partners to share
- **Automated messages** — More team-controlled, not fully automatic
- **Franchise analytics** — Program-wise revenue, student flow, cost analysis, user tracking
- **Program review feature** — Internal review workflow for programs
- **Announcement feed** — Partners see WiseAdmit PDFs, updates, and broadcasts inside dashboard
- **Franchise onboarding + AI call scripting** — Qualifying questions with live reporting, standard operating procedure (SOP) for escalation to admission officers (Sanju / Franchise admission officer) only if qualified
- **CEO Dashboard** — Consolidated view of all B2C and customer interactions across WiseAdmit
- **Lead management + AI agent training** — Train WhatsApp/messaging AI agents by capturing all historical questions for better qualification and responses

---

## Delivery Order (90 Days)

| Days | Focus |
|---|---|
| 1–15 | Role + scope + permissions + lead ownership + sidebar by role + basic audit log |
| 16–30 | Lifecycle stages + lead timeline + SLA rules + Lead Leak Dashboard + alerts |
| 31–45 | Lead Manager smart views + conversation queues + lead intelligence panel |
| 46–60 | AI suggestions (summary, reply, next action) + partner accept/reject + AI agent training (capture historical questions) |
| 61–75 | Partner Facebook form connect + campaign tracking cleanup + spend import + Franchise onboarding + AI call scripting with SOP |
| 76–90 | Marketing ROI dashboard + CEO Dashboard (consolidated B2C view) + application stuck dashboard + payment recovery + partner performance score |

---

## What NOT to Do Yet

- Do not build a separate partner dashboard
- Do not enable full AI auto-reply
- Do not build multi-tenant white-label
- Do not wait for Ads API sync before launching ROI dashboard
- Do not add new features before access and lifecycle foundation is stable