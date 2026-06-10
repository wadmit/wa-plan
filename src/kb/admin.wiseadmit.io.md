# Project Intelligence Report

## 1. PROJECT OVERVIEW

**Project Name:** WiseAdmit Dashboard (applypanda_admin)  
**Purpose:** A comprehensive admin dashboard for an international education platform managing student applications, university programs, lead tracking, marketing automation, and admissions workflows.

**Tech Stack:**
- **Framework:** React 17.0.2 with TypeScript 4.9.5
- **Build Tool:** Vite 4.3.8 (migrated from Create React App)
- **State Management:** Redux Toolkit 1.6.1 with Redux Thunk
- **Data Fetching:** React Query 3.39.0
- **UI Library:** Material-UI v5 (MUI) with @material-ui/core 5.0.0-beta.2
- **Routing:** React Router v6.0.0-beta.0
- **Styling:** Emotion, Sass, Tailwind-like utilities via MUI
- **Forms:** React Hook Form 7.54.2, Formik 2.2.9 with Yup validation
- **Real-time:** Socket.io-client 4.6.0
- **Charts:** ApexCharts, Chart.js, D3, React-ApexCharts
- **Rich Text:** CKEditor, Quill, Draft.js, TinyMCE
- **Workflow Builder:** XYFlow (React Flow) 12.4.1
- **Authentication:** JWT with cookie-based auth (js-cookie)

**Architecture Type:** Single-page application (SPA), monolithic frontend with feature-based module organization

**Deployment/Infra Hints:**
- Environment-based configuration via [.env](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/.env:0:0-0:0) files
- VITE_API_URL points to `localhost:9261` (dev) or `api-dev.wiseadmit.io` / `api.wiseadmit.io`
- CloudFront distribution URLs for assets
- Stripe integration (test key visible: `pk_test_51LFxHu...`)
- Mixpanel analytics integration
- Ngrok allowed host in vite.config.ts

---

## 2. MODULE MAP

| Module | Purpose | Files/Folders | Key Dependencies |
|--------|---------|---------------|------------------|
| **Auth** | Login, logout, password reset, role-based access | [screens/auth/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/auth:0:0-0:0) (11 files) | Redux auth slice, JWT cookies |
| **Dashboard** | Main stats, KPIs, charts, leaderboard | [screens/dashboard/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/dashboard:0:0-0:0) (72 items) | Redux dashboard slice, chart libraries |
| **User Management** | Admin, sub-admin, university admin, agent applications | [screens/user/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/user:0:0-0:0) (49 items), [screens/roles/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/roles:0:0-0:0) (8 items) | userSlice, permissionSlice |
| **Leads** | Lead tracking, kanban board, follow-ups, assignments | [screens/leads/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/leads:0:0-0:0) (37 items), [screens/lead-tracking/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/lead-tracking:0:0-0:0) | leadSlice, conversations |
| **Students** | Student profiles, applications, shortlists, documents | [screens/student/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/student:0:0-0:0) (82 items) | studentSlice, documentSlice |
| **Applications** | Application processing, status tracking, approvals | [screens/application/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/application:0:0-0:0) (54 items) | applicationSlice, singleApplicationSlice |
| **Universities** | University management, extractor tools | [screens/university/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/university:0:0-0:0) (18 items), [screens/university-extractor/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/university-extractor:0:0-0:0) | universitySlice |
| **Programs** | Program management, extractor tools | [screens/program/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/program:0:0-0:0) (16 items), [screens/program-extractor/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/program-extractor:0:0-0:0) | programSlice |
| **Marketing/Automation** | Workflow builder, segmentation, broadcasting | [screens/automation/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/automation:0:0-0:0) (34 items), [screens/segmentation/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/segmentation:0:0-0:0) (25 items), [screens/broadcasting/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/broadcasting:0:0-0:0) | automationSlice, segmentationSlice, XYFlow |
| **Conversations** | Chat, messaging, WhatsApp, email | [screens/conversations/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/conversations:0:0-0:0) (25 items), [screens/chat/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/chat:0:0-0:0) | conversationSlice, socket.io |
| **Content** | Blogs, news, announcements, team management | [screens/blog/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/blog:0:0-0:0), [screens/blogBuilder/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/blogBuilder:0:0-0:0), [screens/news/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/news:0:0-0:0), [screens/newsEditor/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/newsEditor:0:0-0:0), [screens/announcements/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/announcements:0:0-0:0), [screens/our-team/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/our-team:0:0-0:0) | blogSlice, newsSlice |
| **Events** | Webinars, upcoming events, scholarships | [screens/webinar/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/webinar:0:0-0:0), [screens/upcoming-event/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/upcoming-event:0:0-0:0), [screens/scholarships/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/scholarships:0:0-0:0), [screens/ads-scholarship/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/ads-scholarship:0:0-0:0) | webinarSlice, upcomingEventsSlice |
| **Feedback & Support** | Feedback forms, contacts, product KB | [screens/feedback/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/feedback:0:0-0:0), [screens/contact/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/contact:0:0-0:0), [screens/product-kb/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/product-kb:0:0-0:0) | feedbackSlice, contactSlice |
| **Settings** | System configuration, core data management | [screens/settings/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/settings:0:0-0:0) (35 items), [screens/core-data/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/core-data:0:0-0:0) | settingsSlice, coreDocumentSlice |
| **QR System** | QR code generation and tracking | [screens/qr/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/qr:0:0-0:0) (9 items), [screens/myQr/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/myQr:0:0-0:0) | qrSlice, qrDataSlice |
| **Reports** | Analytics and reporting | [screens/reports/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/reports:0:0-0:0) (4 items) | dashboard data |
| **Eligibility/WiseScore** | AI scoring, eligibility checking | [screens/eligibility/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/eligibility:0:0-0:0) (16 items) | wiseScoreSlice, eligibilitySlice |

**Shared/Core Modules:**
- [store/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/store:0:0-0:0) - 77 Redux reducers (comprehensive state management)
- [http/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/http:0:0-0:0) - API service layer ([admin-service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/http/admin-service.ts:0:0-0:0) - 162KB, contains all HTTP calls)
- [utils/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/utils:0:0-0:0) - Helper utilities, routing, date converters, string formatting
- [components/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/components:0:0-0:0) - Reusable UI components (Global, Editors, Email, Tables)
- [hooks/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/hooks:0:0-0:0) - Custom React hooks (useAppDispatch, useAppSelector, useUnreadCounts)
- [contexts/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/contexts:0:0-0:0) - React contexts (Auth, Sidebar, Socket, Dashboard, Wisescore)
- [models/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/models:0:0-0:0) - TypeScript interfaces for all entities
- [types/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/types:0:0-0:0) - Type definitions for responses, events, roles

---

## 3. CURRENT FEATURE INVENTORY

### Fully Implemented Features:
- Authentication with JWT (login/logout/refresh token flow)
- Role-based access control (RBAC) with 100+ permission types
- User management (admin, sub-admin, country admin, regional admin, partners, sub-partners)
- Lead management with kanban board, filtering, pagination
- Student profiles with document management
- Application workflow (submit, review, approve, reject)
- University and program management with extractor tools
- Marketing automation workflow builder (visual node-based with XYFlow)
- Segmentation for targeted campaigns
- Email and WhatsApp broadcasting with templates
- Real-time chat/conversations (Socket.io)
- Blog and news content management with rich text editors
- Webinar and scholarship management with registration tracking
- QR code generation and analytics
- Dashboard with analytics, charts, and reporting
- Feedback and contact management
- WiseScore eligibility scoring system

### Partially Implemented / Incomplete Features (from todo.txt and code analysis):
- **Automation Execution:** Execute Full, Execute One, Terminate Full, Terminate One (marked "Done" but may need verification)
- **Automation Tracking:** Track full automation status, track single node status (pending)
- **Analytics Collection:** Gather analytics/errors for nodes (pending)
- **Confirmation Dialogs:** Add confirmation before deleting automation/node, add confirmation while updating (pending)
- **News Section Events:** Add event in news section for admin (pending)
- **Social Media Integration:** Facebook Meta handles integration appears incomplete (`BASE_URL` hardcoded to localhost)

### Deprecated/Commented Code:
- `ChatWidgetProvider` commented out in `App.tsx:46`
- Routes for `/view-universities` and `/view-programs` commented out in `routes.tsx:289-310`
- `/rawData: rawDataSlice.reducer` commented in store/index.ts:100
- Several legacy Material-UI v4 imports still present alongside v5

---

## 4. DEPENDENCIES & INTEGRATIONS

### External Services/APIs:
| Service | Integration Point | Usage |
|---------|------------------|-------|
| **WiseAdmit API** | `VITE_API_URL` (http://localhost:9261/api/v1) | Primary backend API |
| **Socket.io Server** | `VITE_SOCKET_URL` | Real-time chat, notifications |
| **Stripe** | `VITE_STRIPE_PUBLIC_KEY` | Payment processing |
| **Mixpanel** | `VITE_PUBLIC_ANALYTICS_KEY` | Analytics tracking |
| **CloudFront** | `VITE_DISTRIBUTION` | Asset delivery |
| **AI Service** | `https://ai-dev.wiseadmit.io/api/v1` | AI features (proxy configured) |
| **Facebook/Meta** | `VITE_PUBLIC_FB_APP_ID` | Social media integration |
| **AWS Amplify** | aws-amplify package | AWS services |

### Internal Service Dependencies:
- Socket middleware in Redux store for real-time updates
- HTTP service layer ([admin-service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/http/admin-service.ts:0:0-0:0)) with 6000+ lines of API calls
- Redux store with 60+ slices managing different domains

### Database/ORM:
- No ORM (frontend-only app)
- Uses REST API calls via Axios
- React Query for server state caching

---

## 5. KNOWN ISSUES & TECH DEBT

### Hardcoded Values:
- `@c:\Users\subha\OneDrive\Documents\GitHub\applypanda_admin\src\screens\social-media\components\SocialMediaConnect.tsx:36` - `BASE_URL = http://localhost:5000/social-media`
- `@c:\Users\subha\OneDrive\Documents\GitHub\applypanda_admin\src\screens\social-media\single-social-media\components\ConnectKB.tsx:47` - Hardcoded localhost:8000
- Stripe public key in [.env](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/.env:0:0-0:0) appears to be a test key with "pk_tes/api/ait_" (malformed)

### Type Safety Issues:
- Extensive use of `any` type across codebase (500+ occurrences)
- `@ts-ignore` and `@ts-expect-error` patterns found
- Missing strict typing in several reducer files

### Console Logging:
- Debug console.log statements in production code:
  - `main-flow.tsx:94` - "snap-shot"
  - `main-flow.tsx:112` - "select-changes"
  - `view-program/components/start-application.tsx:276` - "Submitting application"
  - `user/components/all-user/user-creation/steps/Step4.tsx:106` - Debug array logging

### Error Handling Gaps:
- Generic error handlers that just log to console
- Network error redirects to `/500` page without context
- Some API calls lack proper error boundaries

### Deprecated API Usage:
- Material-UI v4 and v5 mix (lab packages, styles package)
- React Router v6 beta (unstable version)
- `react-beautiful-dnd` alongside `react-dnd` (redundant drag-and-drop libraries)

### Code Organization Issues:
- [admin-service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/http/admin-service.ts:0:0-0:0) is 162KB - monolithic service file that should be split
- Duplicate reducer exports (dashboard, education-level exported twice in `store/reducers/index.ts:38,44`)
- Large number of commented-out imports and code blocks

---

## 6. REGRESSION RISK AREAS

### High Risk - Tightly Coupled Modules:

1. **[http/admin-service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/http/admin-service.ts:0:0-0:0)** (line 1-6003)
   - 200+ API methods in single file
   - Imported by virtually every screen
   - Change impacts entire application

2. **[store/index.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/store/index.ts:0:0-0:0)** (line 1-169)
   - Central store configuration with 60+ reducers
   - Socket middleware integration
   - LocalStorage sync logic

3. **[utils/routing/routes.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/utils/routing/routes.tsx:0:0-0:0)** (line 1-491)
   - All route definitions in one place
   - Permission-based route filtering
   - Lazy-loaded component imports

4. **[CoreApp.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/CoreApp.tsx:0:0-0:0)** (line 1-110)
   - Authentication gatekeeper
   - Route permission resolution
   - Profile fetching logic

5. **[store/reducers/conversations.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/store/reducers/conversations.ts:0:0-0:0)** (15KB)
   - Complex real-time messaging logic
   - Socket event handlers
   - Multiple cross-slice dependencies

### Critical Functions Called from Many Places:
- [adminService.getProfile()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/http/admin-service.ts:381:2-400:3) - Called on every auth check
- [useAppDispatch()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/hooks/hooks.ts:3:0-3:63) / `useAppSelector()` - Used in 100+ components
- `availableRouteEntity()` - Permission routing function
- `fillLayout()` - Route layout wrapper

### Areas with Side Effect Risk:
- Socket.io event handlers in [store/reducers/chat-subscriber.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/store/reducers/chat-subscriber.ts:0:0-0:0) and [email-subscriber.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/store/reducers/email-subscriber.ts:0:0-0:0)
- LocalStorage persistence in `store/index.ts:159-164`
- Query client cache clearing in [utils/queryClient.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/utils/queryClient.ts:0:0-0:0)

---

## 7. ENHANCEMENT READINESS

### Clean/Well-Structured Modules (Ready for New Features):
| Module | Status | Notes |
|--------|--------|-------|
| [screens/announcements/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/announcements:0:0-0:0) | Clean | Simple CRUD pattern |
| [screens/webinar/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/webinar:0:0-0:0) | Clean | Well-organized hooks |
| [screens/scholarships/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/scholarships:0:0-0:0) | Clean | Formik forms properly structured |
| [screens/our-team/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/our-team:0:0-0:0) | Clean | Minimal dependencies |
| [screens/referral/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/referral:0:0-0:0) | Clean | Simple feature scope |
| [screens/events-gallery/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/events-gallery:0:0-0:0) | Clean | Gallery management |

### Modules Needing Refactoring Before Enhancements:

| Module | Issues | Refactoring Needed |
|--------|--------|-------------------|
| [http/admin-service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/http/admin-service.ts:0:0-0:0) | 162KB monolith | Split into domain-specific services |
| [screens/automation/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/automation:0:0-0:0) | Complex state management | Extract flow logic into hooks |
| [screens/conversations/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/conversations:0:0-0:0) | 15KB reducer, socket coupling | Separate socket from state logic |
| [screens/student/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/student:0:0-0:0) | 82 items, scattered utils | Consolidate utilities, extract hooks |
| [screens/dashboard/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/dashboard:0:0-0:0) | 72 items, mixed concerns | Separate chart components from data |
| [screens/settings/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/screens/settings:0:0-0:0) | 35 items, complex forms | Break into sub-modules |

### Missing Foundational Pieces:
1. **Comprehensive Error Boundary** - Only basic error handling in `CoreApp.tsx:95`
2. **Loading State Standardization** - Multiple loader implementations across screens
3. **Form Validation Library Consistency** - Mix of Formik, React Hook Form, and manual validation
4. **Type Safety Enforcement** - Too many `any` types block reliable refactoring
5. **Test Coverage** - Only [test-utils.jsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/applypanda_admin/src/test-utils.jsx:0:0-0:0) and minimal test infrastructure visible

---

## 8. STRUCTURED JSON OUTPUT

```json
{
  "project_name": "WiseAdmit Dashboard (applypanda_admin)",
  "tech_stack": {
    "framework": "React 17.0.2 with TypeScript 4.9.5",
    "build_tool": "Vite 4.3.8",
    "state_management": "Redux Toolkit 1.6.1, React Query 3.39.0",
    "ui_library": "Material-UI v5 (MUI)",
    "routing": "React Router v6.0.0-beta.0",
    "realtime": "Socket.io-client 4.6.0",
    "workflow_builder": "XYFlow 12.4.1",
    "charts": "ApexCharts, Chart.js, D3",
    "forms": "React Hook Form 7.54.2, Formik 2.2.9, Yup 0.32.9, Zod 3.24.2"
  },
  "architecture": "Single-page application (SPA), monolithic frontend with feature-based module organization, Redux + React Query for state management",
  "modules": [
    {
      "name": "Auth",
      "purpose": "Login, logout, password reset, role-based access control",
      "files": ["screens/auth/"],
      "dependencies": ["authenticationSlice", "permissionSlice", "js-cookie"]
    },
    {
      "name": "Dashboard",
      "purpose": "Main stats, KPIs, charts, leaderboard, analytics",
      "files": ["screens/dashboard/", "store/reducers/dashboard.ts"],
      "dependencies": ["dashboardSlice", "chart.js", "apexcharts"]
    },
    {
      "name": "User Management",
      "purpose": "Admin, sub-admin, university admin, agent applications",
      "files": ["screens/user/", "screens/roles/", "store/reducers/user.ts"],
      "dependencies": ["userSlice", "allSubAdminSlice", "allUniversityAdminSlice"]
    },
    {
      "name": "Leads",
      "purpose": "Lead tracking, kanban board, follow-ups, assignments",
      "files": ["screens/leads/", "screens/lead-tracking/", "store/reducers/lead.ts"],
      "dependencies": ["leadSlice", "conversationsSlice"]
    },
    {
      "name": "Students",
      "purpose": "Student profiles, applications, shortlists, documents",
      "files": ["screens/student/", "store/reducers/student.ts"],
      "dependencies": ["studentSlice", "documentSlice", "shortListSlice"]
    },
    {
      "name": "Applications",
      "purpose": "Application processing, status tracking, approvals",
      "files": ["screens/application/", "store/reducers/application.ts", "store/reducers/single-application.ts"],
      "dependencies": ["applicationSlice", "singleApplicationSlice"]
    },
    {
      "name": "Universities & Programs",
      "purpose": "University and program management with extractors",
      "files": ["screens/university/", "screens/program/", "screens/university-extractor/", "screens/program-extractor/"],
      "dependencies": ["universitySlice", "programSlice"]
    },
    {
      "name": "Marketing Automation",
      "purpose": "Workflow builder, segmentation, broadcasting, templates",
      "files": ["screens/automation/", "screens/segmentation/", "screens/broadcasting/", "screens/template-messages/"],
      "dependencies": ["automationSlice", "segmentationSlice", "whatsAppTemplateSlice", "emailTemplateSlice", "@xyflow/react"]
    },
    {
      "name": "Conversations",
      "purpose": "Real-time chat, messaging, WhatsApp, email",
      "files": ["screens/conversations/", "screens/chat/", "store/reducers/conversations.ts"],
      "dependencies": ["allConversationSlice", "socket.io-client", "socket-middleware.ts"]
    },
    {
      "name": "Content Management",
      "purpose": "Blogs, news, announcements, team management",
      "files": ["screens/blog/", "screens/blogBuilder/", "screens/news/", "screens/newsEditor/", "screens/announcements/", "screens/our-team/"],
      "dependencies": ["blogSlice", "newsSlice", "newsEditorSlice", "announcementsSlice", "ourTeamSlice", "ckeditor5", "quill"]
    },
    {
      "name": "Events & Scholarships",
      "purpose": "Webinars, upcoming events, scholarship management",
      "files": ["screens/webinar/", "screens/upcoming-event/", "screens/scholarships/", "screens/ads-scholarship/"],
      "dependencies": ["webinarSlice", "upcomingEventsSlice", "scholarshipSlice", "adsScholarshipSlice"]
    },
    {
      "name": "QR System",
      "purpose": "QR code generation and tracking",
      "files": ["screens/qr/", "screens/myQr/"],
      "dependencies": ["qrCodeSlice", "qrTypeSlice", "qrDataSlice"]
    },
    {
      "name": "Settings & Core Data",
      "purpose": "System configuration, core document management",
      "files": ["screens/settings/", "screens/core-data/"],
      "dependencies": ["coreDocumentSlice", "disciplineSlice", "subDisciplineSlice"]
    },
    {
      "name": "WiseScore",
      "purpose": "AI scoring and eligibility checking",
      "files": ["screens/eligibility/", "store/reducers/wisescore.ts", "store/reducers/wiseScoreEligibility.ts"],
      "dependencies": ["wiseScoreSlice", "wiseScoreEligibilitySlice", "wisescoreChartSlice"]
    }
  ],
  "features_existing": [
    "JWT Authentication with role-based access control",
    "Lead management with kanban board",
    "Student profile and document management",
    "Application workflow (submit, review, approve, reject)",
    "University and program management",
    "Visual workflow builder for marketing automation",
    "Segmentation for targeted campaigns",
    "Email and WhatsApp broadcasting with templates",
    "Real-time chat and messaging",
    "Blog and news content management",
    "Webinar and scholarship management with registrations",
    "QR code generation and analytics",
    "Dashboard with charts and reporting",
    "Feedback and contact management",
    "WiseScore eligibility scoring"
  ],
  "features_incomplete": [
    {
      "feature": "Automation Execution Tracking",
      "status": "Partial - Execute/Terminate functions marked done but tracking pending",
      "location": "todo.txt lines 17-24"
    },
    {
      "feature": "Social Media Integration",
      "status": "Incomplete - Hardcoded localhost URLs",
      "location": "screens/social-media/components/SocialMediaConnect.tsx:36"
    },
    {
      "feature": "Confirmation Dialogs for Automation",
      "status": "Pending",
      "location": "todo.txt lines 26-27"
    },
    {
      "feature": "News Section Events for Admin",
      "status": "Pending",
      "location": "todo.txt line 25"
    }
  ],
  "integrations": [
    {
      "service": "WiseAdmit API",
      "endpoint_env": "VITE_API_URL",
      "usage": "Primary backend API"
    },
    {
      "service": "Socket.io Server",
      "endpoint_env": "VITE_SOCKET_URL",
      "usage": "Real-time chat and notifications"
    },
    {
      "service": "Stripe",
      "key_env": "VITE_STRIPE_PUBLIC_KEY",
      "usage": "Payment processing"
    },
    {
      "service": "Mixpanel",
      "key_env": "VITE_PUBLIC_ANALYTICS_KEY",
      "usage": "Analytics tracking"
    },
    {
      "service": "CloudFront",
      "endpoint_env": "VITE_DISTRIBUTION",
      "usage": "Asset delivery"
    },
    {
      "service": "AI Service",
      "endpoint": "https://ai-dev.wiseadmit.io/api/v1",
      "usage": "AI features via proxy"
    },
    {
      "service": "Facebook/Meta",
      "app_id_env": "VITE_PUBLIC_FB_APP_ID",
      "usage": "Social media integration"
    }
  ],
  "tech_debt": [
    {
      "issue": "Monolithic HTTP service file (162KB)",
      "location": "http/admin-service.ts:1-6003",
      "severity": "High"
    },
    {
      "issue": "Mixed Material-UI v4 and v5 imports",
      "location": "package.json:25-28, multiple screens",
      "severity": "Medium"
    },
    {
      "issue": "React Router v6 beta (unstable)",
      "location": "package.json:137-138",
      "severity": "Medium"
    },
    {
      "issue": "Extensive use of 'any' type",
      "location": "500+ occurrences across codebase",
      "severity": "High"
    },
    {
      "issue": "Debug console.log statements in production",
      "location": "main-flow.tsx:94,112, view-program/components/start-application.tsx:276",
      "severity": "Medium"
    },
    {
      "issue": "Hardcoded localhost URLs in social media",
      "location": "screens/social-media/components/SocialMediaConnect.tsx:36",
      "severity": "High"
    },
    {
      "issue": "Duplicate reducer exports",
      "location": "store/reducers/index.ts:38,44",
      "severity": "Low"
    },
    {
      "issue": "Commented code and dead imports",
      "location": "App.tsx:46, routes.tsx:289-310",
      "severity": "Low"
    }
  ],
  "regression_risk_areas": [
    {
      "area": "HTTP Service Layer",
      "file": "http/admin-service.ts",
      "impact": "High - 200+ API methods used across all screens",
      "lines": "1-6003"
    },
    {
      "area": "Redux Store Configuration",
      "file": "store/index.ts",
      "impact": "High - 60+ reducers, socket middleware, localStorage sync",
      "lines": "1-169"
    },
    {
      "area": "Routing and Permissions",
      "file": "utils/routing/routes.tsx, CoreApp.tsx",
      "impact": "High - All route definitions and permission filtering",
      "lines": "1-491, 1-110"
    },
    {
      "area": "Conversations/Chat",
      "file": "store/reducers/conversations.ts",
      "impact": "High - Complex real-time logic with socket events",
      "lines": "1-15508"
    },
    {
      "area": "Automation Workflow",
      "file": "screens/automation/components/create-automation/flow/main-flow.tsx",
      "impact": "Medium-High - Complex XYFlow integration with state management",
      "lines": "1-554"
    }
  ],
  "enhancement_ready_modules": [
    "screens/announcements/",
    "screens/webinar/",
    "screens/scholarships/",
    "screens/our-team/",
    "screens/referral/",
    "screens/events-gallery/",
    "screens/feedback/",
    "screens/contact/"
  ],
  "needs_refactor_first": [
    {
      "module": "http/admin-service.ts",
      "reason": "162KB monolith - split into domain services",
      "priority": "High"
    },
    {
      "module": "screens/automation/",
      "reason": "Complex state management needs extraction",
      "priority": "High"
    },
    {
      "module": "screens/conversations/",
      "reason": "Socket coupling in reducers",
      "priority": "Medium"
    },
    {
      "module": "screens/student/",
      "reason": "82 scattered files, need consolidation",
      "priority": "Medium"
    },
    {
      "module": "screens/dashboard/",
      "reason": "72 mixed items, separate concerns",
      "priority": "Medium"
    },
    {
      "module": "TypeScript 'any' types",
      "reason": "500+ occurrences block safe refactoring",
      "priority": "High"
    }
  ]
}
```

---

**Summary:** This is a mature, feature-rich education platform admin dashboard with 50+ functional modules. The architecture uses modern React patterns but has accumulated tech debt primarily in the monolithic HTTP service layer, extensive use of `any` types, and mixed MUI versions. The automation workflow builder using XYFlow is a standout feature. The most critical risk areas are the central store configuration and the 162KB admin-service file. Refactoring these foundational pieces should precede major new feature work.