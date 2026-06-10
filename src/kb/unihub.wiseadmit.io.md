# Project Intelligence Report: WiseAdmit University Dashboard

---

## 1. PROJECT OVERVIEW

- **Name:** `wiseadmit-university-dashboard` (`package.json:2`)
- **Purpose:** A university-facing SaaS dashboard for international student admissions management. Enables admission officers to discover, invite, evaluate, and manage students; run AI interviews; manage scholarships and bidding; monitor social media; and manage recruitment agents.
- **Tech Stack:**
  - **Framework:** Next.js 15.3.5 (App Router, Turbopack dev mode)
  - **Language:** TypeScript 5.9.2
  - **UI:** React 19, TailwindCSS 4, Radix UI primitives, shadcn/ui pattern, Lucide React icons, Recharts 2.15.4
  - **Auth:** NextAuth v5 beta (`next-auth@5.0.0-beta.29`) + `@auth/prisma-adapter` (installed but **Prisma not used in runtime** — no schema found, no `prisma.` calls in codebase)
  - **State/Fetching:** TanStack Query v5 + Axios
  - **Forms:** Formik + Yup
  - **Real-time:** Native WebSocket + Socket.IO client (`socket.io-client`)
  - **File handling:** jsPDF, jspdf-autotable, jszip, file-saver, csv-parse, csv-stringify
  - **Tour:** react-joyride 3.0.0-7
  - **Notifications:** sonner (toast)

- **Architecture:** Full-stack monolith (Next.js App Router). Frontend + BFF (Next.js API routes for agent management). Core business logic delegated to external REST API (`api-dev-admission.wiseadmit.io`). No Docker, no CI config found.

- **Deployment/Infra hints:**
  - `.env:3` — `NEXT_PUBLIC_BASE_URL=https://api-dev-admission.wiseadmit.io` (dev API)
  - `next.config.ts:10` — CloudFront CDN for images (`d30wxqb3mmk4o.cloudfront.net`)
  - Vercel deployment implied from README
  - No Dockerfile or CI pipeline found
  - **NEXTAUTH_SECRET is hardcoded as `"wiseadmit"` in `.env:8`** — critical security issue

---

## 2. MODULE MAP

| Module | Purpose | Owning Paths | Key Dependencies |
|---|---|---|---|
| **Auth** | Login, session, JWT, role-based routing | `src/auth/auth.ts`, [src/app/api/auth/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/api/auth:0:0-0:0), `middleware.ts` | next-auth, jsonwebtoken, ApiService |
| **Dashboard/Stats** | Main KPI dashboard, AI analytics cards | [src/app/dashboard/page.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/dashboard/page.tsx:0:0-0:0), `src/components/page-components/(protected)/stats/` | TanStack Query, Recharts, ApiService |
| **Students** | Browse/filter/invite/manage student pipeline | `src/app/dashboard/students/`, `src/components/page-components/(protected)/students/`, [src/api/dashboard/student.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/api/dashboard/student.action.ts:0:0-0:0) | ApiService, TanStack Query, jsPDF |
| **Scholarships** | View, create, grant scholarships; bidding engine | `src/app/dashboard/scholarships/`, `src/components/page-components/(protected)/scholarship/`, [src/api/dashboard/bid.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/api/dashboard/bid.action.ts:0:0-0:0) | ApiService, TanStack Query |
| **AI Interviews** | Create/manage AI-driven interviews, send to candidates | `src/app/dashboard/interviews/`, [src/services/interview.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/services/interview.service.ts:0:0-0:0) | Axios (direct, separate AI service URL) |
| **Social Media** | Facebook/Instagram inbox, posts, AI system prompt | `src/app/dashboard/social/`, [src/api/dashboard/social-media.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/api/dashboard/social-media.action.ts:0:0-0:0) | ApiService, TanStack Query |
| **Notifications** | Real-time notifications via WebSocket + Socket.IO | [src/services/notification.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/services/notification.service.ts:0:0-0:0), [src/providers/multi-websocket-provider.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/providers/multi-websocket-provider.tsx:0:0-0:0), [src/config/websocket.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/config/websocket.ts:0:0-0:0) | socket.io-client, ApiService |
| **Agent (Portal)** | Separate agent-role dashboard for CSV-managed agents | [src/app/dashboard/agent/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/dashboard/agent:0:0-0:0), `src/components/page-components/(protected)/agent-*` | csv-storage, Next.js API routes |
| **Agent Management** | University admin manages agents, associations, invites | `src/app/dashboard/agent-management/`, [src/app/api/agent-management/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/api/agent-management:0:0-0:0), [src/lib/csv-storage.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/lib/csv-storage.ts:0:0-0:0) | csv-parse, csv-stringify, fs |
| **Onboarding** | Multi-step wizard for new university setup | `src/app/dashboard/onboarding/`, `src/components/page-components/(protected)/onboarding/` | Formik, ApiService |
| **Settings** | Auto-invite, enrollment goals, criteria, team, passwords | [src/app/dashboard/settings/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/dashboard/settings:0:0-0:0), `src/components/page-components/(protected)/settings/` | ApiService, TanStack Query |
| **Tour Guide** | Interactive onboarding tour across all pages | `src/components/tour/`, [src/contexts/tour-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/contexts/tour-context.tsx:0:0-0:0) | react-joyride |
| **Eligibility Engine** | Client-side student scoring by age/grade/language | [src/services/eligibility.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/services/eligibility.service.ts:0:0-0:0) | None (pure TS) |
| **Knowledge Base** | Document upload (chunked) for AI social media context | [src/api/dashboard/file.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/api/dashboard/file.action.ts:0:0-0:0) | Axios, kb.wiseadmit.io |

**Shared/Core modules used everywhere:**
- [src/services/api.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/services/api.service.ts:0:0-0:0) — single Axios wrapper, all dashboard API calls flow through it
- [src/lib/tanstack-query/query-keys.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/lib/tanstack-query/query-keys.ts:0:0-0:0) — centralized query key registry
- [src/constants/api.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/constants/api.ts:0:0-0:0) — all endpoint path constants
- `src/components/custom-ui/` — shared typography, layout primitives
- [src/components/ui/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/ui:0:0-0:0) — shadcn/ui base components + AI-themed components

---

## 3. CURRENT FEATURE INVENTORY

### Fully Implemented
- Role-based auth (university vs agent) with JWT, middleware guards (`middleware.ts:4-61`)
- Student pipeline: list/filter/search by country, date, type; view/invite/shortlist/accept students
- Scholarship management: CRUD, variants, budget/seat tracking, send scholarship invites
- Bidding engine: create, bulk-create, send, accept university bids
- AI Interviews: create, Q&A management, candidate invitations, score retrieval, analysis trigger
- Social Media: Facebook/Instagram page management, inbox conversations, AI system prompt config, KB file assignment
- Notifications: full REST API + dual WebSocket/Socket.IO real-time delivery
- Agent management: full CSV-backed CRUD (agents, students, applications, invites, associations)
- Agent portal: separate dashboard with own sidebar, profile, students, applications, universities views
- Settings: auto-invite, enrollment goals, admission criteria, student classification, team/user management, password change
- AI analytics endpoints: predictive analytics, opportunity detection, market intelligence, risk assessment, financial optimization, competitive intelligence ([src/api/dashboard/ai-analytics.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/api/dashboard/ai-analytics.ts:0:0-0:0))
- Onboarding wizard: multi-step with sidebar navigation
- Tour guide system: 7-step with page navigation, sub-steps, localStorage persistence
- Settings onboarding: welcome modal, floating checklist, contextual help, setup prompt
- Profile: photo upload (multipart), profile view/edit
- PDF/CSV export: jsPDF, jspdf-autotable, jszip, file-saver wired in
- User management (team): create, update, delete, toggle status for university users

### Partially Implemented / Incomplete
- **[SummaryMetrics](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/page-components/%28protected%29/stats/components/summary-metrics.tsx:58:0-103:1) component** (`stats/components/summary-metrics.tsx:60`): `TODO: Wire these values to real stats` — hardcoded values 150/80/74
- **[ApplicationDocuments.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/page-components/%28protected%29/agent-applications/detail/ApplicationDocuments.tsx:0:0-0:0)** (`agent-applications/detail/ApplicationDocuments.tsx:223`): `TODO: Implement actual file upload` — only logs filename, no upload call
- **[temp.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/page-components/%28protected%29/stats/temp.ts:0:0-0:0)** (`stats/components/temp.ts`, 680 lines): Large hardcoded mock data file — appears to be a dev fixture still in production tree
- **AI Intelligence Panel** ([src/components/ui/ai-intelligence-panel.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/ui/ai-intelligence-panel.tsx:0:0-0:0), [neural-background.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/ui/neural-background.tsx:0:0-0:0)): Rendered in the dashboard but `NeuralBackground` import is unused in final [page.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/dashboard/page.tsx:0:0-0:0) (line 5 imports it but isn't rendered in JSX)
- **Reports module** — directory exists at `src/components/page-components/(protected)/reports/` but is **empty**
- **`invite-to-apply` route** — `src/app/dashboard/invite-to-apply/` exists with only 1 item, no linked nav item
- **Commented-out API proxy rewrites** in `next.config.ts:17-28` — CORS workaround replaced by global headers but proxy config was abandoned mid-implementation
- **Scholarship grants query key** at `query-keys.ts:181` — comment `// Grants related querie` with no actual keys defined

### Legacy / Deprecated Still Active
- `@auth/prisma-adapter` and `@prisma/client` are in `package.json:14-15` but no Prisma schema exists and no `prisma` calls exist in the codebase — unused dead dependency
- Agent auth uses a bespoke [/api/auth/agent-login](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/api/auth/agent-login:0:0-0:0) route with CSV storage (`auth.ts:25-51`) — explicitly commented "This will be replaced with API calls later" (`csv-storage.ts:4`)

---

## 4. DEPENDENCIES & INTEGRATIONS

### External Services
- **Main API** — `https://api-dev-admission.wiseadmit.io/api/v1` (all student/scholarship/bidding/user endpoints)
- **AI Interview Service** — `https://ai-dev.wiseadmit.io/api/v1` (`interview.service.ts:12`) via custom `x-cross-system-auth` header (email-based cross-system auth, **no token**)
- **Knowledge Base / Document Service** — `https://kb.wiseadmit.io/api/uni-hub/documents` (hardcoded in `file.action.ts:9`, not env-driven)
- **Meta (Facebook/Instagram)** — via `ApiConfig.meta` → `"meta"` endpoint on main API (proxied through backend)
- **CloudFront CDN** — `d30wxqb3mmk4o.cloudfront.net` for image delivery
- **Google OAuth avatar** — `lh3.googleusercontent.com` in image domains
- **WebSocket (primary)** — `ws://localhost:8000/api/v1/notifications/ws` (dev) / env `NEXT_PUBLIC_WEBSOCKET_URL_1`
- **Socket.IO (secondary)** — `https://api-dev.wiseadmit.io` (dev) / env `NEXT_PUBLIC_WEBSOCKET_URL_2`

### Internal Dependencies
- Agent management BFF: `src/app/api/agent/` and [src/app/api/agent-management/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/api/agent-management:0:0-0:0) are Next.js API routes that read/write local CSV files on the server filesystem

### Database
- **No direct database** — all persistent data goes through external REST API
- **CSV files** as local agent database (`data/agents.csv`, `data/agent-students.csv`, `data/agent-applications.csv`, `data/university-invites.csv`, `data/agent-university-associations.csv`) — filesystem-based, no ORM

---

## 5. KNOWN ISSUES & TECH DEBT

| Severity | Issue | Location |
|---|---|---|
| **Critical** | `NEXTAUTH_SECRET="wiseadmit"` hardcoded in committed [.env](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/.env:0:0-0:0) | `.env:8` |
| **Critical** | `kb.wiseadmit.io` URL hardcoded, not env-configurable | `file.action.ts:9` |
| **High** | 17 `console.log` statements in production code in [multi-websocket-provider.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/providers/multi-websocket-provider.tsx:0:0-0:0) | [providers/multi-websocket-provider.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/providers/multi-websocket-provider.tsx:0:0-0:0) |
| **High** | [SummaryMetrics](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/page-components/%28protected%29/stats/components/summary-metrics.tsx:58:0-103:1) has hardcoded fake values (150, 80, 74) with TODO | `summary-metrics.tsx:60-83` |
| **High** | Agent document upload is a stub — only logs, never uploads | `ApplicationDocuments.tsx:223` |
| **High** | CSV-based agent storage is not thread-safe and will break on concurrent writes or serverless environments | [csv-storage.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/lib/csv-storage.ts:0:0-0:0) |
| **High** | [temp.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/page-components/%28protected%29/stats/temp.ts:0:0-0:0) (680-line mock data file) is in the production component tree | `stats/components/temp.ts` |
| **Medium** | `console.log("student", student)` leaked in `StudentDetailInsights` | `StudentDetailInsights.tsx:34` |
| **Medium** | `console.log(fetchedApp, "hi")` and `console.log(list)` in `StudentApplicationSheet` | `StudentApplicationSheet.tsx:40,58` |
| **Medium** | Unused imports: `NeuralBackground`, `AIIntelligencePanel` imported but not rendered in [dashboard/page.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/dashboard/page.tsx:0:0-0:0) | `dashboard/page.tsx:5` |
| **Medium** | `@prisma/client` and `@auth/prisma-adapter` are installed but never used | `package.json:14-15` |
| **Medium** | `cancelToken` is incorrectly spread into request body in [ApiService.post](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/services/api.service.ts:170:2-201:3) | `api.service.ts:190-199` |
| **Low** | `console.log("hello")` in [getUploadedFiles](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/api/dashboard/file.action.ts:82:0-95:2) | `file.action.ts:86` |
| **Low** | Empty `reports/` component directory | `page-components/(protected)/reports/` |
| **Low** | AI interview uses email as auth token (`x-cross-system-auth`) — no verification | `interview.service.ts:26` |

### Zero Test Coverage
No test files, test configuration, or test framework found anywhere in the codebase.

---

## 6. REGRESSION RISK AREAS

| Risk Level | Area | Reason |
|---|---|---|
| **Critical** | [src/services/api.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/services/api.service.ts:0:0-0:0) | Every API call in the app flows through this single Axios instance. The interceptor logic (`tokenNeeded` as a header value, not a boolean flag passed correctly) is fragile — changes here break all data fetching |
| **Critical** | `src/auth/auth.ts` | Session shape (`accessToken`, `role`, `universityIds`) is consumed everywhere. JWT encoding/decoding is custom — any shape change breaks all components using `useSession()` |
| **High** | `src/middleware.ts` | Route guard for the entire app. Agent/university role routing logic is tightly coupled — adding a new role requires touching this file |
| **High** | [src/lib/csv-storage.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/lib/csv-storage.ts:0:0-0:0) | Agent portal depends entirely on this. It uses synchronous filesystem I/O — any refactor to async or DB breaks all agent API routes |
| **High** | [src/lib/tanstack-query/query-keys.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/lib/tanstack-query/query-keys.ts:0:0-0:0) | Centralized query key registry — used across all 24 hooks. Renaming or restructuring a key invalidates cache behavior app-wide |
| **Medium** | [src/components/layouts/side-bar.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/layouts/side-bar.tsx:0:0-0:0) | `NAV_ITEMS` array and `TOUR_DATA_ATTRS` mapping are coupled — adding/removing nav items can silently break tour guide steps |
| **Medium** | [src/providers/multi-websocket-provider.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/providers/multi-websocket-provider.tsx:0:0-0:0) | WebSocket context is consumed by notifications dropdown; connection logic has multiple reconnection loops — changes risk creating memory leaks |
| **Medium** | [src/app/dashboard/layout.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/app/dashboard/layout.tsx:0:0-0:0) | Wraps all dashboard pages with `TourProvider`, `AuthLayout`, `WebSocketConnectionManager`, `FloatingChecklist`, `WelcomeModal`, `SetupPromptModal` — side effects from any of these affect every dashboard page |

---

## 7. ENHANCEMENT READINESS

### Ready for New Features (Clean/Well-Structured)
- **`src/api/dashboard/`** — All server actions follow a consistent pattern (ApiService + error propagation). Easy to add new endpoints.
- **[src/lib/tanstack-query/query-keys.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/lib/tanstack-query/query-keys.ts:0:0-0:0)** — Well-organized, easy to extend.
- **[src/components/ui/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/ui:0:0-0:0)** — shadcn/ui base components are stable and reusable.
- **`src/types/`** — Comprehensive type definitions across 31 files; new features should be typeable with minimal gaps.
- **Settings module** — Tab-based structure makes adding new settings tabs straightforward.
- **Scholarship module** — Clean component split (`scholarship-card`, `scholarship-select`, `add-scholarship`, variants display).
- **AI Analytics** — All 6 endpoints defined; hooks (`use-ai-analytics.ts`) are ready; just needs UI components wired.

### Needs Refactoring Before Enhancement

- **[stats/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/page-components/%28protected%29/stats:0:0-0:0) module** — [temp.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/page-components/%28protected%29/stats/temp.ts:0:0-0:0) mock file, hardcoded [SummaryMetrics](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/page-components/%28protected%29/stats/components/summary-metrics.tsx:58:0-103:1) values, and [action-buttons.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/components/page-components/%28protected%29/stats/components/action-buttons.tsx:0:0-0:0) (31KB, 10 `console.log` calls) make this the messiest module. Must be cleaned before adding new dashboard widgets.
- **[multi-websocket-provider.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/providers/multi-websocket-provider.tsx:0:0-0:0)** — 17 `console.log` statements, complex reconnection logic with multiple `useRef`/`useCallback` interdependencies. Needs cleanup before adding new real-time features.
- **Agent management (CSV layer)** — [csv-storage.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/lib/csv-storage.ts:0:0-0:0) must be replaced with proper API calls before any agent feature work. Not deployable to serverless as-is (uses `fs`, synchronous I/O).
- **[api.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/services/api.service.ts:0:0-0:0)** — The `cancelToken` spread-into-body bug and the `tokenNeeded`-as-header pattern should be fixed before building features that require request cancellation.

### Missing Foundational Pieces Blocking New Work
- **No error boundary** — no React error boundaries wrapping any dashboard pages; runtime errors will crash the full layout
- **No global logging/observability** — auth logger is dev-only, no error tracking (Sentry, etc.) wired
- **No test infrastructure** — zero tests means any regression is undetectable without manual QA
- **No API URL consistency** — three different base URLs hardcoded in different places (`NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_AI_URL` defaulting to `ai-dev.wiseadmit.io`, and `kb.wiseadmit.io` hardcoded directly)
- **No env validation** — missing env vars fail silently at runtime

---

## 8. STRUCTURED JSON OUTPUT

```json
{
  "project_name": "wiseadmit-university-dashboard",
  "tech_stack": {
    "framework": "Next.js 15.3.5 (App Router)",
    "language": "TypeScript 5.9.2",
    "runtime": "React 19",
    "styling": "TailwindCSS 4, Radix UI, shadcn/ui pattern",
    "state_fetching": "TanStack Query v5 + Axios",
    "auth": "NextAuth v5 beta (CredentialsProvider, JWT strategy)",
    "real_time": "Native WebSocket + Socket.IO client",
    "forms": "Formik + Yup",
    "charts": "Recharts 2.15.4",
    "pdf_export": "jsPDF + jspdf-autotable + jszip",
    "tour": "react-joyride 3.0.0-7",
    "package_manager": "pnpm"
  },
  "architecture": "Full-stack monolith (Next.js App Router). Frontend + BFF API routes. No DB — delegates to external REST API. CSV filesystem for agent data.",
  "modules": [
    { "name": "auth", "files": ["src/auth/auth.ts", "src/app/api/auth/", "middleware.ts"], "key_deps": ["next-auth", "jsonwebtoken"] },
    { "name": "dashboard_stats", "files": ["src/app/dashboard/page.tsx", "src/components/page-components/(protected)/stats/"], "key_deps": ["TanStack Query", "Recharts", "ai-analytics.ts"] },
    { "name": "students", "files": ["src/app/dashboard/students/", "src/api/dashboard/student.action.ts", "src/components/page-components/(protected)/students/"], "key_deps": ["ApiService", "TanStack Query"] },
    { "name": "scholarships_bidding", "files": ["src/app/dashboard/scholarships/", "src/api/dashboard/bid.action.ts", "src/components/page-components/(protected)/scholarship/"], "key_deps": ["ApiService"] },
    { "name": "ai_interviews", "files": ["src/app/dashboard/interviews/", "src/services/interview.service.ts"], "key_deps": ["Axios (direct)", "ai-dev.wiseadmit.io"] },
    { "name": "social_media", "files": ["src/app/dashboard/social/", "src/api/dashboard/social-media.action.ts", "src/components/page-components/(protected)/social/"], "key_deps": ["ApiService", "Meta API via backend"] },
    { "name": "notifications", "files": ["src/services/notification.service.ts", "src/providers/multi-websocket-provider.tsx", "src/config/websocket.ts"], "key_deps": ["socket.io-client", "WebSocket API"] },
    { "name": "agent_portal", "files": ["src/app/dashboard/agent/", "src/components/page-components/(protected)/agent-*"], "key_deps": ["csv-storage", "Next.js API routes"] },
    { "name": "agent_management", "files": ["src/app/dashboard/agent-management/", "src/app/api/agent-management/", "src/lib/csv-storage.ts"], "key_deps": ["csv-parse", "csv-stringify", "fs"] },
    { "name": "onboarding", "files": ["src/app/dashboard/onboarding/", "src/components/page-components/(protected)/onboarding/"], "key_deps": ["Formik", "ApiService"] },
    { "name": "settings", "files": ["src/app/dashboard/settings/", "src/components/page-components/(protected)/settings/"], "key_deps": ["ApiService", "TanStack Query"] },
    { "name": "tour_guide", "files": ["src/components/tour/", "src/contexts/tour-context.tsx"], "key_deps": ["react-joyride"] },
    { "name": "knowledge_base", "files": ["src/api/dashboard/file.action.ts"], "key_deps": ["Axios", "kb.wiseadmit.io (hardcoded)"] },
    { "name": "eligibility_engine", "files": ["src/services/eligibility.service.ts"], "key_deps": [] }
  ],
  "features_existing": [
    "Role-based auth with JWT (university vs agent roles)",
    "Student pipeline management (browse, filter, invite, shortlist, accept)",
    "Scholarship CRUD with variants, budget/seat tracking",
    "University bidding engine (create, bulk, send, accept)",
    "AI Interview creation, Q&A management, candidate invitations, scoring",
    "Facebook/Instagram inbox and post management",
    "AI system prompt configuration for social media handles",
    "Real-time notifications via dual WebSocket + Socket.IO",
    "Agent management (CSV-backed CRUD for agents, students, applications)",
    "Separate agent portal dashboard",
    "Multi-step university onboarding wizard",
    "Settings: auto-invite, enrollment goals, admission criteria, student classification, team, passwords",
    "7-step interactive tour guide with page navigation and sub-steps",
    "Settings onboarding (welcome modal, checklist, contextual help, setup prompt)",
    "AI analytics endpoints (predictive, opportunity, market intelligence, risk, financial, competitive)",
    "Document chunked upload to KB service",
    "PDF and CSV export",
    "University user team management (CRUD + toggle status)",
    "Profile photo upload",
    "Eligibility scoring engine (age/grade/language)"
  ],
  "features_incomplete": [
    "SummaryMetrics dashboard widget — hardcoded fake data, TODO comment at summary-metrics.tsx:60",
    "Agent application document upload — stub only at ApplicationDocuments.tsx:223",
    "Reports module — empty directory at page-components/(protected)/reports/",
    "invite-to-apply route — exists at app/dashboard/invite-to-apply/ but no nav link",
    "AI Intelligence Panel + NeuralBackground — imported but not rendered in dashboard/page.tsx:5",
    "Scholarship grants query keys — incomplete comment at query-keys.ts:181",
    "API proxy rewrites in next.config.ts — commented out, incomplete CORS solution"
  ],
  "integrations": [
    { "service": "Main Admissions API", "url": "https://api-dev-admission.wiseadmit.io/api/v1", "auth": "Bearer JWT" },
    { "service": "AI Interview Service", "url": "https://ai-dev.wiseadmit.io/api/v1", "auth": "x-cross-system-auth header (email)" },
    { "service": "Knowledge Base Service", "url": "https://kb.wiseadmit.io/api/uni-hub/documents", "auth": "Cookie credentials" },
    { "service": "Meta (Facebook/Instagram)", "url": "Proxied via main API /meta endpoints", "auth": "Bearer JWT" },
    { "service": "CloudFront CDN", "url": "d30wxqb3mmk4o.cloudfront.net", "auth": "None (public)" },
    { "service": "WebSocket Notifications (primary)", "url": "ws://*/api/v1/notifications/ws/{userId}", "auth": "userId in path" },
    { "service": "Socket.IO Notifications (secondary)", "url": "https://api-dev.wiseadmit.io", "auth": "None observed" }
  ],
  "tech_debt": [
    "NEXTAUTH_SECRET hardcoded as 'wiseadmit' in committed .env (.env:8)",
    "kb.wiseadmit.io URL hardcoded in file.action.ts:9 instead of env variable",
    "17 console.log statements in multi-websocket-provider.tsx",
    "SummaryMetrics uses hardcoded static values with TODO (summary-metrics.tsx:60)",
    "temp.ts (680-line mock data) in production component tree",
    "CSV-based agent storage uses sync fs I/O — incompatible with serverless/concurrent environments",
    "cancelToken incorrectly spread into request body in ApiService.post (api.service.ts:190-199)",
    "@prisma/client and @auth/prisma-adapter installed but never used",
    "console.log leaks in StudentDetailInsights, StudentApplicationSheet, file.action.ts",
    "Agent document upload is a non-functional stub",
    "No error boundaries on any page",
    "No test infrastructure (zero tests)",
    "No env variable validation",
    "AI interview cross-system auth uses email as token with no cryptographic verification"
  ],
  "regression_risk_areas": [
    "src/services/api.service.ts — all API calls pass through; interceptor logic is fragile",
    "src/auth/auth.ts — session shape consumed everywhere; custom JWT encoding",
    "middleware.ts — single file guards entire app routing",
    "src/lib/csv-storage.ts — synchronous FS I/O backing entire agent portal",
    "src/lib/tanstack-query/query-keys.ts — centralized cache keys; rename breaks all hooks",
    "src/components/layouts/side-bar.tsx — NAV_ITEMS coupled with tour data-attrs",
    "src/providers/multi-websocket-provider.tsx — reconnection loops risk memory leaks",
    "src/app/dashboard/layout.tsx — wraps all dashboard pages, multiple side-effecting providers"
  ],
  "enhancement_ready_modules": [
    "src/api/dashboard/ — consistent action pattern, easy to add endpoints",
    "src/lib/tanstack-query/query-keys.ts — extensible registry",
    "src/components/ui/ — stable shadcn/ui base components",
    "src/types/ — comprehensive, 31 type files",
    "settings module — tab-based architecture, easy to add tabs",
    "scholarship module — clean component decomposition",
    "ai_analytics — 6 endpoints defined, hooks ready, only UI needed"
  ],
  "needs_refactor_first": [
    "stats/components/ — temp.ts mock file, hardcoded metrics, console.log-heavy action-buttons.tsx",
    "multi-websocket-provider.tsx — 17 console.logs, complex reconnect logic",
    "agent management CSV layer — must migrate from filesystem CSV to API before scaling or serverless deploy",
    "api.service.ts — cancelToken bug, tokenNeeded-as-header pattern needs cleanup",
    "Missing: error boundaries, env validation, logging/observability, test infrastructure"
  ]
}
```

---

**Summary of critical items requiring immediate attention before new work:**
1. `NEXTAUTH_SECRET` in committed [.env](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/.env:0:0-0:0) — rotate immediately
2. `https://kb.wiseadmit.io` hardcoded in `src/api/dashboard/file.action.ts:9` — externalize to env
3. [src/lib/csv-storage.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-university-main/src/lib/csv-storage.ts:0:0-0:0) CSV agent data layer — will fail on any serverless deployment (Vercel, etc.)
4. Zero test coverage — no regression safety net exists