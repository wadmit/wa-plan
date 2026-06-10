# Project Intelligence Report: `ai-dashboard`

---

## 1. PROJECT OVERVIEW

**Project Name:** `ai-dashboard` (internal package name: [dashboard](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/dashboard:0:0-0:0))

**Purpose:** An admin/recruiter dashboard for **WiseAdmit** — an AI-powered interview platform. It allows organizations to create interview templates, manage candidates (bulk-upload via CSV), send interview invitations, track completed interviews, and review AI-analyzed interview results (scores, per-question feedback, video/audio playback).

**Tech Stack:**

| Layer | Technology | Version |
|---|---|---|
| Language | TypeScript | ~5.7.2 |
| UI Framework | React | ^19.0.0 |
| Build Tool | Vite | ^6.0.3 |
| Styling | Tailwind CSS | ^3.4.16 |
| State Management | Redux Toolkit | ^2.5.0 |
| Routing | React Router DOM | ^7.0.2 |
| HTTP Client | Axios | ^1.7.9 |
| Forms | React Hook Form + Yup | ^7.54.0 / ^1.5.0 |
| Drag & Drop | @dnd-kit/core + sortable | ^6.3.1 / ^10.0.0 |
| CSV Parsing | PapaParse | ^5.4.1 |
| Auth Storage | js-cookie | ^3.0.5 |
| Notifications | react-toastify | ^10.0.6 |
| Utility | lodash | ^4.17.21 |

**Architecture:** **Monolith SPA (Single-Page Application)**. No SSR, no microservices. Pure client-side React with a REST backend. The app is structured as a feature-based module layout under `src/screens/`.

**Deployment/Infra Hints:**
- No Dockerfile, no CI/CD config (no `.github/`, no `docker-compose.yml`)
- `@c:\Users\subha\OneDrive\Documents\GitHub\ai-dashboard\.env:1-3` reveals two backends: local (`http://127.0.0.1:8000/api/v1`) and a staging URL (`https://ai-dev.wiseadmit.io/api/v1`)
- CloudFront CDN key: `VITE_DISTRIBUTION_KEY=https://d30wxqb3mmk4o.cloudfront.net` — suggests media assets (interview videos/audio) are served via AWS CloudFront
- No Netlify/Vercel config present

---

## 2. MODULE MAP

### `auth` — Authentication
- **Purpose:** Login flow with cookie-based JWT, profile fetch, Redux state hydration
- **Files:** [src/screens/auth/Login/Login.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/auth/Login/Login.tsx:0:0-0:0), `src/http/services/auth.ts`, [src/store/reducers/auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/store/reducers/auth.ts:0:0-0:0)
- **Key Deps:** `js-cookie`, Redux Toolkit (`authSlice`), `react-router-dom`
- **API Endpoints:** `POST /dashboard/auth/login`, `GET /dashboard/auth/me`

### [interview](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/interview:0:0-0:0) — Create Interview
- **Purpose:** Multi-step form (3 steps) to create an interview: metadata → questions → preview
- **Files:** [src/screens/interview/CreateInterview.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/interview/CreateInterview.tsx:0:0-0:0), `InterviewForm/components/{FirstForm,SecondForm,FinalForm,QuestionAnswer,EditQuestionAnswer}.tsx`
- **Key Deps:** `react-hook-form`, `yup`, `@dnd-kit` (drag-to-reorder questions), `question.ts` service, [interview.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/types/interview.ts:0:0-0:0) service
- **Step navigation:** URL search params (`?index=0|1|2`, `?interview=<id>`)

### [published-interview](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/published-interview:0:0-0:0) — Interview Library
- **Purpose:** View all created interviews as cards; open detail modal showing Q&A and candidate count
- **Files:** [src/screens/published-interview/PublishedInterview.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/published-interview/PublishedInterview.tsx:0:0-0:0), `components/{InterviewCard,InterviewDetailModal,Header,icon}.tsx`
- **Key Deps:** [interview.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/types/interview.ts:0:0-0:0) service

### `candidates` — Candidate Management
- **Purpose:** List candidates with search (debounced), bulk CSV upload, select candidates and send interview invitations
- **Files:** [src/screens/candidates/Candidates.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidates/Candidates.tsx:0:0-0:0), `components/{Table,Header,Avatar,CandidateDetail,InterviewModel}.tsx`
- **Key Deps:** `papaparse`, `lodash` (debounce), `candidate.ts` service, [interview.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/types/interview.ts:0:0-0:0) service

### `candidate-interview` — Completed Interview Tracker
- **Purpose:** View all submitted/completed interviews, filter by status, trigger AI analysis, navigate to detail
- **Files:** [src/screens/candidate-interview/CandidateInterview.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidate-interview/CandidateInterview.tsx:0:0-0:0), `components/{InterviewTable,Header,InterviewVideo}.tsx`
- **Key Deps:** `candidate-interview.ts` service, [interview.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/types/interview.ts:0:0-0:0) service

### `single-candidate-interview` — Interview Review Detail
- **Purpose:** Per-candidate deep dive: overall score, per-question video+audio playback, AI feedback breakdown (JSON parsed), Q&A accordion
- **Files:** [src/screens/candidate-interview/SingleCandidateInterview/SingleCandidate.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidate-interview/SingleCandidateInterview/SingleCandidate.tsx:0:0-0:0), `components/{Header,Overview,SelectedQuestion,VideoAudio,Thumbnail,Accordin,QuesitonAnswerDetail,icons}.tsx`
- **Key Deps:** `candidate-interview.ts` service

### [dashboard](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/dashboard:0:0-0:0) — Home Dashboard
- **Purpose:** Welcome screen with quick-action buttons, recent processed interviews table, candidate list widget
- **Files:** [src/screens/dashboard/Dashboard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/dashboard/Dashboard.tsx:0:0-0:0), `components/{Header,RecentInterviewTable,CandidateList,PublishedInterview}.tsx`
- **Key Deps:** [interview.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/types/interview.ts:0:0-0:0) service, `candidate.ts` service

### `layout` — Shell/Navigation
- **Purpose:** App shell: collapsible sidebar, top navbar, page wrapper
- **Files:** [src/layout/Sidebar/Sidebar.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/layout/Sidebar/Sidebar.tsx:0:0-0:0), [src/layout/Global/GlobalSidebar.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/layout/Global/GlobalSidebar.tsx:0:0-0:0), [src/layout/Global/PageWrapper.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/layout/Global/PageWrapper.tsx:0:0-0:0), `src/layout/Navbar/`
- **Key Deps:** Redux `auth` state (reads `organization`, `first_name`)

### `store` — Global State
- **Purpose:** Redux store; only `auth` slice exists
- **Files:** `src/store/store.ts`, `src/store/hooks.ts`, [src/store/reducers/auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/store/reducers/auth.ts:0:0-0:0)

### `http` — API Layer
- **Purpose:** Centralized axios instance with JWT interceptor and 401 token-refresh logic
- **Files:** `src/http/api.ts`, `src/http/services/{auth,interview,candidate,candidate-interview,question}.ts`

### `utils` / `config` — Shared Utilities
- **Files:** [src/utils/date-format.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/utils/date-format.ts:0:0-0:0), [src/utils/toast.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/utils/toast.ts:0:0-0:0), `src/config/config.ts`

---

## 3. CURRENT FEATURE INVENTORY

### Fully Implemented
- Cookie-based JWT login (`Login.tsx:23-42`)
- Profile fetch and Redux hydration on login
- Create interview: step 1 (metadata, program type, academic discipline)
- Create interview: step 2 (Q&A list with drag-to-reorder via `@dnd-kit`, add/delete questions)
- Create interview: step 3 (preview of saved questions + interview metadata)
- Publish interviews grid view with detail modal
- Candidate list with debounced server-side search
- Bulk candidate import via CSV (PapaParse)
- Send interview invitation to selected candidates
- Completed interviews table with status filter
- Trigger AI analysis for `finished` status interviews
- Single candidate interview review: overall score, Q&A breakdown, per-answer AI feedback (JSON parsed)
- Per-answer video+audio playback (separate media URLs via CloudFront)
- Screen recording video preview inline in the completed interviews table
- Collapsible sidebar navigation

### Partially Implemented / Incomplete

- **Token refresh / auth guard** — The `getProfile` call in `MainLayout` (`App.tsx:37-42`) is **commented out**, meaning the auth guard only checks for cookie presence, not token validity. Any stale cookie bypasses the guard.
- **[handleIndex](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidate-interview/components/InterviewTable.tsx:114:2-118:4) in [CreateInterview.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/interview/CreateInterview.tsx:0:0-0:0)** — [handleIndex](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidate-interview/components/InterviewTable.tsx:114:2-118:4) logs to `console.log(value)` (`CreateInterview.tsx:12`) and does nothing; step navigation is done only via URL params, so the prop is vestigial.
- **"Previous" buttons** in [SecondForm.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/interview/InterviewForm/components/SecondForm.tsx:0:0-0:0) (lines 143-150) and [FinalForm.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/interview/InterviewForm/components/FinalForm.tsx:0:0-0:0) (lines 99-107) are commented out — there is no way to go back in the create-interview flow.
- **AI question generation** — The "Generate questions" button in `SecondForm.tsx:130-133` renders but has no `onClick` handler — the AI generation feature is a stub.
- **"Create new interview" button** (`FirstForm.tsx:111-113`) renders but has no handler.
- **`/questions` route** — Referenced in `Dashboard Header` (`Header.tsx:18`) as a quick-action link but **no route is registered** in `App.tsx`.
- **Candidate `country` and `ai_score` fields** — Hardcoded/commented out in `Table.tsx:17-18, 27-30, 77` — these columns exist in the type but are not displayed and `status` is hardcoded as `"Pending"` (line 252) and `ai_score` as `60` (line 253).
- **"Action" column** in candidates table — commented out (lines 79-86), "Send interview" per-row action removed in favour of multi-select.
- **`CandidateDetail` component** — Imported and rendered in both [Table.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidates/components/Table.tsx:0:0-0:0) and [InterviewTable.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidate-interview/components/InterviewTable.tsx:0:0-0:0) as an expandable row, but `currentIndex` is never set from click events in [Table.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidates/components/Table.tsx:0:0-0:0) (line 111: `console.log(setCurrentIndex)` — setter logged, never wired up).
- **Organization logo in sidebar** — Commented out (`Sidebar.tsx:115-118`).
- **[dashboard/components/PublishedInterview.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/dashboard/components/PublishedInterview.tsx:0:0-0:0)** — Only 128 bytes; likely a placeholder/stub component.

### Deprecated / Legacy Active Code
- `attempts`, `maxAttempts`, `running` module-level variables in `api.ts:10-12` — mutable global state for retry logic that is partially broken (token is never cleared on max retries, lines 50, 57 are commented out)
- Commented-out mock data array in `PublishedInterview.tsx:9-34`

---

## 4. DEPENDENCIES & INTEGRATIONS

**External Services:**
- **WiseAdmit REST API** — Primary backend (`https://ai-dev.wiseadmit.io/api/v1`). All data flows through this. No SDK, raw Axios.
- **AWS CloudFront** — Media CDN (`https://d30wxqb3mmk4o.cloudfront.net`). Used for candidate interview video and audio URLs. The `VITE_DISTRIBUTION_KEY` env var is defined but **never imported or used** anywhere in the source — this appears to be dead config.

**No external auth providers** (no OAuth, no Auth0, no Firebase). Custom JWT via cookies only.

**No payment gateway, no analytics SDK, no WebSocket integration** found.

**Database:** None directly. All persistence is via the REST API backend.

**Internal Dependencies (module-to-module):**
- `candidate-interview/InterviewTable` imports `Avatar` and `CandidateDetail` from [candidates/components](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidates/components:0:0-0:0) — tight cross-module coupling
- `dashboard/components/Header` imports `ClockIcon` from `candidate-interview/SingleCandidateInterview/components/icons` — cross-feature icon import
- `candidate.ts` service imports [ICandidateData](cci:2://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidates/Candidates.tsx:6:0-8:1) interface directly from [screens/candidates/Candidates.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidates/Candidates.tsx:0:0-0:0) — **service layer depends on UI layer** (inverted dependency)

---

## 5. KNOWN ISSUES & TECH DEBT

- **`VITE_DISTRIBUTION_KEY` unused** — Defined in [.env](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/.env:0:0-0:0) but never consumed in code. If CloudFront URLs are meant to be constructed from this, the logic is missing.
- **`api.ts` mutable globals** (`attempts`, `running`) — Module-level state means retry counters are shared across all concurrent requests; parallel 401 failures will corrupt the counter. Lines `src/http/api.ts:10-12`.
- **`Cookies.remove("access_token")` commented out** in `api.ts:50,57` — On max retry exhaustion, the stale token is NOT cleared, creating a redirect loop potential.
- **`console.log(loading)` in `SingleCandidate.tsx:40`** — Debug statement left in production code.
- **`console.log(setCurrentIndex)` in `Table.tsx:111`** — Debug statement; also reveals `setCurrentIndex` is never called, making the expand-row feature dead.
- **`console.log(handleIndex)` in `SecondForm.tsx:26`** — Debug statement.
- **`console.log(interviewData)` in `Header.tsx:6`** (SingleCandidateInterview) — Debug statement.
- **Hardcoded `status: "Pending"` and `ai_score: 60`** in `Table.tsx:252-253` — Real data not wired.
- **Label text bug in `FirstForm.tsx:182`** — The description field label says "Add interview name" (same as title label at line 161). Should be "Add description".
- **`interview_time` hardcoded to `20`** in `interview.ts:20` — Never exposed to the user in the UI form.
- **[IAuthState](cci:2://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/store/reducers/auth.ts:2:0-10:1) missing `organization_id`** in `auth.ts:3-11`, but `FirstForm.tsx:49` reads `state.auth.user?.organization_id` — this field **does not exist** on the Redux state type; it will always be `undefined`, causing `createInterview` to always send `undefined` as `organization_id`.
- **No loading spinner/skeleton UI** — Only plain text "Loading..." strings throughout.
- **[notify()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/utils/toast.ts:2:0-2:55) in [toast.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/utils/toast.ts:0:0-0:0)** — No toast type differentiation (error vs. success). All toasts use the same default style.
- **No 404 route registered** in `App.tsx` — Unknown paths silently fail.
- **No `organization_id` on [IAuthState](cci:2://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/store/reducers/auth.ts:2:0-10:1)** — Critical: interview creation is broken for users whose org ID is not stored in state (see above).

---

## 6. REGRESSION RISK AREAS

| File/Function | Risk Reason |
|---|---|
| `src/http/api.ts` — interceptors | All HTTP calls pass through this; any change here affects every service module |
| [src/store/reducers/auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/store/reducers/auth.ts:0:0-0:0) — [IAuthState](cci:2://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/store/reducers/auth.ts:2:0-10:1) / [setCurrentUser](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/store/reducers/auth.ts:19:4-21:5) | Used by [Sidebar](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/layout/Sidebar:0:0-0:0), [InterviewTable](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidate-interview/components/InterviewTable.tsx:104:0-226:2), [RecentInterviewTable](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/dashboard/components/RecentInterviewTable.tsx:59:0-141:2), [FirstForm](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/interview/InterviewForm/components/FirstForm.tsx:40:0-196:2), `Dashboard/Header` — all read from `state.auth.user` |
| `src/http/services/interview.ts` — `getInterviewCandidates` | Called from both [InterviewTable](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidate-interview/components/InterviewTable.tsx:104:0-226:2) (candidate-interview screen) and [RecentInterviewTable](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/dashboard/components/RecentInterviewTable.tsx:59:0-141:2) (dashboard) with different `status` params |
| [src/screens/candidates/components/Avatar.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidates/components/Avatar.tsx:0:0-0:0) | Re-used in both `candidates/Table.tsx` and `candidate-interview/InterviewTable.tsx` |
| [src/screens/candidates/components/CandidateDetail.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidates/components/CandidateDetail.tsx:0:0-0:0) | Imported in both `candidates/Table.tsx` and `candidate-interview/InterviewTable.tsx` |
| [src/utils/toast.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/utils/toast.ts:0:0-0:0) — [notify](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/utils/toast.ts:2:0-2:55) | Called from 15+ locations across all modules; signature change would break everything |
| `App.tsx` — route definitions + `MainLayout` | Auth guard logic and all route registrations live here; any change affects every protected page |
| [IInterview](cci:2://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/types/interview.ts:12:0-23:1) type ([src/types/interview.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/types/interview.ts:0:0-0:0)) | Used across [published-interview](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/published-interview:0:0-0:0), `candidates`, [interview](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/interview:0:0-0:0), [dashboard](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/dashboard:0:0-0:0) modules |

---

## 7. ENHANCEMENT READINESS

### Clean/Ready for New Features
- **`src/utils/`** — [toast.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/utils/toast.ts:0:0-0:0) and [date-format.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/utils/date-format.ts:0:0-0:0) are minimal and stable
- **`src/http/services/`** — Service functions are thin wrappers; easy to extend with new endpoints
- **[published-interview](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/published-interview:0:0-0:0)** — [InterviewDetailModal](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/published-interview/components/InterviewDetailModal.tsx:5:0-118:2) and `InterviewCard` are clean; adding edit/delete actions is low-risk
- **`src/types/`** — Type definitions are centralized; adding new interfaces is safe

### Needs Refactoring Before Enhancements
- **`src/http/api.ts`** — Global mutable retry state must be replaced with a proper per-request retry mechanism before adding more authenticated endpoints
- **[src/store/reducers/auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/store/reducers/auth.ts:0:0-0:0)** — [IAuthState](cci:2://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/store/reducers/auth.ts:2:0-10:1) is missing `organization_id`; fixes needed before any feature relying on org context (interview creation is currently broken)
- **`MainLayout` in `App.tsx`** — Auth guard is incomplete (profile validation commented out); route protection must be properly implemented before adding more protected routes
- **[src/screens/candidates/components/Table.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidates/components/Table.tsx:0:0-0:0)** — [formatData](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/dashboard/components/CandidateList.tsx:12:0-32:2) is a plain function returning JSX (not a React component), cannot use hooks; expand-row (`currentIndex`) is wired to nothing; needs full refactor into a proper component
- **[src/screens/candidate-interview/components/InterviewTable.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/candidate-interview/components/InterviewTable.tsx:0:0-0:0)** — Same [formatData](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-dashboard/src/screens/dashboard/components/CandidateList.tsx:12:0-32:2) anti-pattern

### Missing Foundational Pieces Blocking New Work
- **No route-level auth guard** (PrivateRoute wrapper) — the current approach in `MainLayout` is only a `useEffect` redirect, not a true guard
- **No centralized error handling** — each component catches errors independently with `console.log`; no global error boundary
- **No logging infrastructure** — only `console.log` scattered throughout
- **No test infrastructure** — zero test files, no `vitest`/`jest` config, no `testing-library` dependency
- **`/questions` route** — referenced in Dashboard header shortcut but missing from the router

---

## 8. STRUCTURED JSON OUTPUT

```json
{
  "project_name": "ai-dashboard (WiseAdmit Admin Dashboard)",
  "tech_stack": {
    "language": "TypeScript ~5.7.2",
    "framework": "React ^19.0.0",
    "build_tool": "Vite ^6.0.3",
    "styling": "TailwindCSS ^3.4.16",
    "state_management": "Redux Toolkit ^2.5.0",
    "routing": "React Router DOM ^7.0.2",
    "http_client": "Axios ^1.7.9",
    "forms": "React Hook Form ^7.54.0 + Yup ^1.5.0",
    "drag_and_drop": "@dnd-kit/core ^6.3.1",
    "csv_parsing": "PapaParse ^5.4.1",
    "auth_storage": "js-cookie ^3.0.5",
    "notifications": "react-toastify ^10.0.6",
    "utilities": "lodash ^4.17.21"
  },
  "architecture": "Monolith SPA, feature-based folder structure, client-side only, REST API backend",
  "modules": [
    {
      "name": "auth",
      "purpose": "JWT login, profile fetch, Redux auth state hydration",
      "files": ["src/screens/auth/Login/Login.tsx", "src/http/services/auth.ts", "src/store/reducers/auth.ts"],
      "key_deps": ["js-cookie", "redux-toolkit", "react-router-dom"]
    },
    {
      "name": "interview",
      "purpose": "3-step interview creation: metadata, Q&A with drag-reorder, preview",
      "files": ["src/screens/interview/CreateInterview.tsx", "src/screens/interview/InterviewForm/components/"],
      "key_deps": ["react-hook-form", "yup", "@dnd-kit", "src/http/services/interview.ts", "src/http/services/question.ts"]
    },
    {
      "name": "published-interview",
      "purpose": "Browse and inspect published interview templates",
      "files": ["src/screens/published-interview/PublishedInterview.tsx", "src/screens/published-interview/components/"],
      "key_deps": ["src/http/services/interview.ts"]
    },
    {
      "name": "candidates",
      "purpose": "List, search, CSV-bulk-import candidates; send interview invitations",
      "files": ["src/screens/candidates/Candidates.tsx", "src/screens/candidates/components/"],
      "key_deps": ["papaparse", "lodash", "src/http/services/candidate.ts", "src/http/services/interview.ts"]
    },
    {
      "name": "candidate-interview",
      "purpose": "View completed/processed interviews, filter by status, trigger AI analysis",
      "files": ["src/screens/candidate-interview/CandidateInterview.tsx", "src/screens/candidate-interview/components/"],
      "key_deps": ["src/http/services/candidate-interview.ts", "src/http/services/interview.ts"]
    },
    {
      "name": "single-candidate-interview",
      "purpose": "Deep review of one candidate: score, Q&A, per-answer video/audio, AI feedback",
      "files": ["src/screens/candidate-interview/SingleCandidateInterview/"],
      "key_deps": ["src/http/services/candidate-interview.ts"]
    },
    {
      "name": "dashboard",
      "purpose": "Home screen: quick actions, recent interviews table, candidates widget",
      "files": ["src/screens/dashboard/Dashboard.tsx", "src/screens/dashboard/components/"],
      "key_deps": ["src/http/services/interview.ts", "src/http/services/candidate.ts"]
    },
    {
      "name": "layout",
      "purpose": "App shell: collapsible sidebar, navbar, page wrapper",
      "files": ["src/layout/Sidebar/Sidebar.tsx", "src/layout/Global/GlobalSidebar.tsx", "src/layout/Navbar/"],
      "key_deps": ["src/store/reducers/auth.ts"]
    },
    {
      "name": "store",
      "purpose": "Redux global state (auth only)",
      "files": ["src/store/store.ts", "src/store/hooks.ts", "src/store/reducers/auth.ts"],
      "key_deps": ["@reduxjs/toolkit"]
    },
    {
      "name": "http",
      "purpose": "Axios instance with JWT interceptor and 401 retry; all API service functions",
      "files": ["src/http/api.ts", "src/http/services/"],
      "key_deps": ["axios", "js-cookie"]
    }
  ],
  "features_existing": [
    "Cookie-based JWT login and logout redirect",
    "User profile fetch and Redux state hydration",
    "3-step interview creation flow (metadata, Q&A, preview)",
    "Drag-to-reorder questions in interview creation (dnd-kit)",
    "Published interviews grid with detail modal (Q&A + candidate count)",
    "Candidate list with debounced server-side search",
    "Bulk candidate import via CSV (PapaParse)",
    "Multi-select candidates and send interview invitation",
    "Completed interviews table with status filter",
    "Trigger AI analysis for 'finished' interviews",
    "Single candidate interview review: score, Q&A, AI feedback (JSON)",
    "Per-answer video and audio playback (separate media URLs)",
    "Screen recording inline preview in completed interviews table",
    "Collapsible sidebar with active-route highlighting",
    "Toast notifications via react-toastify",
    "Dashboard home with recent interviews and candidates widget"
  ],
  "features_incomplete": [
    "Auth guard token validation commented out (App.tsx:37-42) — only cookie presence checked",
    "AI question generation button in SecondForm.tsx:130 has no onClick handler — stub UI only",
    "'Previous' navigation buttons in SecondForm and FinalForm commented out",
    "'Create new interview' button in FirstForm.tsx:111 has no handler",
    "/questions route referenced in Dashboard Header (Header.tsx:18) but not registered in App.tsx",
    "CandidateDetail expandable row in candidates Table.tsx never triggers (setCurrentIndex never called, line 111)",
    "Candidate status is hardcoded 'Pending' and ai_score hardcoded 60 in Table.tsx:252-253",
    "organization_id missing from IAuthState (auth.ts) — createInterview always sends undefined org ID",
    "VITE_DISTRIBUTION_KEY env var defined but never imported or used anywhere",
    "dashboard/components/PublishedInterview.tsx is a 128-byte stub"
  ],
  "integrations": [
    {
      "name": "WiseAdmit REST API",
      "type": "Primary backend",
      "base_url": "https://ai-dev.wiseadmit.io/api/v1",
      "auth": "Bearer JWT via cookie",
      "endpoints": [
        "POST /dashboard/auth/login",
        "GET /dashboard/auth/me",
        "POST /dashboard/interview/",
        "GET /dashboard/interview/",
        "GET /dashboard/interview/:id",
        "POST /dashboard/interview/send-invitation/:id",
        "GET /dashboard/organizations/:org_id",
        "POST /dashboard/candidate/",
        "GET /dashboard/candidate/",
        "GET /dashboard/candidate-interview/analyze/:id",
        "GET /dashboard/candidate-interview/:id",
        "POST /dashboard/qa/",
        "GET /dashboard/questions/:id"
      ]
    },
    {
      "name": "AWS CloudFront",
      "type": "Media CDN",
      "url": "https://d30wxqb3mmk4o.cloudfront.net",
      "usage": "Video and audio URLs for candidate interview answers"
    }
  ],
  "tech_debt": [
    "Global mutable retry state in api.ts:10-12 (attempts, running) — unsafe for concurrent requests",
    "Cookies.remove('access_token') commented out in api.ts:50,57 — stale tokens not cleared on auth failure",
    "organization_id missing from IAuthState in auth.ts — interview creation sends undefined",
    "console.log debug statements in SingleCandidate.tsx:40, Table.tsx:111, SecondForm.tsx:26, Header.tsx:6",
    "formatData() is a plain JSX function (not a React component) in Table.tsx and InterviewTable.tsx — cannot use hooks",
    "candidate.ts service imports ICandidateData from screens layer (inverted dependency, candidate.ts:1)",
    "cross-module icon import: dashboard/Header.tsx imports ClockIcon from candidate-interview module",
    "Avatar and CandidateDetail components cross-imported between candidates and candidate-interview modules",
    "Label text bug in FirstForm.tsx:182 — description label says 'Add interview name' instead of 'Add description'",
    "interview_time hardcoded to 20 in interview.ts:20 — not user-configurable",
    "No 404 fallback route in App.tsx",
    "No test infrastructure (no vitest/jest, no testing-library, zero test files)",
    "No global error boundary",
    "No centralized error handling — all errors caught individually with console.log",
    "notify() has no error/success/warning differentiation — all toasts are default type"
  ],
  "regression_risk_areas": [
    "src/http/api.ts — all HTTP traffic passes through; interceptor changes affect every module",
    "src/store/reducers/auth.ts + IAuthState — read by Sidebar, InterviewTable, RecentInterviewTable, FirstForm, Dashboard Header",
    "src/http/services/interview.ts:getInterviewCandidates — called from both dashboard and candidate-interview screens with different params",
    "src/utils/toast.ts:notify — called 15+ times across all modules",
    "src/App.tsx:MainLayout — auth guard and all route definitions centralised here",
    "src/types/interview.ts:IInterview — consumed by published-interview, candidates, interview, dashboard modules",
    "src/screens/candidates/components/Avatar.tsx — shared between candidates and candidate-interview modules",
    "src/screens/candidates/components/CandidateDetail.tsx — shared between candidates and candidate-interview modules"
  ],
  "enhancement_ready_modules": [
    "src/utils/ — minimal, stable utility functions",
    "src/http/services/ — thin REST wrappers, easy to extend",
    "src/screens/published-interview/ — clean component structure, ready for edit/delete actions",
    "src/types/ — centralized interfaces, safe to extend",
    "src/screens/candidate-interview/SingleCandidateInterview/ — well-structured detail view"
  ],
  "needs_refactor_first": [
    "src/store/reducers/auth.ts — add organization_id to IAuthState before any org-dependent feature",
    "src/http/api.ts — replace module-level mutable retry state with per-request logic",
    "src/App.tsx:MainLayout — implement proper PrivateRoute guard (uncomment/fix getProfile validation)",
    "src/screens/candidates/components/Table.tsx — refactor formatData from plain JSX function to React component; wire setCurrentIndex to row clicks",
    "src/screens/candidate-interview/components/InterviewTable.tsx — same formatData anti-pattern",
    "src/http/services/candidate.ts — remove import of ICandidateData from UI screen layer; define type in src/types/"
  ]
}
```

---

**Summary:** This is a functional but early-stage React 19 SPA for the WiseAdmit AI interview platform. The core flows (create interview, manage candidates, review AI results) are in place. The most critical blocking issues are: **(1)** `organization_id` missing from Redux auth state breaking interview creation, **(2)** the auth guard being a stub, and **(3)** the AI question generation feature being UI-only with no backend wiring. No test infrastructure exists at all.