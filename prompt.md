# MASTER MEGA PROMPT — WiseAdmit HQ Plan Site Enhancement

### For: Coding Agent with repo access to `plan.wiseadmit.io`

### Project: WiseAdmit Internal Planning / PRD / Roadmap Website

### Status: Deliver-ready — implement in full, in order

---

## 0. CONTEXT & MISSION

You are working on the WiseAdmit internal planning and documentation website at:

`plan.wiseadmit.io`

This website currently contains:

* Home page for WiseAdmit HQ
* 90-Day Roadmap
* Knowledge Base for multiple WiseAdmit sites
* Technical intelligence pages for:

  * Admin Dashboard
  * Student Portal
  * AI Interview
  * Counsellor Dashboard
  * CSCA.ai
  * AI Interview Admin
  * Flagship Website
  * University Dashboard

The site is read by multiple audiences:

### Business / Leadership / Admissions / Marketing Team

They need to understand:

* What is being built
* Why it matters
* Which business problems it solves
* What is urgent
* What is intentionally out of scope
* What risks exist
* What should happen next

### Engineering / Development Team

They need to understand:

* Module maps
* Technical stack
* API/data dependencies
* Tech debt
* Phase dependencies
* Feature readiness
* Acceptance criteria
* Implementation risks

---

## 1. CURRENT PROBLEM

The current site works as a technical data store, but it does not work well as a communication hub.

Main issues:

* The site feels too technical and developer-facing.
* Business users cannot quickly understand the meaning of roadmap items.
* Typography and layout feel generic.
* Information hierarchy is flat.
* Important roadmap guardrails are buried.
* The Knowledge Base feels like a raw list of technical cards.
* Statuses such as “Partially Mocked” or “Mature” are not explained.
* Roadmap phases are hard to scan.
* There is no strong separation between Business View and Developer View.
* There is no clear “what this means for the company” layer.
* There is no clear product requirement for WhatsApp automation, Slack updates, and bot-to-human follow-up summaries.

---

## 2. MAIN GOAL

Turn this website into a clear internal product planning hub that is useful for:

* Business team
* Admissions team
* Marketing team
* Leadership team
* Engineering team

The final site should feel like a premium internal product operations dashboard, not just a documentation archive.

The site must answer, clearly:

* What is this?
* Why does it matter?
* Who uses it?
* What needs to be built?
* What is the current status?
* What are the risks?
* What does success look like?
* What should developers be careful about?

---

## 3. CRITICAL NEW PRD REQUIREMENT

Add a new PRD section called:

# WhatsApp Bot Interaction Summary for Follow-up

This is the most important new product requirement.

WiseAdmit uses WhatsApp automation for lead communication. The team also receives Slack-style updates. When a lead interacts with the WhatsApp bot, the sales/admissions follow-up view should show a short summary of what happened in the bot conversation.

This prevents blind follow-ups and helps the team continue conversations with context.

---

## 4. WHERE TO ADD THE WHATSAPP FEATURE

Add this feature across the roadmap and Knowledge Base.

### Add under Roadmap Phase 2: Lead Lifecycle

Focus: capturing and storing WhatsApp interaction state.

Add tasks:

* Detect when a lead replies to WhatsApp automation, clicks a bot button, answers a question, completes a bot flow, asks for human help, or shows any tracked WhatsApp interaction.
* Mark the lead as `Bot Interacted`.
* Store last bot interaction time.
* Store bot flow name or campaign source where available.
* Store extracted lead intent, program interest, country interest, intake, concern, and source.
* Add lifecycle badges such as:

  * Bot Interacted
  * Needs Human Follow-up
  * Replied but Not Assigned
  * SLA At Risk
  * High Intent from Bot

### Add under Roadmap Phase 3: Sales UX

Focus: making the summary visible in the follow-up workflow.

Add tasks:

* Show WhatsApp bot interaction summary in the follow-up queue.
* Show the summary inline on the lead follow-up card, not buried only inside the lead detail page.
* Show the summary in lead detail page, lead timeline, lead intelligence right rail, unified inbox/conversation area if present, and saved views such as Follow-up Today, Hot Leads, and Replied Leads.
* Add empty state:

  > No WhatsApp bot interaction yet. Follow up using available lead source and form details.
* Show freshness label:

  > Summary updated 12 minutes ago from WhatsApp bot interaction.
* Add timeline audit entry for every bot interaction summary.

### Add under Roadmap Phase 4: AI Assist + Partners

Focus: AI summary generation and Slack-style notification.

Append the following items to Phase 4:

* WhatsApp Automation: if a lead interacts with the WhatsApp bot, the follow-up record must auto-attach a conversation summary including what the bot said, what the lead replied, and what intent signals were detected.
* Slack Integration: when a lead interacts with the WhatsApp bot, push a real-time Slack notification to the relevant channel with lead name, source, bot conversation summary, and suggested next action.
* Follow-up UX: counsellors and sales reps must see the WhatsApp bot conversation summary inline in the lead’s follow-up queue card, not buried inside the lead record.
* Human Control Rule: do not build full AI auto-reply. AI may generate summaries and suggested replies, but humans must review and send final communication.

---

## 5. WHATSAPP FEATURE BUSINESS EXPLANATION

Add this business-language callout near the relevant roadmap section, especially Phase 4:

> **Why this matters:**
> When a prospect messages WiseAdmit on WhatsApp and the bot responds, that conversation contains important intent signals: what program they asked about, what objection they raised, how warm they are, and what help they need next. Today, that context can be lost before a human follows up. This feature ensures the bot conversation is automatically summarized and shown in Slack and the follow-up queue, so the sales or admissions team can continue exactly where the bot left off. This reduces repeated questions, improves follow-up quality, and increases conversion.

---

## 6. WHATSAPP FEATURE USER STORY

Add this user story:

> As a counsellor, admissions officer, or sales team member, I want to see a short summary of a lead’s WhatsApp bot interaction before I follow up, so that I can continue the conversation with context instead of asking the student the same questions again.

---

## 7. WHATSAPP FEATURE BUSINESS VALUE

Add the following business value points:

* Reduces repeated questions to students
* Improves follow-up quality
* Helps counsellors understand lead intent quickly
* Improves lead conversion
* Makes Slack updates more useful
* Creates accountability for bot-to-human handoff
* Helps managers monitor lead engagement quality
* Helps admissions/sales prioritize high-intent leads faster
* Improves continuity between automation and human counselling

---

## 8. WHATSAPP FEATURE FUNCTIONAL REQUIREMENTS

### 8.1 Detect WhatsApp Bot Interaction

A lead should be marked as “Bot Interacted” if they:

* Reply to WhatsApp automation
* Click a WhatsApp bot button
* Answer a bot question
* Complete a bot flow
* Ask for human help
* Share documents through a bot flow
* Ask about a program, university, country, intake, scholarship, visa, cost, or deadline
* Trigger any tracked WhatsApp automation event

Store:

* Last interaction time
* Bot flow name
* Campaign source
* Last user message
* Bot interaction status

### 8.2 Generate Follow-up Summary

The summary should include:

* Lead name
* Phone number or masked contact
* Country
* Source/campaign
* Last WhatsApp interaction time
* What the lead asked or selected
* Interested country
* Interested program
* Interested university
* Interested intake
* Lead intent level: High / Medium / Low / Unknown
* Main concern or objection, if available
* Suggested next action
* Follow-up owner
* Follow-up due time or SLA status
* Summary updated timestamp

### 8.3 Show Summary in Lead Follow-up Workflow

Add the summary to:

* Lead detail page
* Lead timeline
* Follow-up queue
* Lead intelligence right rail
* Conversation/unified inbox area if present
* Follow-up Today saved view
* Hot Leads saved view
* Replied Leads saved view

The summary must be visible before the counsellor makes a call or sends a message.

### 8.4 Slack-style Update

When a meaningful WhatsApp bot interaction happens, the Slack-style notification should include:

```text
New WhatsApp Bot Interaction

Lead: [Lead Name]
Country: [Country]
Source: [Campaign / Form / Partner]
Last Interaction: [Time]

Summary:
The lead interacted with the bot and showed interest in [program/country/intake]. They asked about [main question/concern]. Current intent level appears [High/Medium/Low].

Suggested Follow-up:
[Recommended next action]

Owner:
[Assigned counsellor or team]

Open Lead:
[Lead detail link]
```

### 8.5 Human Control Rule

Do not build full AI auto-reply.

The system may generate:

* Conversation summaries
* Suggested next actions
* Suggested reply drafts

But a human must review and send the final response.

### 8.6 Empty State

If the lead has not interacted with the WhatsApp bot, show:

> No WhatsApp bot interaction yet. Follow up using available lead source and form details.

### 8.7 Summary Freshness

Show when the summary was last updated.

Example:

> Summary updated 12 minutes ago from WhatsApp bot interaction.

### 8.8 Audit Trail

Every bot interaction summary should appear in the lead timeline with:

* Timestamp
* Source
* System/user attribution
* Summary update event
* Related bot flow or campaign source

### 8.9 Manager View

Add filters or badges for:

* Bot Interacted
* Needs Human Follow-up
* Replied but Not Assigned
* SLA At Risk
* High Intent from Bot

---

## 9. SUGGESTED DATA MODEL FIELDS

Document the following suggested fields:

```ts
leadId
whatsappConversationId
botInteractionStatus: "none" | "interacted" | "completed" | "handoff_requested"
lastBotInteractionAt
botFlowName
botCampaignSource
lastUserMessage
extractedIntent
extractedProgramInterest
extractedCountryInterest
extractedIntake
extractedConcern
aiGeneratedSummary
suggestedNextAction
summaryUpdatedAt
followUpOwnerId
followUpDueAt
slaStatus
```

---

## 10. SUGGESTED API / INTEGRATION CONTRACT

Document the following possible API contracts:

```http
GET /leads/:id/whatsapp-summary
POST /webhooks/whatsapp/bot-interaction
POST /leads/:id/generate-conversation-summary
PATCH /leads/:id/follow-up-summary
POST /notifications/slack/lead-bot-interaction
```

Important: Do not implement real WhatsApp or Slack backend integration inside this documentation site unless the repo already supports such examples. This task is mainly to document and present the requirement clearly. Static examples and mock PRD cards are acceptable.

---

## 11. ADD TO ADMIN DASHBOARD KNOWLEDGE BASE

On `/kb/admin`, under the “Enhancement” tab/section, add:

# Enhancement: WhatsApp Bot → Follow-up Summary Integration

### Status

Planned — Phase 2, Phase 3, and Phase 4

### Business Value

Ensures no lead interaction with the WhatsApp bot is lost. Sales and admissions reps can see the full bot conversation summary before making a follow-up call or sending a message.

### Technical Scope

* Connect WhatsApp Cloud API webhook to the admin backend
* On bot interaction event, trigger a summary job
* Use existing AI lead summary pattern if available
* Store summary as a `lead_interaction_summary` or equivalent object on the Lead record
* Emit Socket.io event if real-time infrastructure exists
* Push Slack notification via Slack Incoming Webhook to configured channel
* Payload should include:

```ts
{
  lead_name,
  lead_id,
  source,
  summary,
  suggested_action
}
```

* Render summary card inline on the lead follow-up queue row
* Also render summary in lead detail, timeline, and lead intelligence panel

### Dependencies

* Phase 2 lead lifecycle fields
* Phase 3 follow-up queue UI
* Phase 4 AI conversation summary
* WhatsApp Cloud API credentials
* Slack webhook configuration
* Lead ownership model

### Risk

Medium.

Main risks:

* WhatsApp Cloud API webhook reliability
* Missed webhook events
* Need for fallback polling
* Incorrect AI summary
* Human follow-up SLA not triggered properly

### Human Control Rule

No full AI auto-reply. AI can summarize and suggest, but humans must send final communication.

---

## 12. OPTIONAL COMMUNICATION AUTOMATION SECTION

Add a new section or page for:

# Communication Automation

Prefer adding this as a section inside the existing structure. Only create a new page if it fits the existing routing pattern and does not create unnecessary complexity.

This section should explain:

* WhatsApp automation
* Slack-style updates
* Bot interaction summary
* Human handoff
* Follow-up ownership
* SLA alerts
* Conversation summary
* Suggested next best action
* Why full AI auto-reply is intentionally excluded

The section should be readable by business users first, then developers.

Suggested structure:

1. What this system does
2. Why it matters for admissions and sales
3. How WhatsApp bot interaction is captured
4. How summaries are generated
5. Where summaries appear in the product
6. What Slack updates should include
7. Human review requirement
8. Data model and API contract
9. Acceptance criteria

---

## 13. DESIGN SYSTEM OVERHAUL

Apply the following design system globally.

### Palette

```css
--color-bg: #0B0F1A;
--color-surface: #141928;
--color-border: #1E2640;
--color-accent: #4F6EF7;
--color-accent-warm: #F5A623;
--color-success: #2ECC71;
--color-danger: #E74C3C;
--color-text-primary: #F0F2FF;
--color-text-secondary: #8892B0;
--color-text-dim: #4A5568;
```

### Typography

Use Inter globally.

```css
Headings: Inter, 700–800, letter-spacing: -0.02em;
Body: Inter, 400, line-height: 1.7;
Mono labels: JetBrains Mono or Fira Code;
```

Scale:

```css
h1: 2.75rem
h2: 1.875rem
h3: 1.25rem
body: 0.9375rem
label: 0.75rem uppercase tracked
```

### Spacing

Use a 4px base unit.

Preferred spacing:

```text
8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
```

### Radius

```css
Cards: 10px;
Badges/tags: 4px;
Buttons: 6px;
```

### Signature Visual Motif

Every phase card and KB site card should have a thin 2px left border.

Use this as a repeated visual identity element.

---

## 14. HOMEPAGE REDESIGN

The homepage should feel like an executive dashboard, not a simple document index.

### Add or improve these sections:

* What this hub is for
* Who should use it
* Current priority
* Roadmap status
* Critical risks
* Recently added PRD updates
* Business impact summary
* Quick links for Business View and Developer View

### Hero Section

Use a dark full-width hero with `--color-bg`.

Replace generic subtitle with:

```text
For business team: See what’s shipping, when, and what has been deliberately left out.

For engineering: Jump to module maps, technical liabilities, enhancement queues, and phase dependencies.
```

### Add “Two Ways to Read This Site” Section

Add two cards:

#### Business Team

```text
You need: what is being built, in what order, why it matters, what risks exist, and which features have intentionally been left out of scope.

CTA: Start with the Roadmap
```

#### Engineering Team

```text
You need: module maps, tech stack, technical liabilities, enhancement readiness, phase dependencies, and API/data contract status per site.

CTA: Start with the Knowledge Base
```

### Stats Bar

Render the four stats as a horizontal strip:

* 8 Sites
* 17 Problems
* 90 Days
* 6 Phases

Style:

* Large numbers in `--color-accent`
* Uppercase monospace labels
* Thin top and bottom border using `--color-border`

### CTA Cards

Redesign “Where to Start” cards as premium dark cards.

Each card should include:

* Left accent border strip
* Large icon or phase indicator
* Strong title
* Feature bullets using real `<ul>`
* Checkmarks in `--color-success`
* Bottom CTA button using `--color-accent`

---

## 15. ROADMAP PAGE REDESIGN

### 15.1 Guardrails Section

Make strategic guardrails visually unmissable.

Render as a full-width amber warning banner:

* Amber background at 10% opacity
* Amber left border
* Strong heading

Title:

```text
⚠ Strategic Guardrails — These are not deprioritised. They are intentionally out of scope.
```

Keep these guardrails clearly visible:

```text
✕ Do not build a separate partner dashboard
→ Partners use the existing scoped view. Separate dashboard = duplicate maintenance.

✕ Do not enable full AI auto-reply
→ AI suggests, humans send. Auto-reply creates compliance and tone risk.

✕ Do not build multi-tenant white-label
→ Premature. Franchise model must be stable first.

✕ Do not wait for Ads API sync before launching ROI dashboard
→ Manual CSV upload unblocks the business team now. API sync can come later.

✕ Do not add new features before access and lifecycle foundation is stable
→ Phase 1 is the load-bearing wall. Everything else sits on top of it.
```

### 15.2 Roadmap Audience Toggle

Add audience tabs at the page header:

```text
Business View | Engineering View | Full View
```

Behavior:

* Business View:

  * Show phase name
  * Timeline
  * Business objective
  * Key business outcomes
  * Guardrails
  * Risks
  * Success metrics
  * Hide deep technical sub-items

* Engineering View:

  * Show full task detail
  * Show dependencies
  * Show technical requirements
  * Show data/API notes
  * Show acceptance criteria

* Full View:

  * Show everything

Implementation:

* Simple client-side JS class toggle is enough.
* No backend needed.

Priority:

* This audience toggle is one of the highest-priority UI interactions.

### 15.3 Roadmap Phase Cards

Each phase card should include:

* Phase number
* Phase name
* Timeline/date range
* Status badge
* Business objective
* Key problems solved
* Deliverables
* Owner/team
* Dependencies
* Success metrics
* Acceptance criteria
* Risks
* One-sentence plain-English explanation of why this phase exists

### 15.4 Phase Status Styling

Use border/status differentiation:

* Phase 1 active/current: `--color-accent`
* Upcoming phases: `--color-border`
* Complete phase: `--color-success` and `✓ Complete` badge
* High-risk phase: amber badge or border note

### 15.5 Phase Dependency Note

Add below Phase 1:

```text
⚠ Phase 1 is a prerequisite for all other phases. Do not begin Phase 2 work until role/permission model and lead ownership fields are live and tested.
```

### 15.6 Rename Roadmap Tabs

Rename:

```text
Timeline → Timeline View (best for: planning conversations)
Board → Kanban Board (best for: sprint planning)
List → Full List (best for: dev task tracking)
```

### 15.7 Roadmap Progress Indicator

Add a thin progress bar at the very top of the roadmap page showing % of the 90-day period elapsed.

Use hardcoded roadmap start date if needed.

---

## 16. KNOWLEDGE BASE INDEX REDESIGN

### 16.1 Add Status Legend

Above the card grid, add:

```text
Status key:
🟢 Active — live, in production
🟡 In Progress — Backend Incomplete — UI exists, backend incomplete
🔵 Mature — stable, low churn
🔴 Early Stage — scaffolded, not production-ready
```

Replace “Partially Mocked” with:

```text
In Progress — Backend Incomplete
```

### 16.2 Critical Issues Callout

Above the grid, add:

```text
⚠ 3 critical issues flagged across the system
Affected: [Admin Dashboard] [Student Portal] [UniHub]
```

Populate affected sites from actual available data.

Each affected site should link to its KB page.

### 16.3 Knowledge Base Site Cards

Redesign each site card.

Each card should show:

* Site name
* Status badge
* Live URL as dim link
* Plain-English purpose
* Business owner/team, if available
* Technical stack
* Readiness score
* Critical risks
* Enhancement opportunities
* Recommended next action
* Issues count
* Modules count
* Ready to Improve count

Layout:

* Left border color-coded by status:

  * Green = Active
  * Blue = Mature
  * Amber = In Progress / Backend Incomplete
  * Red = Early Stage
* Header:

  * Site name
  * Status badge
  * URL
* Body row:

  * Purpose sentence
* Metrics row:

  * Issues: X
  * Modules: N
  * Ready to Improve: N
* Tech stack:

  * Show top 2 tags only
  * Do not show a noisy overflow like “+6”
* Footer:

  * CTA button: `View Intelligence Report →`

### 16.4 How to Read These Reports Accordion

Add an accordion for business users:

```text
▶ What do these reports tell me?

Each report shows what a site can do today, what is broken or incomplete, and what is ready to improve next. Business users should read the Issues, Risks, and Enhancement sections first. Developers can use the Modules, Features, and Technical Liabilities sections for implementation planning.
```

---

## 17. INDIVIDUAL KB SITE PAGES REDESIGN

Applies to pages such as:

* `/kb/admin`
* `/kb/unihub`
* `/kb/student`
* `/kb/counsellor`
* `/kb/ai-interview`
* `/kb/flagship`
* Any other existing KB site page

### 17.1 Reorder Tabs

Current tabs should be improved to this order:

```text
Overview | For Business | Modules | Features | Known Technical Liabilities | Risk Areas | Enhancement
```

### 17.2 “For Business” Tab

Add a new tab called:

```text
For Business
```

This tab should include:

* Plain-English purpose
* Current status
* Main user groups
* Main workflows
* Top 3 business issues
* Top 3 technical/business risks in plain language
* Top 3 enhancement opportunities
* Phase dependency
* Recommended next action
* What success looks like

### 17.3 Default Business View via Query Param

If the URL contains:

```text
?audience=business
```

Then the `For Business` tab should be active by default.

This allows business-friendly links to be shared directly.

### 17.4 Tab Active State

Active tab:

* Text color: `--color-accent`
* Underline: `--color-accent`

Inactive tabs:

* Text color: `--color-text-dim`

### 17.5 Phase Connection Banner

At the top of each KB site page, add a banner:

```text
📍 This site is primarily affected by: Phase 1 (Foundation) + Phase 3 (Sales UX)
View those phases →
```

Use actual relevant phases if available.

### 17.6 Severity Color Coding

Risk and issue severity must be visually clear:

* Critical:

  * Red badge
  * `--color-danger` left border
* High:

  * Amber badge
  * `--color-accent-warm`
* Medium:

  * Grey badge
* Low:

  * Dim text
  * No strong badge

---

## 18. GLOBAL NAVIGATION AND UX

### 18.1 Breadcrumbs

Add breadcrumbs on all sub-pages.

Example:

```text
WiseAdmit HQ → Knowledge Base → Admin Dashboard
```

### 18.2 Sticky Navigation

Make nav sticky on scroll.

Use:

```css
backdrop-filter: blur(12px);
background: rgba(...);
```

Keep it subtle and premium.

### 18.3 Global Search

Add a global search bar in the nav if feasible.

Search should cover:

* Phase names
* Task items
* Site names
* Module names
* Feature names
* Enhancement names

Use Fuse.js only if already available or trivial to add.

Keyboard shortcut:

```text
Cmd+K / Ctrl+K
```

If time-constrained, do not add dependency. Add a clear TODO placeholder:

```html
<!-- TODO: global fuzzy search across roadmap and KB -->
```

### 18.4 Last Updated Timestamp

Add timestamp in footer and homepage.

Example:

```text
Last updated: [date] · Next roadmap review: [date]
```

---

## 19. CONTENT AUDIT AND LANGUAGE REPLACEMENTS

Replace overly technical or unclear language globally.

| Current Text                                    | Replace With                            |
| ----------------------------------------------- | --------------------------------------- |
| Partially Mocked                                | In Progress — Backend Incomplete        |
| Tech Debt Items                                 | Known Technical Liabilities             |
| Enhancement Readiness                           | Ready to Improve                        |
| Features Done / Incomplete                      | Working Features / Features In Progress |
| SPA, monolithic frontend, feature-based modules | Remove from business-facing views       |
| Redux + React Query                             | Remove from business-facing views       |
| XYFlow 12.4.1                                   | Remove from business-facing views       |
| Socket.io 4.6.0                                 | Remove from business-facing views       |

Important:

* Do not remove technical details from developer views.
* Remove or hide technical stack details only from business-facing views.
* Add one-line business summaries to every phase.
* Every major technical section should have a plain-English explanation.

---

## 20. VISUAL TAGS TO USE CONSISTENTLY

Use these labels across the site where appropriate:

* Critical
* High Priority
* Ready to Build
* Needs Review
* Business Impact
* Dev Dependency
* Automation
* AI Assist
* Human Review Required
* SLA Risk
* Bot Interacted
* Needs Human Follow-up
* High Intent from Bot
* Ready to Improve

---

## 21. RESPONSIVE DESIGN REQUIREMENTS

The site must work well on:

* Desktop
* Tablet
* Mobile at 375px width

Use responsive grids such as:

```css
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
```

Do not create layouts that overflow horizontally.

Cards should stack cleanly on mobile.

Roadmap phase cards and KB cards must remain readable on small screens.

---

## 22. IMPLEMENTATION INSTRUCTIONS

Follow this implementation order:

### Step 1 — Inspect the Repo

First inspect:

* Framework
* Routing structure
* Component structure
* Styling system
* Data/content source
* Existing card components
* Existing tab components
* Existing roadmap data
* Existing Knowledge Base data

### Step 2 — Add Design Tokens

Implement the global design system first.

Do not create random one-off styles unless necessary.

### Step 3 — Add Audience View Logic

Implement Business View / Engineering View / Full View toggle for roadmap.

Also implement `?audience=business` tab behavior on KB site pages.

### Step 4 — Add WhatsApp PRD Content

Add the WhatsApp Bot Interaction Summary feature in:

* Roadmap Phase 2
* Roadmap Phase 3
* Roadmap Phase 4
* `/kb/admin` Enhancement tab
* Communication Automation section/page if appropriate
* Homepage “Recently added PRD updates” section

### Step 5 — Redesign Homepage

Make it executive-readable.

### Step 6 — Redesign Roadmap

Improve guardrails, phase cards, tabs, audience toggle, and progress indicator.

### Step 7 — Redesign Knowledge Base Index

Improve status legend, cards, critical issues callout, and accordion.

### Step 8 — Redesign Individual KB Pages

Add For Business tab, phase connection banner, severity styling, and better tab active states.

### Step 9 — Add Navigation Improvements

Add breadcrumbs, sticky nav, footer timestamp, and search if feasible.

### Step 10 — Run Checks

Run available commands:

```bash
npm run build
npm run lint
npm run typecheck
```

If one does not exist, note it clearly.

Fix obvious UI/build regressions.

---

## 23. IMPORTANT CONSTRAINTS

* Do not break existing routes.
* Do not remove existing data.
* Do not remove strategic guardrails.
* Do not overengineer.
* Do not add external dependencies unless necessary.
* Do not implement real WhatsApp/Slack backend integration unless the repo already supports it.
* This is a documentation and PRD presentation update, not a backend integration task.
* Use static examples where needed.
* Dark theme is the intended direction. Do not add a light mode toggle.
* Use Google Fonts CDN for Inter if appropriate.
* Use JetBrains Mono or system monospace for tech labels.
* Reuse existing components where possible.
* Create reusable components only when clearly helpful.
* Preserve all current content, but improve structure, wording, and presentation.
* No clarification is required before implementation. Use judgment for micro-decisions.

---

## 24. FINAL DELIVERABLES

Deliver:

1. Updated homepage with clearer business and engineering positioning
2. Improved roadmap layout and content hierarchy
3. WhatsApp Bot Interaction Summary requirement added across relevant roadmap phases
4. WhatsApp/Slack enhancement added to `/kb/admin`
5. Communication Automation section/page if appropriate
6. Business-readable PRD structure
7. Cleaner dark premium visual design
8. Responsive layout
9. Business View / Engineering View / Full View audience toggle
10. KB pages with For Business tab
11. Phase connection banners
12. Risk and severity color coding
13. Improved Knowledge Base cards
14. Clear strategic guardrails
15. Last updated timestamp
16. Breadcrumbs
17. Build/lint/typecheck confirmation or explanation of any issue

---

## 25. ACCEPTANCE CRITERIA

Before considering the task complete, verify:

* [ ] Existing routes still work
* [ ] Existing content/data has not been removed
* [ ] Dark navy design tokens are applied globally
* [ ] Homepage feels like an executive dashboard
* [ ] Homepage includes “Two Ways to Read This Site”
* [ ] Homepage includes current priority, roadmap status, risks, PRD updates, and quick links
* [ ] Stats bar is redesigned with strong visual hierarchy
* [ ] CTA cards are redesigned with accent strips and clear buttons
* [ ] Roadmap guardrails are visually prominent
* [ ] Roadmap has Business View / Engineering View / Full View toggle
* [ ] Roadmap phases include business objective, deliverables, owner/team, dependencies, metrics, risks, and acceptance criteria
* [ ] Phase cards have visual status differentiation
* [ ] Phase 1 dependency warning is visible
* [ ] Roadmap tab labels are clearer
* [ ] WhatsApp Bot Interaction Summary appears in Phase 2
* [ ] WhatsApp Bot Interaction Summary appears in Phase 3
* [ ] WhatsApp Bot Interaction Summary appears in Phase 4
* [ ] WhatsApp/Slack business callout is visible
* [ ] WhatsApp/Slack enhancement appears in `/kb/admin` under Enhancement
* [ ] WhatsApp feature includes user story, business value, functional requirements, suggested fields, API contracts, and acceptance criteria
* [ ] Human review rule is clearly stated
* [ ] No full AI auto-reply is added
* [ ] Empty state is documented
* [ ] Slack-style update format is documented
* [ ] Communication Automation section/page exists if appropriate
* [ ] KB index has status legend
* [ ] KB index has critical issues callout
* [ ] KB cards show purpose, status, issues, modules, readiness, risks, and next action
* [ ] Individual KB pages include “For Business” tab
* [ ] `?audience=business` opens the For Business tab by default
* [ ] KB pages include phase connection banner
* [ ] Risk/issue severity is color-coded
* [ ] Breadcrumbs appear on sub-pages
* [ ] Sticky nav works
* [ ] Last updated timestamp appears in footer and homepage
* [ ] Language audit replacements are applied
* [ ] Business-facing views hide overly technical stack details
* [ ] Developer-facing views preserve technical detail
* [ ] Site is responsive at 375px mobile width
* [ ] Build passes, or any build issue is explained clearly

---

## 26. FINAL NOTE TO CODING AGENT

This website should no longer feel like a developer-only technical dump.

It should feel like WiseAdmit’s internal operating system for product planning: clear enough for leadership, practical enough for admissions and marketing, and detailed enough for engineering.

Use the dual-audience principle throughout:

* Business users should understand why something matters.
* Developers should understand what needs to be built.
* No critical context should be hidden in technical language.
