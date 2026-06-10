# Project Intelligence Report: wiseadmit-counsellor

## 1. PROJECT OVERVIEW

| Field | Value |
|-------|-------|
| **Project Name** | [wiseadmit-counsellor](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor:0:0-0:0) (v0.0.0) |
| **Purpose** | Education counselor dashboard for matching students with educational programs and scholarships, primarily targeting Chinese universities |
| **Architecture** | Frontend SPA (Single Page Application) |
| **Deployment** | Vite-based build, no CI/CD configs, no Dockerfile detected |

## 2. TECH STACK

| Category | Technologies |
|----------|--------------|
| **Language** | TypeScript 5.7.2 ([tsconfig.json](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/tsconfig.json:0:0-0:0), [tsconfig.app.json](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/tsconfig.app.json:0:0-0:0), [tsconfig.node.json](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/tsconfig.node.json:0:0-0:0)) |
| **Framework** | React 18.3.1 with Vite 6.2.0 |
| **Routing** | `react-router-dom` v6.26.2 |
| **State/Data** | `@tanstack/react-query` v5.56.2 (server state), React Hook Form + Zod (form state) |
| **UI Library** | Radix UI primitives (28+ components), TailwindCSS 4.0.17, shadcn/ui pattern |
| **Animation** | `framer-motion` v12.5.0 |
| **Icons** | `lucide-react` v0.462.0 |
| **Charts** | `recharts` v2.12.7 |
| **Date** | `date-fns` v3.6.0 |
| **Toast/Feedback** | `sonner` v1.5.0, custom toast hook |

## 3. MODULE MAP

### Feature Modules

| Module | Files | Purpose | Key Dependencies |
|--------|-------|---------|------------------|
| **Student Matching** | [StudentMatchForm.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/StudentMatchForm.tsx:0:0-0:0), [StudentMatchScore.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/StudentMatchScore.tsx:0:0-0:0) | Multi-step wizard for student profile input with scoring algorithm | `react-hook-form`, `zod`, `framer-motion` |
| **Program Discovery** | [ProgramCard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/ProgramCard.tsx:0:0-0:0), [Index.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/pages/Index.tsx:0:0-0:0) | Program listing with search, sort, filtering | `react-query`, `lucide-react` |
| **Program Details** | `program-details/*` (9 files) | Detailed program view with benefits, requirements, FAQ, rankings | Radix UI, Tailwind |
| **Scholarships** | [ScholarshipCard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/ScholarshipCard.tsx:0:0-0:0), [ScholarshipDetailModal.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/ScholarshipDetailModal.tsx:0:0-0:0) | Scholarship listing and detail sidebar | `date-fns`, Radix Sheet |
| **Navigation** | [Header.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/common-components/Header.tsx:0:0-0:0), [Sidebar.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/common-components/Sidebar.tsx:0:0-0:0) | App shell with branding and nav | Inline SVGs |

### Shared/Core Modules

| Module | Files | Purpose |
|--------|-------|---------|
| **UI Components** | `components/ui/*` (49 files) | shadcn/ui design system components |
| **Hooks** | [use-mobile.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/hooks/use-mobile.tsx:0:0-0:0), [use-toast.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/hooks/use-toast.ts:0:0-0:0) | Responsive detection, toast notifications |
| **Utilities** | [lib/utils.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/lib/utils.ts:0:0-0:0) | Tailwind class merging ([cn](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/lib/utils.ts:3:0-5:1) function) |

## 4. CURRENT FEATURE INVENTORY

### ✅ Existing Features

1. **Student Profile Wizard** (`@/components/StudentMatchForm.tsx:1-847`)
   - 5-step form (Basic Info → Grades → Language → Program → Experience)
   - Dynamic field visibility based on education level
   - Zod schema validation
   
2. **Program Matching Engine** (`@/pages/Index.tsx:235-630`)
   - Mock API with sample data (3 programs, 3 scholarships)
   - Search by program/university/discipline
   - Sort by match score or scholarship potential
   - Eligibility and scholarship scoring (0-20 scale)

3. **Program Display** 
   - Card grid with animated progress bars (`@/components/ProgramCard.tsx:30-155`)
   - Featured program badges
   - University logos with lazy loading

4. **Scholarship Management**
   - Deadline tracking with urgency indicators (`@/components/ScholarshipCard.tsx:37-55`)
   - Currency formatting (USD/CNY/EUR)
   - Detail modal with benefits list

5. **Program Details Page** (`@/pages/ProgramDetailsPage.tsx`)
   - Overview, details grid, benefits list
   - Required documents, rankings display
   - FAQ accordion, application sidebar

### ⚠️ Partially Implemented / Stubbed

| Feature | Location | Issue |
|---------|----------|-------|
| **Real API Integration** | `@/pages/Index.tsx:37-42` | API URLs defined but commented out, mock data used |
| **Program Type/Dropdowns** | `@/components/StudentMatchForm.tsx:52-106` | Mock fetch functions with hardcoded arrays |
| **Filters UI** | `@/pages/Index.tsx:408-465` | Visual only - badges don't actually filter |
| **Home Page** | `@/pages/home/index.tsx` | Empty placeholder |
| **NotFound Page** | `@/App.tsx:7` | Imported but file doesn't exist |
| **Empty Files** | `@/common-components/button.tsx`, [svgs.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/common-components/svgs.tsx:0:0-0:0) | Zero-byte files |

### 🔴 Missing/Blocking

1. **NotFound Component** - Referenced in `App.tsx:7` but file not found
2. **Real API Wire-up** - All API calls are mocked with timeouts
3. **Filter Logic** - Filter UI present but non-functional
4. **Authentication** - No auth flow despite "Country admin" hardcoded in header
5. **Error Boundaries** - No error handling at route level

## 5. DEPENDENCIES & INTEGRATIONS

### External Services

| Service | Integration Status | Notes |
|---------|-------------------|-------|
| WiseAdmit API | ⚠️ **Configured but mocked** | `api.wiseadmit.io/api/v1/*` endpoints defined but not used |
| Builder.io | ⚠️ **API key exposed** | `VITE_PUBLIC_BUILDER_KEY=f23a83ab8fdf48d2b3b0f3022388ed6e` in [.env](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/.env:0:0-0:0) |

### Internal Dependencies

- No backend within this repo
- No database/ORM (pure frontend)
- All data flows through React Query (currently mocked)

## 6. KNOWN ISSUES & TECH DEBT

### Code Quality Issues

| Issue | Location | Severity |
|-------|----------|----------|
| **Any type usage** | `@/pages/Index.tsx:237,245,254` | `formData: any`, `data: any` |
| **Hardcoded user** | `@/common-components/Header.tsx:97` | "Sanju Dongol" hardcoded |
| **Missing error handling** | `@/components/StudentMatchForm.tsx:159-161` | Console.error + toast only |
| **Magic numbers** | `@/components/StudentMatchScore.tsx:16` | `maxScore = 20` hardcoded |
| **Dead code** | `@/pages/ProgramDetailsPage.tsx:29-166` | 100+ lines of inline SVG icons |

### Structural Issues

1. **No type definitions folder** - Types scattered in component files (`@/components/program-details/types.ts` is the only centralized type file)
2. **No API layer** - Fetch logic would be inline in components
3. **No constants file** - API URLs, score thresholds scattered
4. **Empty route** - `/` renders [Index](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/pages/Index.tsx:234:0-626:2) but [home/index.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/pages/home/index.tsx:0:0-0:0) is a stub

## 7. REGRESSION RISK AREAS

### High Risk (Many Dependents)

| Module | Dependents | Risk |
|--------|------------|------|
| [StudentMatchForm.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/StudentMatchForm.tsx:0:0-0:0) | Used by [Index.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/pages/Index.tsx:0:0-0:0) for profile creation | Form schema changes affect entire matching flow |
| [ProgramCard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/ProgramCard.tsx:0:0-0:0) | Used in grid listing and detail views | Prop interface changes break listing |
| [Index.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/pages/Index.tsx:0:0-0:0) | Main page component with complex state | Changes to filter/sort affect display logic |
| `ui/*` components | Used across all features | 49 shared components - changes cascade |

### Coupling Risks

1. **Scoring Algorithm Coupling** - [StudentMatchScore.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/StudentMatchScore.tsx:0:0-0:0) and [ProgramCard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/ProgramCard.tsx:0:0-0:0) both implement scoring display logic separately
2. **Mock Data Duplication** - Same sample program data exists in [Index.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/pages/Index.tsx:0:0-0:0) and potentially would be in API layer
3. **Hardcoded SVGs** - Icons embedded in components instead of icon system

## 8. ENHANCEMENT READINESS

### ✅ Clean/Ready for Enhancement

| Module | Notes |
|--------|-------|
| [ProgramCard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/ProgramCard.tsx:0:0-0:0) | Well-structured, clear props interface |
| [ScholarshipCard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/ScholarshipCard.tsx:0:0-0:0) | Good separation of concerns |
| `program-details/*` components | Atomic design, clear types |
| [StudentMatchScore.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/StudentMatchScore.tsx:0:0-0:0) | Pure presentational component |

### ⚠️ Needs Refactor Before Enhancement

| Module | Issues |
|--------|--------|
| [Index.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/pages/Index.tsx:0:0-0:0) | 630 lines, mixed concerns (data fetching, filtering, UI), needs container/presentational split |
| [StudentMatchForm.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/components/StudentMatchForm.tsx:0:0-0:0) | 847 lines, inline fetch functions, needs API layer extraction |
| [ProgramDetailsPage.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/wiseadmit-counsellor/src/pages/ProgramDetailsPage.tsx:0:0-0:0) | 526 lines of hardcoded data, needs data source abstraction |

### 🔴 Missing Foundation for New Work

1. **API Client Layer** - No centralized HTTP client or service layer
2. **State Management** - React Query used but no pattern for global UI state
3. **Auth System** - Header shows user but no auth context/provider
4. **Route Guards** - No protected routes
5. **Testing** - No test files detected

---

## JSON OUTPUT

```json
{
  "project_name": "wiseadmit-counsellor",
  "tech_stack": {
    "language": "TypeScript 5.7.2",
    "framework": "React 18.3.1",
    "build_tool": "Vite 6.2.0",
    "routing": "react-router-dom 6.26.2",
    "state_management": "@tanstack/react-query 5.56.2",
    "form_handling": "react-hook-form 7.53.0 + zod 3.23.8",
    "ui_library": "Radix UI primitives + TailwindCSS 4.0.17",
    "animation": "framer-motion 12.5.0",
    "icons": "lucide-react 0.462.0",
    "charts": "recharts 2.12.7",
    "date_library": "date-fns 3.6.0"
  },
  "architecture": "frontend_spa_monolith",
  "modules": [
    {
      "name": "student_matching",
      "files": [
        "src/components/StudentMatchForm.tsx",
        "src/components/StudentMatchScore.tsx"
      ],
      "purpose": "Multi-step wizard for student profile input and scoring",
      "dependencies": [
        "react-hook-form",
        "zod",
        "framer-motion"
      ]
    },
    {
      "name": "program_discovery",
      "files": [
        "src/pages/Index.tsx",
        "src/components/ProgramCard.tsx"
      ],
      "purpose": "Program listing with search, filter, and sort",
      "dependencies": [
        "@tanstack/react-query",
        "lucide-react"
      ]
    },
    {
      "name": "program_details",
      "files": [
        "src/pages/ProgramDetailsPage.tsx",
        "src/components/program-details/*.tsx"
      ],
      "purpose": "Detailed program view with benefits, requirements, FAQ",
      "dependencies": [
        "inline_svg_icons"
      ]
    },
    {
      "name": "scholarships",
      "files": [
        "src/components/ScholarshipCard.tsx",
        "src/components/ScholarshipDetailModal.tsx"
      ],
      "purpose": "Scholarship listing and detail display",
      "dependencies": [
        "date-fns",
        "@radix-ui/react-sheet"
      ]
    },
    {
      "name": "ui_system",
      "files": [
        "src/components/ui/*.tsx",
        "src/lib/utils.ts"
      ],
      "purpose": "Shared UI component library (49 components)",
      "dependencies": [
        "tailwindcss",
        "class-variance-authority",
        "clsx",
        "tailwind-merge"
      ]
    },
    {
      "name": "navigation_shell",
      "files": [
        "src/common-components/Header.tsx",
        "src/common-components/Sidebar.tsx"
      ],
      "purpose": "App layout shell with branding",
      "dependencies": [
        "inline_svg"
      ]
    }
  ],
  "features_existing": [
    "Student profile wizard (5-step form with validation)",
    "Program matching with scoring algorithm (0-20 scale)",
    "Program search and sort (by match score or scholarship)",
    "Program card grid with animated progress bars",
    "Scholarship listing with deadline urgency indicators",
    "Program details page with FAQ accordion",
    "Responsive mobile detection hook",
    "Toast notification system"
  ],
  "features_incomplete": [
    "Real API integration (all endpoints mocked)",
    "Filter functionality (UI present but non-functional)",
    "NotFound page (imported but file missing)",
    "Home page (empty placeholder)",
    "Authentication system (hardcoded user)",
    "Button and SVG common components (empty files)"
  ],
  "integrations": [
    {
      "service": "WiseAdmit API",
      "status": "configured_mocked",
      "endpoints": [
        "api.wiseadmit.io/api/v1/web/programs",
        "api.wiseadmit.io/api/v1/web/documents",
        "api.wiseadmit.io/api/v1/web/disciplines",
        "api.wiseadmit.io/api/v1/web/sub_disciplines/discipline/{id}",
        "api.wiseadmit.io/api/v1/web/scholarships"
      ]
    },
    {
      "service": "Builder.io",
      "status": "configured",
      "notes": "API key exposed in .env"
    }
  ],
  "tech_debt": [
    {
      "issue": "Any type usage in core data structures",
      "location": "src/pages/Index.tsx:237,245,254",
      "severity": "medium"
    },
    {
      "issue": "Hardcoded user name in header",
      "location": "src/common-components/Header.tsx:97",
      "severity": "low"
    },
    {
      "issue": "No centralized API layer",
      "location": "src/components/StudentMatchForm.tsx:52-106",
      "severity": "high"
    },
    {
      "issue": "Missing NotFound component",
      "location": "src/App.tsx:7",
      "severity": "medium"
    },
    {
      "issue": "Empty stub files",
      "location": "src/common-components/button.tsx, svgs.tsx",
      "severity": "low"
    },
    {
      "issue": "No test coverage",
      "location": "entire project",
      "severity": "high"
    }
  ],
  "regression_risk_areas": [
    {
      "module": "StudentMatchForm.tsx",
      "dependents": [
        "Index.tsx"
      ],
      "risk": "Form schema changes break entire matching flow"
    },
    {
      "module": "ui/* components",
      "dependents": [
        "All feature components"
      ],
      "risk": "49 shared components - changes cascade across app"
    },
    {
      "module": "Index.tsx",
      "dependents": [
        "Main route"
      ],
      "risk": "Complex state management - filter/sort changes affect display"
    }
  ],
  "enhancement_ready_modules": [
    "src/components/ProgramCard.tsx",
    "src/components/ScholarshipCard.tsx",
    "src/components/StudentMatchScore.tsx",
    "src/components/program-details/types.ts"
  ],
  "needs_refactor_first": [
    {
      "module": "src/pages/Index.tsx",
      "reason": "630 lines, mixed concerns, needs container/presentational split"
    },
    {
      "module": "src/components/StudentMatchForm.tsx",
      "reason": "847 lines, inline fetch functions, needs API layer extraction"
    },
    {
      "module": "src/pages/ProgramDetailsPage.tsx",
      "reason": "Hardcoded data needs abstraction to data source"
    }
  ]
}
```