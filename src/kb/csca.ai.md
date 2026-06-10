

























Now I have a comprehensive understanding of the codebase. Let me compile the Project Intelligence Report.

---

## PROJECT INTELLIGENCE REPORT: CSCA.ai

### 1. PROJECT OVERVIEW

**Project Name:** CSCA.ai (China Scholastic Competency Assessment Preparation Platform)

**Purpose:** An AI-powered educational platform for international students preparing for the China Scholastic Competency Assessment (CSCA) exam. The platform provides mock tests, personalized learning paths, lessons, score prediction, and an AI mascot (XiaoFu Panda) for student engagement.

**Tech Stack:**
- **Frontend Framework:** React 18.3.1 with TypeScript 5.8.3
- **Build Tool:** Vite 5.4.19 with SWC plugin
- **UI Library:** shadcn/ui + Radix UI primitives
- **Styling:** Tailwind CSS 3.4.17 + CSS variables for theming
- **State Management:** TanStack Query (React Query) 5.83.0
- **Authentication:** Supabase Auth (@supabase/supabase-js 2.97.0)
- **Database:** Supabase PostgreSQL (cloud-hosted)
- **Backend Functions:** Supabase Edge Functions (Deno)
- **Animation:** Framer Motion 12.34.1
- **Testing:** Vitest 3.2.4 + Testing Library
- **Routing:** React Router DOM 6.30.1
- **Icons:** Lucide React 0.462.0
- **Forms:** React Hook Form 7.61.1 + Zod 3.25.76
- **Charts:** Recharts 2.15.4
- **Lovable.dev Integration:** @lovable.dev/cloud-auth-js, lovable-tagger

**Architecture Type:** Full-stack Single Page Application (SPA) with:
- Client-side React frontend
- Serverless backend via Supabase Edge Functions
- BaaS (Backend-as-a-Service) via Supabase (Auth, Database, Storage)
- Progressive Web App characteristics with localStorage-based state persistence

**Deployment/Infra Hints:**
- AWS Amplify deployment configured ([amplify.yml](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/amplify.yml:0:0-0:0) @ [c:\Users\subha\OneDrive\Documents\GitHub\exact-replica-builder\amplify.yml](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/amplify.yml:0:0-0:0))
- Environment variables for Supabase and Meta Pixel tracking in [.env](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/.env:0:0-0:0)
- Ngrok allowed hosts for local development tunneling
- No Dockerfile present - relies on managed hosting

---

### 2. MODULE MAP

| Module | Purpose | Key Files/Folders | Dependencies |
|--------|---------|-------------------|--------------|
| **Auth** | User authentication, session management, password reset | [src/contexts/AuthContext.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/contexts/AuthContext.tsx:0:0-0:0), [src/hooks/use-auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/hooks/use-auth.ts:0:0-0:0), [src/pages/Login.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/Login.tsx:0:0-0:0), [src/pages/ResetPassword.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/ResetPassword.tsx:0:0-0:0) | Supabase Auth, React Router |
| **Student Progress** | Funnel tracking, XP, badges, test completion state | [src/hooks/use-student-progress.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/hooks/use-student-progress.ts:0:0-0:0), [src/hooks/use-journey-stage.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/hooks/use-journey-stage.ts:0:0-0:0) | localStorage, Supabase |
| **Funnel Guard** | Route protection based on user journey stage | [src/components/funnel/FunnelGuard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/funnel/FunnelGuard.tsx:0:0-0:0) | React Router, useJourneyStage |
| **Dashboard** | Student dashboard with stats, progress, actions | [src/pages/Dashboard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/Dashboard.tsx:0:0-0:0), `src/components/dashboard/*` | Recharts, various hooks |
| **Learning/Lessons** | Lesson content, subject learning paths | [src/pages/Learn.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/Learn.tsx:0:0-0:0), [src/pages/LearnHub.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/LearnHub.tsx:0:0-0:0), [src/pages/Lesson.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/Lesson.tsx:0:0-0:0), [src/lib/lesson-loader.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/lesson-loader.ts:0:0-0:0) | lesson data files |
| **Testing Engine** | Question loading, test sessions, scoring | [src/lib/question-engine.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/question-engine.ts:0:0-0:0), [src/pages/MiniTest.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/MiniTest.tsx:0:0-0:0), [src/pages/MockTest.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/MockTest.tsx:0:0-0:0), [src/pages/FullMockExam.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/FullMockExam.tsx:0:0-0:0) | Supabase functions |
| **Question Bank** | 575+ questions with figures, difficulty mixing | [src/data/csca-questions.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/data/csca-questions.ts:0:0-0:0), [src/data/fallback-questions.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/data/fallback-questions.ts:0:0-0:0) | question-engine |
| **AI Mascot (XiaoFu)** | Interactive panda chatbot with memory | [src/components/mascot/XiaoFuFloating.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/mascot/XiaoFuFloating.tsx:0:0-0:0) (2143 lines), [src/components/mascot/PandaMascot.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/mascot/PandaMascot.tsx:0:0-0:0), `src/hooks/use-xiaofu-*.ts` | Framer Motion |
| **Blog/CMS** | Content management, articles | [src/pages/BlogIndex.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/BlogIndex.tsx:0:0-0:0), [src/pages/BlogArticle.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/BlogArticle.tsx:0:0-0:0), [src/data/blog-articles.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/data/blog-articles.ts:0:0-0:0), [src/components/admin/AdminBlogCMS.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/admin/AdminBlogCMS.tsx:0:0-0:0) | Supabase |
| **Admin Panel** | Multi-module admin dashboard | [src/pages/AdminDashboard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/AdminDashboard.tsx:0:0-0:0), `src/components/admin/*` | All major modules |
| **Checkout/Booking** | Exam booking, payments | [src/pages/Checkout.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/Checkout.tsx:0:0-0:0), [src/contexts/BookingContext.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/contexts/BookingContext.tsx:0:0-0:0) | FunnelGuard |
| **Analytics** | Meta Pixel, visit tracking, event store | [src/lib/meta-tracking.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/meta-tracking.ts:0:0-0:0), [src/lib/analytics.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/analytics.ts:0:0-0:0), [src/lib/visit-tracker.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/visit-tracker.ts:0:0-0:0), [src/lib/event-store.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/event-store.ts:0:0-0:0) | Meta Conversions API |
| **Lead Management** | Forwarding leads to external systems | [src/lib/forward-lead.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/forward-lead.ts:0:0-0:0), [supabase/functions/forward-lead/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/forward-lead:0:0-0:0) | Supabase Functions |

**Shared/Core Modules:**
- [src/components/ui/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/ui:0:0-0:0) - 49 shadcn/ui components (buttons, dialogs, forms, etc.)
- [src/hooks/use-mobile.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/hooks/use-mobile.tsx:0:0-0:0) - Responsive breakpoint detection
- [src/lib/utils.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/utils.ts:0:0-0:0) - Utility functions (cn class merger)
- [src/integrations/supabase/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/integrations/supabase:0:0-0:0) - Database client and generated types

---

### 3. CURRENT FEATURE INVENTORY

**Existing/Implemented Features:**
- User authentication (email/password, OTP, password reset)
- Progressive student funnel: 2-min mini tests → 15-min mocks → 60-min full mock → qualifier form
- Interactive AI mascot "XiaoFu" with memory system, stories, fun facts, profile collection
- Student dashboard with XP, badges, streaks, progress rings, subject strength radar
- Question engine with 575+ questions, adaptive difficulty, figure rendering
- Blog/CMS with article management
- Admin dashboard with 12+ modules (leads, pipeline, blog, questions, lessons, marketing, XiaoFu engine)
- Meta Pixel integration with conversion tracking
- Responsive design with mobile support
- FunnelGuard route protection system
- Leaderboard functionality
- Contact form (UI only, see issues)
- Figure rendering system for geometry/chemistry diagrams

**Partially Implemented/Incomplete:**
- Contact form submissions not stored/processed (Bug #23 in [bugs.md](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/bugs.md:0:0-0:0))
- "Trust and Safety" page 404 (Bug #10)
- Blog articles not displaying on `/blog` page (Bug #17)
- "Popular Guides" section missing articles (Bug #18)
- "Register Now" button non-functional (Bug #19)
- "Practice Now" after booking leads to 404 (Bug #20)
- Student Dashboard lacks clear purpose/UX (Bug #8) - redirect only currently

**Deprecated/Legacy:**
- [StudentDashboard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/pages/StudentDashboard.tsx:0:0-0:0) - now redirects to main [/dashboard](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/dashboard:0:0-0:0)
- Legacy boolean `fifteenMinCompleted` kept for backward compatibility (`use-student-progress.ts:318`)

---

### 4. DEPENDENCIES & INTEGRATIONS

**External Services/APIs:**
| Service | Purpose | Integration Point |
|---------|---------|-------------------|
| **Supabase** | Database, Auth, Storage, Edge Functions | `@supabase/supabase-js`, [src/integrations/supabase/client.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/integrations/supabase/client.ts:0:0-0:0) |
| **Meta (Facebook) Pixel** | Ad tracking, conversion events | [src/lib/meta-tracking.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/meta-tracking.ts:0:0-0:0), `VITE_CSCA_PIXEL_ID` |
| **Lovable.dev** | Low-code platform integration | `@lovable.dev/cloud-auth-js`, `lovable-tagger` |
| **WiseAdmit.io** | Scholarship/university referrals | Tracked in `App.tsx:126-137` |

**Internal Service-to-Service (Supabase Edge Functions):**
- [admin-ai/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/admin-ai:0:0-0:0) - AI-powered admin operations
- [ask-doubt/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/ask-doubt:0:0-0:0) - Student doubt resolution
- [blog-rewrite/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/blog-rewrite:0:0-0:0) - AI blog content generation
- [china-content-generate/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/china-content-generate:0:0-0:0) - China-specific content
- [forward-lead/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/forward-lead:0:0-0:0) - Lead forwarding to external CRM
- [marketing-stats/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/marketing-stats:0:0-0:0) - Marketing analytics
- [openai-completion/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/openai-completion:0:0-0:0) - OpenAI GPT integration
- [serve-lessons/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/serve-lessons:0:0-0:0) - Lesson content API
- [serve-questions/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/serve-questions:0:0-0:0) - Question bank API
- `social-*` - Social media automation (6 functions)
- [track-visit/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/supabase/functions/track-visit:0:0-0:0) - Visit analytics

**Database:**
- PostgreSQL via Supabase
- Tables: `subjects`, `topics`, `subtopics`, [questions](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/questions:0:0-0:0), `lesson_questions`, `lesson_progress`, `site_settings`, `student_progress`
- See [schema.md](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/schema.md:0:0-0:0) for full schema

---

### 5. KNOWN ISSUES & TECH DEBT

**Hardcoded Values:**
- XP amounts hardcoded in `use-student-progress.ts:253-315` (50, 100, 200, 300, 400 XP)
- Fixed "25 XP earned" in test completion (Bug #13)
- Meta Pixel ID hardcoded in [.env](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/.env:0:0-0:0)

**Missing Error Handling:**
- Contact form has no backend integration (Bug #23)
- Form validation missing on "Book Exam" form (Bug #14)
- Form validation missing on 15-minute Mock Test form (Bug #15)
- Telegram/WhatsApp icons lack URLs (Bug #2)

**Outdated/Deprecated:**
- Lovable placeholder logo in Google search (Bug #1)
- `lovable-tagger` only active in development mode

**Low/No Test Coverage:**
- Only 5 test files in [src/test/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/test:0:0-0:0) covering question engine, auth hooks
- No E2E tests (Playwright configured but no specs found)
- Dashboard components, mascot logic, admin panels largely untested

**UI/UX Issues (from [bugs.md](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/bugs.md:0:0-0:0)):**
- 24 documented bugs including navigation inconsistencies, responsive issues, 404 errors
- Header/footer navigation inconsistencies across pages
- Chatbot auto-opens repeatedly (Bug #21)
- Page scroll issues in test interfaces (Bug #12)

---

### 6. REGRESSION RISK AREAS

**Highly Coupled Modules:**

1. **[useStudentProgress](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/hooks/use-student-progress.ts:167:0-371:1) hook** ([src/hooks/use-student-progress.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/hooks/use-student-progress.ts:0:0-0:0))
   - Used by: [FunnelGuard](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/funnel/FunnelGuard.tsx:17:0-76:1), `Dashboard`, [XiaoFuFloating](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/mascot/XiaoFuFloating.tsx:180:0-2139:2), `MiniTest`, `MockTest`, `Profile`
   - **Risk:** Changes to progress structure affect entire funnel
   - **Critical functions:** `completeMiniTest()`, `completeFifteenMin()`, `completeFullMock()`

2. **[FunnelGuard](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/funnel/FunnelGuard.tsx:17:0-76:1) component** ([src/components/funnel/FunnelGuard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/funnel/FunnelGuard.tsx:0:0-0:0))
   - Guards: `/learn`, `/lesson/*`, `/mock-test`, `/practice-hub`, `/results`, `/checkout`, `/student/dashboard`, `/practice/*`, `/exam/*`
   - **Risk:** Changes to guard logic break entire user flow
   - Dependencies: [useJourneyStage](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/hooks/use-journey-stage.ts:46:0-100:1), [useAuth](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/hooks/use-auth.ts:6:0-74:1)

3. **[question-engine.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/question-engine.ts:0:0-0:0)** ([src/lib/question-engine.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/question-engine.ts:0:0-0:0))
   - Used by all test pages
   - **Risk:** Changes to question format break 575+ questions
   - **Critical:** [BankQuestion](cci:2://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/question-engine.ts:9:0-32:1) interface is core data contract

4. **[XiaoFuFloating](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/mascot/XiaoFuFloating.tsx:180:0-2139:2) component** (`src/components/mascot/XiaoFuFloating.tsx:2143 lines`)
   - Complex state management for chat, memory, expressions
   - **Risk:** Changes affect user engagement throughout site
   - Uses 8+ custom hooks

**Critical Files with Many Dependents:**
- [src/integrations/supabase/client.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/integrations/supabase/client.ts:0:0-0:0) - Database access throughout app
- [src/App.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/App.tsx:0:0-0:0) - Route definitions, analytics tracking
- [src/hooks/use-auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/hooks/use-auth.ts:0:0-0:0) - All authenticated operations
- [src/lib/meta-tracking.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/lib/meta-tracking.ts:0:0-0:0) - All conversion events

---

### 7. ENHANCEMENT READINESS

**Clean/Ready for Enhancement:**
| Module | Status | Notes |
|--------|--------|-------|
| UI Components | ✅ Ready | Standardized shadcn/ui components in [src/components/ui/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/exact-replica-builder/src/components/ui:0:0-0:0) |
| Question Engine | ✅ Ready | Well-structured with clear interfaces |
| Blog/CMS | ✅ Ready | Admin panel exists, content generation via AI |
| Dashboard Stats | ✅ Ready | Recharts integration, data hooks in place |
| Analytics | ✅ Ready | Meta tracking infrastructure complete |

**Needs Refactoring First:**
| Module | Issues | Priority |
|--------|--------|----------|
| **XiaoFuFloating.tsx** | 2143 lines, multiple concerns mixed | High |
| **FunnelGuard** | Hardcoded redirect logic, could use config | Medium |
| **useStudentProgress** | Complex merge logic, legacy boolean support | Medium |
| **Contact Form** | No backend integration | High |
| **Header/Footer** | Inconsistent across pages (6 bugs) | High |
| **booking.html** | External HTML file with different branding | High |

**Missing Foundational Pieces:**
- Proper form validation library usage (Zod defined but not consistently used)
- Error boundary components
- Loading state standardization
- Toast/notification system (Sonner installed but usage inconsistent)
- Rate limiting on AI mascot API calls

---

### 8. STRUCTURED JSON OUTPUT

```json
{
  "project_name": "CSCA.ai - China Scholastic Competency Assessment Prep Platform",
  "tech_stack": {
    "frontend": ["React 18.3.1", "TypeScript 5.8.3", "Vite 5.4.19", "Tailwind CSS 3.4.17", "shadcn/ui"],
    "state_management": ["TanStack Query 5.83.0", "React Context API", "localStorage"],
    "backend": ["Supabase (PostgreSQL + Auth + Edge Functions)"],
    "animation": ["Framer Motion 12.34.1"],
    "testing": ["Vitest 3.2.4", "@testing-library/react 16.0.0", "jsdom"],
    "routing": ["React Router DOM 6.30.1"],
    "analytics": ["Meta Pixel (Conversions API)", "Custom event store"]
  },
  "architecture": "Full-stack SPA with BaaS (Supabase), serverless edge functions, progressive web app with localStorage persistence",
  "modules": [
    {"name": "Auth", "files": ["src/contexts/AuthContext.tsx", "src/hooks/use-auth.ts", "src/pages/Login.tsx"], "purpose": "User authentication and session management"},
    {"name": "Student Progress", "files": ["src/hooks/use-student-progress.ts", "src/hooks/use-journey-stage.ts"], "purpose": "Funnel tracking, XP, badges, test completion state"},
    {"name": "Funnel Guard", "files": ["src/components/funnel/FunnelGuard.tsx"], "purpose": "Route protection based on user journey stage"},
    {"name": "Dashboard", "files": ["src/pages/Dashboard.tsx", "src/components/dashboard/"], "purpose": "Student hub with stats and progress"},
    {"name": "Learning", "files": ["src/pages/Learn.tsx", "src/pages/Lesson.tsx", "src/lib/lesson-loader.ts"], "purpose": "Lesson content and learning paths"},
    {"name": "Testing Engine", "files": ["src/lib/question-engine.ts", "src/pages/MiniTest.tsx", "src/pages/MockTest.tsx"], "purpose": "Question loading and test sessions"},
    {"name": "AI Mascot (XiaoFu)", "files": ["src/components/mascot/XiaoFuFloating.tsx", "src/hooks/use-xiaofu-*.ts"], "purpose": "Interactive panda chatbot with memory"},
    {"name": "Blog/CMS", "files": ["src/pages/BlogIndex.tsx", "src/components/admin/AdminBlogCMS.tsx"], "purpose": "Content management system"},
    {"name": "Admin Panel", "files": ["src/pages/AdminDashboard.tsx", "src/components/admin/"], "purpose": "Multi-module admin dashboard"},
    {"name": "Analytics", "files": ["src/lib/meta-tracking.ts", "src/lib/event-store.ts"], "purpose": "Conversion tracking and event logging"}
  ],
  "features_existing": [
    "User authentication with email/password and OTP",
    "Progressive student funnel (2-min → 15-min → 60-min tests)",
    "AI mascot with memory, stories, profile collection",
    "Student dashboard with XP/badges/progress visualization",
    "Question engine with 575+ adaptive questions",
    "Blog/CMS with AI content generation",
    "Admin dashboard with 12 modules",
    "Meta Pixel conversion tracking",
    "Figure rendering for STEM diagrams",
    "Responsive mobile design"
  ],
  "features_incomplete": [
    "Contact form backend integration",
    "Trust and Safety page (404)",
    "Blog article display on /blog page",
    "Form validation on booking forms",
    "Student Dashboard UX definition",
    "Practice Now post-booking redirect"
  ],
  "integrations": [
    {"service": "Supabase", "type": "Database, Auth, Edge Functions", "status": "Active"},
    {"service": "Meta Pixel", "type": "Ad/Conversion Tracking", "status": "Active"},
    {"service": "Lovable.dev", "type": "Low-code Platform", "status": "Integrated"},
    {"service": "WiseAdmit.io", "type": "Referral Partner", "status": "Tracked"}
  ],
  "tech_debt": [
    "XiaoFuFloating.tsx is 2143 lines - needs component splitting",
    "Fixed '25 XP earned' hardcoded regardless of performance",
    "Contact form has no backend processing",
    "Header/footer navigation inconsistent across pages",
    "Minimal test coverage (only 5 test files)",
    "Legacy fifteenMinCompleted boolean for backward compat"
  ],
  "regression_risk_areas": [
    {"area": "useStudentProgress hook", "dependents": ["FunnelGuard", "Dashboard", "XiaoFuFloating", "All test pages"], "risk_level": "High"},
    {"area": "FunnelGuard component", "routes_guarded": 9, "risk_level": "Critical"},
    {"area": "question-engine.ts", "questions_dependent": 575, "risk_level": "High"},
    {"area": "XiaoFuFloating.tsx", "lines_of_code": 2143, "risk_level": "Medium"},
    {"area": "App.tsx route definitions", "analytics_events": 5, "risk_level": "Medium"}
  ],
  "enhancement_ready_modules": [
    "UI Components (shadcn/ui)",
    "Question Engine",
    "Blog/CMS Admin",
    "Dashboard Stats (Recharts)",
    "Analytics Tracking"
  ],
  "needs_refactor_first": [
    "XiaoFuFloating.tsx - split into smaller components",
    "FunnelGuard - add configuration-based guards",
    "useStudentProgress - simplify merge logic",
    "Contact Form - add backend integration",
    "Header/Footer - unify navigation components",
    "booking.html - integrate into React app"
  ]
}
```