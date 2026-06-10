I'll analyze this codebase systematically. Let me start by exploring the root structure and key configuration files.

























Now I have a complete picture. Let me compile the Project Intelligence Report.

---

## 1. PROJECT OVERVIEW

**Project Name:** Flagship (China-Tech Innovation Workshop 2026)

**Purpose:** A bilingual (Chinese/English) marketing and application platform for recruiting Chinese faculty to teach technology workshops in Kathmandu, Nepal. The platform invites professors to apply for teaching positions in AI, Robotics, and Drone Technology modules for a 10-day program serving 500 Nepali students.

**Tech Stack:**
- **Framework:** Next.js 16.2.6 (App Router) with React 19.2.4
- **Language:** TypeScript 5 (strict mode enabled)
- **Styling:** Tailwind CSS v4 with custom theme colors
- **State Management:** Zustand 5.0.13 (language store)
- **Form Handling:** React Hook Form 7.78.0 + Zod 4.4.3 validation
- **Data Fetching:** TanStack Query (React Query) 5.100.10 + Axios 1.16.0
- **Backend/Database:** Supabase (PostgreSQL + Edge Functions)
- **Icons:** Custom SVG icon system
- **Font:** Inter (Google Fonts)

**Architecture:** Single-page application (SPA) within a single route (`/`). Uses client-side state routing ([landing](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/landing:0:0-0:0) → `apply` → [result](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/result:0:0-0:0)) rather than Next.js file-based routing. Full-stack frontend with external Supabase backend.

**Deployment/Infra:**
- No Dockerfile or CI configs present
- Empty [.env.example](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/.env.example:0:0-0:0) file at root
- Hardcoded Supabase endpoint in `wizard.tsx:23` (`dcomyngyrymzbraxrkhb.supabase.co`)
- Uses public Supabase publishable key for client-side API calls

---

## 2. MODULE MAP

| Module | Purpose | Key Files | Dependencies |
|--------|---------|-----------|--------------|
| **Landing** | Marketing page with hero, stats, benefits, modules, journey, Nepal info, CTA | `src/components/features/landing/*` (9 components), [src/constants/workshop-data.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/constants/workshop-data.ts:0:0-0:0) | `language-store`, `ui/*`, Zustand |
| **Wizard** | Multi-step application form (6 steps: Personal → Academic → Experience → Module → Availability → Card) | `src/components/features/wizard/*` (5 components) | React Hook Form, Zod, `language-store` |
| **Result** | Post-submission success page with faculty card display and faculty wall | [src/components/features/result/result-page.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/result/result-page.tsx:0:0-0:0) | TanStack Query, [useTeacher](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/hooks/useTeacher.ts:3:0-10:2) hook |
| **UI Primitives** | Reusable button, icon, card, logo components | `src/components/ui/*` (7 components) | [cn()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/utils.ts:3:0-5:1) utility, `class-variance-authority` |
| **API Layer** | Axios client + teacher fetching | [src/lib/api/client.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/api/client.ts:0:0-0:0), [getTeachers.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/api/getTeachers.ts:0:0-0:0), [endpoints.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/api/endpoints.ts:0:0-0:0) | Axios, Supabase |
| **State** | Language toggle (cn/en) + placeholder UI store | [src/stores/language-store.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/stores/language-store.ts:0:0-0:0), [uiStore.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/stores/uiStore.ts:0:0-0:0) | Zustand |
| **Types** | TypeScript definitions | [src/types/workshop.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/types/workshop.ts:0:0-0:0), [teacherApplication.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/types/teacherApplication.ts:0:0-0:0), [index.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/types/index.ts:0:0-0:0) | — |

**Shared/Core Modules:**
- [src/lib/utils.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/utils.ts:0:0-0:0) — [cn()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/utils.ts:3:0-5:1) utility for Tailwind class merging (used by 15+ components)
- [src/stores/language-store.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/stores/language-store.ts:0:0-0:0) — Language state (used by all landing/wizard/result components)
- [src/constants/workshop-data.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/constants/workshop-data.ts:0:0-0:0) — 389 lines of content data, wizard step definitions, used across landing and wizard

---

## 3. CURRENT FEATURE INVENTORY

**Fully Implemented:**
- Bilingual landing page (Chinese/English toggle) with animated sections
- Responsive navigation with scroll-aware styling and mobile drawer
- 6-step wizard form with field validation (personal, academic, experience, module selection, availability, faculty card)
- Photo upload with FileReader preview
- Form submission to Supabase Edge Function (`teacher-application-submit`)
- Result page with generated faculty card and "faculty wall" displaying other applicants
- TanStack Query integration with React Query Devtools
- Zod schema validation for each wizard step
- Custom icon system (16 SVG icons)

**Partially Implemented/Incomplete:**
- [src/stores/uiStore.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/stores/uiStore.ts:0:0-0:0) — Empty file (1 byte, no content)
- [src/constants/config.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/constants/config.ts:0:0-0:0) — Empty file (no configuration constants)
- [src/lib/api/endpoints.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/api/endpoints.ts:0:0-0:0) — Defined but unused (AUTH, USERS endpoints stubbed, real endpoint hardcoded in wizard)
- [.env.example](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/.env.example:0:0-0:0) — Empty file (no documented environment variables)

**Commented-Out/Legacy Code:**
- `workshop-data.ts:186-214` — `SAMPLE_FACULTY` array (commented out sample data)
- `hero-poster.tsx:22` — Commented year stat: `// [EVENT.year, lang === "cn" ? "年" : "Year", "cal"]`
- `hero-poster.tsx:28-39` — Large block of commented gradient/grid background code
- `hero-poster.tsx:41` — Commented Image import: `// <Image src={drone} alt="" className="absolute inset-0 h-full w-full object-cover" />`
- `result-page.tsx:70` — Commented color assignment: `// color: CARD_COLORS[index % CARD_COLORS.length]`
- `result-page.tsx:212-218` — Commented email CTA block
- `result-page.tsx:246` — Commented user card in faculty wall: `// <FacultyCard faculty={userCard} lang={lang} />`
- `nav-bar.tsx:66-67` — Commented Logo components
- `logo.tsx:17-29` — Commented WiseAdmit text logo (replaced with SVG images)
- `useTeacher.ts:9` — Commented staleTime config

---

## 4. DEPENDENCIES & INTEGRATIONS

**External Services:**
- **Supabase:** PostgreSQL database + Edge Functions for form submission and data retrieval
  - Submit endpoint: `https://dcomyngyrymzbraxrkhb.supabase.co/functions/v1/teacher-application-submit`
  - Query endpoint: `/functions/v1/get-random-teacher-application`
  - Client configured at `src/lib/api/client.ts:4-10` with hardcoded headers

**Internal Dependencies:**
- Single-page app routing via React state (no Next.js page navigation)
- Language store shared across all feature components
- Wizard data flows: Form → Validation → Submission → Result display

**Database:** Supabase PostgreSQL (via Supabase JS client 2.108.0)
- `teacher_applications` table (schema matches [TeacherApplication](cci:2://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/types/teacherApplication.ts:0:0-33:2) type at `src/types/teacherApplication.ts:1-35`)

---

## 5. KNOWN ISSUES & TECH DEBT

**Hardcoded Values:**
- `wizard.tsx:23` — Hardcoded Supabase function URL (`dcomyngyrymzbraxrkhb.supabase.co`)
- `api/client.ts:4-8` — Hardcoded Supabase URL and API keys from environment
- `result-page.tsx:15-23` — Module name/icon/color mappings duplicated (also in [workshop-data.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/constants/workshop-data.ts:0:0-0:0))

**Missing Error Handling:**
- `api/client.ts:17-20` — Response interceptor returns `err.response?.data ?? err` without structured error handling
- `getTeachers.ts:16-18` — Console logs error but doesn't provide user-friendly error messages

**Unused/Dead Code:**
- [endpoints.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/api/endpoints.ts:0:0-0:0) — AUTH and USERS endpoints defined but never used (actual endpoint hardcoded in wizard)
- [routes.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/constants/routes.ts:0:0-0:0) — LOGIN, REGISTER, DASHBOARD routes defined but no pages exist
- `types/index.ts:7-12` — User interface unused
- [stores/uiStore.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/stores/uiStore.ts:0:0-0:0) — Empty file
- [constants/config.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/constants/config.ts:0:0-0:0) — Empty file

**Type Safety Concerns:**
- `api/client.ts:11-20` — Axios interceptors use `as unknown as` type casting
- `getTeachers.ts:11-13` — Double type casting with `as unknown as ApiResponse`

**Security Considerations:**
- Supabase publishable key used as Bearer token in client-side code (line 121-122 of wizard.tsx)
- No CSRF protection visible for form submission

---

## 6. REGRESSION RISK AREAS

**High Coupling - Critical Files:**
| File | Dependents | Risk |
|------|-----------|------|
| [src/constants/workshop-data.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/constants/workshop-data.ts:0:0-0:0) | 10+ components (landing, wizard, result) | Content changes affect all pages |
| [src/stores/language-store.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/stores/language-store.ts:0:0-0:0) | All UI components | Toggle affects every displayed string |
| [src/lib/utils.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/utils.ts:0:0-0:0) | All components with styling | Change breaks class merging everywhere |
| [src/types/workshop.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/types/workshop.ts:0:0-0:0) | 8 files | Type changes cascade through wizard and landing |

**Side-Effect Prone Areas:**
- [wizard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/wizard/wizard.tsx:0:0-0:0) — 300-line component with mixed concerns (form logic, validation, submission, UI)
- [result-page.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/result/result-page.tsx:0:0-0:0) — Faculty card generation logic tightly coupled to module index positions
- Language toggle triggers re-render of entire app (no component-level memoization visible)

**Critical Functions:**
- [buildFormData()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/wizard/wizard.tsx:64:2-100:4) in `wizard.tsx:65-101` — Maps wizard data to API format; any field change breaks submission
- [getOptionLabel()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/wizard/wizard.tsx:59:2-62:78) in `wizard.tsx:60-63` — Maps indices to text values; relies on option array order

---

## 7. ENHANCEMENT READINESS

**Clean/Ready for Enhancement:**
| Module | Status | Notes |
|--------|--------|-------|
| UI components ([btn.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/ui/btn.tsx:0:0-0:0), [icon.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/ui/icon.tsx:0:0-0:0), [faculty-card.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/ui/faculty-card.tsx:0:0-0:0)) | Ready | Well-structured, CVA variants, isolated |
| [step-rail.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/wizard/step-rail.tsx:0:0-0:0) | Ready | Pure presentational, no side effects |
| [field.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/wizard/field.tsx:0:0-0:0) | Ready | Field type switch is extensible |
| [language-store.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/stores/language-store.ts:0:0-0:0) | Ready | Simple Zustand slice, well-typed |

**Needs Refactoring Before Enhancements:**

| Module | Issues | Recommended Actions |
|--------|--------|---------------------|
| [wizard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/wizard/wizard.tsx:0:0-0:0) | 300 lines, mixed concerns, hardcoded URL | Extract API logic to `src/lib/api/submitApplication.ts`, create custom hook `useWizardSubmit` |
| [result-page.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/components/features/result/result-page.tsx:0:0-0:0) | 267 lines, duplicated module mappings, inline transformations | Extract `useFacultyCard()` hook, create module config mapper |
| [workshop-data.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/constants/workshop-data.ts:0:0-0:0) | 389 lines, mixes content with wizard field definitions | Split into `content-data.ts` and `wizard-config.ts` |
| [api/client.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/lib/api/client.ts:0:0-0:0) | Commented interceptor code, type casting | Implement proper error handling, remove `any` casting |
| [stores/uiStore.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/flagship/src/stores/uiStore.ts:0:0-0:0) | Empty file | Delete or implement UI state (modal, toast) |

**Missing Foundational Pieces:**
- No centralized error handling (toast notifications, error boundary)
- No logging service (only `console.log` used in `getTeachers.ts:14,17`)
- No authentication middleware (auth routes defined but unused)
- No rate limiting on form submission
- No unit tests or test framework configured

---

## 8. JSON OUTPUT

```json
{
  "project_name": "flagship",
  "tech_stack": {
    "framework": "Next.js 16.2.6",
    "language": "TypeScript 5",
    "ui_library": "React 19.2.4",
    "styling": "Tailwind CSS v4",
    "state_management": "Zustand 5.0.13",
    "form_handling": "React Hook Form 7.78.0 + Zod 4.4.3",
    "data_fetching": "TanStack Query 5.100.10 + Axios 1.16.0",
    "backend": "Supabase 2.108.0"
  },
  "architecture": "SPA within single Next.js route, client-side routing via React state, external Supabase backend",
  "modules": [
    {
      "name": "landing",
      "purpose": "Marketing page with bilingual content",
      "files": [
        "src/components/features/landing/hero-poster.tsx",
        "src/components/features/landing/nav-bar.tsx",
        "src/components/features/landing/modules-section.tsx",
        "src/components/features/landing/journey-section.tsx",
        "src/components/features/landing/perks-section.tsx",
        "src/components/features/landing/why-section.tsx",
        "src/components/features/landing/nepal-section.tsx",
        "src/components/features/landing/final-cta.tsx",
        "src/components/features/landing/facts-strip.tsx"
      ]
    },
    {
      "name": "wizard",
      "purpose": "Multi-step application form with validation",
      "files": [
        "src/components/features/wizard/wizard.tsx",
        "src/components/features/wizard/wizard-schema.ts",
        "src/components/features/wizard/field.tsx",
        "src/components/features/wizard/card-build-step.tsx",
        "src/components/features/wizard/step-rail.tsx"
      ]
    },
    {
      "name": "result",
      "purpose": "Post-submission success with faculty display",
      "files": [
        "src/components/features/result/result-page.tsx"
      ]
    },
    {
      "name": "ui",
      "purpose": "Shared UI primitives",
      "files": [
        "src/components/ui/btn.tsx",
        "src/components/ui/icon.tsx",
        "src/components/ui/faculty-card.tsx",
        "src/components/ui/logo.tsx",
        "src/components/ui/perk-chip.tsx",
        "src/components/ui/section-head.tsx",
        "src/components/ui/placeholder.tsx"
      ]
    },
    {
      "name": "api",
      "purpose": "HTTP client and API calls",
      "files": [
        "src/lib/api/client.ts",
        "src/lib/api/getTeachers.ts",
        "src/lib/api/endpoints.ts"
      ]
    },
    {
      "name": "state",
      "purpose": "Global state management",
      "files": [
        "src/stores/language-store.ts"
      ]
    }
  ],
  "features_existing": [
    "Bilingual landing page (CN/EN toggle)",
    "Responsive navigation with mobile drawer",
    "6-step application wizard with validation",
    "Photo upload with FileReader preview",
    "Form submission to Supabase Edge Function",
    "Result page with generated faculty card",
    "Faculty wall displaying other applicants",
    "TanStack Query with devtools",
    "Zod schema validation",
    "Custom SVG icon system"
  ],
  "features_incomplete": [
    "src/stores/uiStore.ts is empty",
    "src/constants/config.ts is empty",
    "src/constants/routes.ts defines unused auth routes",
    "src/lib/api/endpoints.ts unused for actual API calls",
    ".env.example is empty"
  ],
  "integrations": [
    {
      "service": "Supabase",
      "usage": "PostgreSQL database + Edge Functions for teacher applications",
      "endpoints": [
        "https://dcomyngyrymzbraxrkhb.supabase.co/functions/v1/teacher-application-submit",
        "/functions/v1/get-random-teacher-application"
      ]
    }
  ],
  "tech_debt": [
    "Hardcoded Supabase URL in wizard.tsx:23",
    "Hardcoded API endpoint strings instead of using ENDPOINTS constant",
    "300-line wizard.tsx with mixed concerns",
    "Type casting with 'as unknown as' in api/client.ts and getTeachers.ts",
    "Unused AUTH/USERS endpoint definitions",
    "Empty files: uiStore.ts, config.ts, .env.example",
    "Supabase publishable key used as Bearer token client-side",
    "No centralized error handling or logging"
  ],
  "regression_risk_areas": [
    {
      "file": "src/constants/workshop-data.ts",
      "risk": "High - 10+ components depend on this content data",
      "lines": "389"
    },
    {
      "file": "src/components/features/wizard/wizard.tsx",
      "risk": "High - Single file handles form, validation, submission, UI",
      "lines": "300"
    },
    {
      "file": "src/stores/language-store.ts",
      "risk": "Medium - Change triggers re-render of entire app",
      "lines": "15"
    },
    {
      "function": "buildFormData() in wizard.tsx:65-101",
      "risk": "High - Maps wizard fields to API; field changes break submission"
    }
  ],
  "enhancement_ready_modules": [
    "src/components/ui/btn.tsx",
    "src/components/ui/icon.tsx",
    "src/components/ui/faculty-card.tsx",
    "src/components/features/wizard/step-rail.tsx",
    "src/components/features/wizard/field.tsx",
    "src/stores/language-store.ts"
  ],
  "needs_refactor_first": [
    "src/components/features/wizard/wizard.tsx - Extract API logic and custom hooks",
    "src/components/features/result/result-page.tsx - Extract faculty card generation",
    "src/constants/workshop-data.ts - Split content from wizard configuration",
    "src/lib/api/client.ts - Remove type casting, implement error handling",
    "src/stores/uiStore.ts - Delete or implement UI state management"
  ]
}
```