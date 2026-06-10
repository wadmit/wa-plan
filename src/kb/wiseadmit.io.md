# Project Intelligence Report: WiseAdmit Frontend

## 1. PROJECT OVERVIEW

**Project Name:** `frontend` (WiseAdmit.io Student Portal)  
**Purpose:** An all-in-one platform for international students to find scholarships, best-fit university programs, and apply to universities worldwide.

**Tech Stack:**
- **Framework:** Next.js 14.2.5 (App Router architecture)
- **Language:** TypeScript 5.7.3
- **Package Manager:** pnpm 9.15.4
- **UI Library:** Material-UI (MUI) v5.16.5 + @mui/x-date-pickers
- **Styling:** Emotion (CSS-in-JS), Tailwind patterns in some components
- **State Management:** Redux Toolkit 2.2.7 + TanStack Query (React Query) 5.65.1
- **Authentication:** Next-Auth 5.0.0-beta.20 with JWT strategy
- **Animation:** Framer Motion 11.18.2, Lottie, Rive
- **Forms:** Formik 2.4.6 + Yup 0.32.11
- **HTTP Client:** Axios with custom interceptors
- **Real-time:** Socket.io-client 4.8.1
- **PDF Generation:** @react-pdf/renderer 4.5.1
- **Analytics:** Mixpanel-browser, Meta Pixel (Facebook), Google Analytics UA-203696828-1

**Architecture Type:** Full-stack monolithic Next.js application with:
- App Router structure ([src/app/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/app:0:0-0:0) with route groups: `(main)`, `(student-portal)`, `(nuaa)`)
- Server Components by default, "use client" for interactive components
- Modular page-components architecture

**Deployment/Infra:**
- **Primary:** AWS Amplify (evident from `build.md` logs)
- **CDN:** CloudFront (d30wxqb3mmk4o.cloudfront.net, dpf0lffknxpow.cloudfront.net)
- **Domain:** wiseadmit.io (prod), dev.wiseadmit.io, devadmin.wiseadmit.io
- **API Base:** api.wiseadmit.io / api-dev.wiseadmit.io
- **Package Override:** Only pnpm allowed (`"preinstall": "npx only-allow pnpm"`)

---

## 2. MODULE MAP

### Core/Shared Modules (Multiple Dependents)

| Module | Location | Purpose | Key Dependencies |
|--------|----------|---------|------------------|
| **API Service** | [src/services/api.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/services/api.service.ts:0:0-0:0) | HTTP client with auth interceptors | axios, next-auth |
| **Auth** | [src/auth/auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/auth/auth.ts:0:0-0:0), [src/context/auth-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/context/auth-context.tsx:0:0-0:0) | Next-Auth config, JWT handling, session management | next-auth, jsonwebtoken |
| **Notification Context** | [src/context/notification-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/context/notification-context.tsx:0:0-0:0) | Push notification subscription management | native Push API |
| **Socket** | [src/config/socket.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/config/socket.ts:0:0-0:0), [src/global-states/socket-middleware.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/global-states/socket-middleware.ts:0:0-0:0) | Real-time notifications | socket.io-client |
| **Redux Store** | [src/global-states/store.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/global-states/store.ts:0:0-0:0) | Global state management | @reduxjs/toolkit |
| **Currency Provider** | [src/providers/CurrencyProvider.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/providers/CurrencyProvider.tsx:0:0-0:0) | Exchange rate & currency conversion | - |
| **TanStack Provider** | [src/providers/TanstackProvider.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/providers/TanstackProvider.tsx:0:0-0:0) | Query caching & server state | @tanstack/react-query |
| **Common Components** | [src/components/common/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/components/common:0:0-0:0) (163 items) | Reusable UI components (buttons, forms, modals) | MUI |

### Feature Modules

| Module | Location | Purpose | Key Files |
|--------|----------|---------|-----------|
| **Dashboard** | [src/page-components/dashboard/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard:0:0-0:0) (180 items), `src/app/(student-portal)/dashboard/` | Student portal home, applications, reminders | `index.tsx:1-351`, [applications/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard/applications:0:0-0:0), [documents/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard/documents:0:0-0:0), [profile/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard/profile:0:0-0:0) |
| **WiseScore** | [src/page-components/wisescore/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/wisescore:0:0-0:0) (140 items) | Eligibility scoring system | [WiseScoreComponent.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/wisescore/WiseScoreComponent.tsx:0:0-0:0), [wisescore-thankyou/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/wisescore/wisescore-thankyou:0:0-0:0) |
| **Apply Now/Auth** | [src/page-components/apply-now/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/apply-now:0:0-0:0) (22 items), `src/app/(main)/applynow/` | Student signup, signin, OTP | [SignIn.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/apply-now/SignIn.tsx:0:0-0:0), [SignUp.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/apply-now/SignUp.tsx:0:0-0:0), [forgot-password/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/apply-now/forgot-password:0:0-0:0) |
| **Programs** | [src/page-components/programs/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/programs:0:0-0:0) (27 items), `src/app/(main)/programs/` | University program listings | [ProgramAdmissionCard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/programs/components/ProgramAdmissionCard.tsx:0:0-0:0), [ProgramNewCard.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/programs/components/ProgramNewCard.tsx:0:0-0:0) |
| **Universities** | [src/page-components/universities/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/universities:0:0-0:0) (26 items) | University profiles & details | - |
| **Applications** | [src/page-components/dashboard/applications/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard/applications:0:0-0:0) | Application management & payments | [PaymentModel.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard/applications/new-single-components/PaymentModel.tsx:0:0-0:0), [ApplicationFeeDetail.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard/applications/new-single-components/ApplicationFeeDetail.tsx:0:0-0:0) |
| **Students Landing** | [src/page-components/students/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/students:0:0-0:0) (49 items), `src/app/(main)/` | Public student landing pages | [Herosection.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/students/Herosection.tsx:0:0-0:0), [WhyBeWise.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/students/WhyBeWise.tsx:0:0-0:0), [WiseScoreIntro.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/students/WiseScoreIntro.tsx:0:0-0:0) |
| **Blog/News** | [src/page-components/blog/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/blog:0:0-0:0) (19), [src/page-components/news/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/news:0:0-0:0) (17) | Content management | [blog.actions.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/blog.actions.ts:0:0-0:0), [news.actions.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/news.actions.ts:0:0-0:0) |
| **Scholarships** | [src/page-components/scholarships/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/scholarships:0:0-0:0) (32), [src/page-components/featured-scholarships/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/featured-scholarships:0:0-0:0) | Scholarship listings & matching | - |
| **Recruiting Partners** | [src/page-components/recruiting-partners/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/recruiting-partners:0:0-0:0) (40 items) | Partner/institution portal | [PartnerCollaborationForm.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/joinus/forms/PartnerCollaborationForm.tsx:0:0-0:0) |
| **Cost Calculator** | [src/page-components/costcalculator/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/costcalculator:0:0-0:0) (8 items) | Tuition/fee estimation | [costcaluclator.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/costcaluclator.action.ts:0:0-0:0) |
| **Chatbot** | [src/page-components/chatbot/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/chatbot:0:0-0:0) (10 items) | AI support chat | [chatbotReducers.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/global-states/reducers/chatbotReducers.ts:0:0-0:0) |
| **NUAA** | [src/page-components/nuaa/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/nuaa:0:0-0:0) (14 items), `src/app/(nuaa)/` | Nepal Universities Admission Assessment | `nuaa-score/` |
| **Chitwan Event** | [src/page-components/dashboard/chitwan-event/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard/chitwan-event:0:0-0:0) | Special event management | [EventPhotoWall.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard/chitwan-event/components/EventPhotoWall.tsx:0:0-0:0), `csca/` |
| **Webinars** | [src/page-components/webinars/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/webinars:0:0-0:0) (15 items) | Webinar registration & listings | [webinar.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/webinar.action.ts:0:0-0:0) |
| **Help Center** | [src/page-components/help-center/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/help-center:0:0-0:0) (7 items) | FAQ & support | [HelpCenterContact.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/help-center/components/HelpCenterContact.tsx:0:0-0:0) |
| **Gallery** | [src/page-components/gallery/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/gallery:0:0-0:0) (12 items) | Photo galleries | [gallery.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/gallery.action.ts:0:0-0:0) |
| **Payments** | [src/global-states/reducers/paymentReducer.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/global-states/reducers/paymentReducer.ts:0:0-0:0), [src/api/web/payment.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/payment.action.ts:0:0-0:0) | Payment processing | Stripe, Esewa integrations |

---

## 3. CURRENT FEATURE INVENTORY

### Fully Implemented Features
- **Authentication:** Email/password login, OTP verification, password reset, session management with JWT
- **Student Dashboard:** Application tracking, document uploads, profile management, roadmap/progress UI
- **WiseScore:** Multi-step eligibility assessment with dynamic forms, score calculation, program recommendations
- **Program Discovery:** Search, filter, shortlist, AI search ([ai-search.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/ai-search.ts:0:0-0:0))
- **Application Management:** End-to-end application flow with status tracking, document requirements
- **Payment Processing:** Stripe integration, Esewa (Nepal) payment gateway, fee management
- **Real-time Notifications:** Socket.io-based push notifications, browser push notification subscription
- **Content System:** Blog, news, webinars, scholarships, upcoming events
- **Recruiter Portal:** Partner collaboration forms, revenue calculator
- **Analytics:** Mixpanel tracking, Meta Pixel, Google Analytics
- **Mobile Responsive:** MUI breakpoints, mobile-first components

### Partially Implemented / Incomplete

| Area | Evidence | Location |
|------|----------|----------|
| **TODO Comments** | 6 TODO items | [src/page-components/dashboard/utils/data.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/dashboard/utils/data.ts:0:0-0:0), [src/auth/auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/auth/auth.ts:0:0-0:0) (2), [src/page-components/home/svg/index.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/home/svg/index.tsx:0:0-0:0) (4) |
| **Commented Code** | Large blocks of unused JSX | `src/page-components/dashboard/index.tsx:299-348` (old dashboard layout), [src/page-components/wisescore/svgs/index.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/wisescore/svgs/index.tsx:0:0-0:0) |
| **Empty Files** | [helper.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/helper.action.ts:0:0-0:0) (0 bytes), `temp.ts` (0 bytes) | [src/api/web/helper.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/helper.action.ts:0:0-0:0), root `temp.ts` |
| **Hardcoded Configs** | Analytics IDs, API keys in .env | `NEXT_PUBLIC_GOOGLE_ANALYTICS = UA-203696828-1`, `NEXT_PUBLIC_ANALYTICS_KEY`, hardcoded `NEXT_PUBLIC_NUAA_FOUNDATION_ID = 6368b57bb9b22b7f9e9397fc` @ `.env:30` |
| **Mixed Dev/Prod URLs** | Env file has commented configs | `.env:1-30` has multiple URL variants commented/uncommented |
| **SVG TODOs** | Flag/color TODOs | [src/page-components/universities/svg/index.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/page-components/universities/svg/index.tsx:0:0-0:0) (12 matches) |

### Legacy/Deprecated
- Old program URL pattern redirect in middleware (`/^\/programs\/([^\/]+)$/`)
- Deprecated commented code in dashboard index (lines 299-348)
- Old invitation section commented out (`/* <InvitationSeciton /> */` in dashboard)

---

## 4. DEPENDENCIES & INTEGRATIONS

### External Services/APIs

| Service | Purpose | Integration Point |
|---------|---------|-------------------|
| **WiseAdmit API** | Core backend | `NEXT_PUBLIC_BASE_URL=https://api.wiseadmit.io` @ `src/services/api.service.ts:7` |
| **Socket Server** | Real-time notifications | `NEXT_PUBLIC_SOCKET_URL=https://api-dev.wiseadmit.io` @ `src/config/socket.ts:16` |
| **Stripe** | Payment processing | [postStripePayment()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/payment.action.ts:6:0-36:2) @ `src/api/web/payment.action.ts:7-37` |
| **Esewa** | Nepal payment gateway | [postEsewaPayment()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/payment.action.ts:38:0-68:2) @ `src/api/web/payment.action.ts:39-69` |
| **CloudFront CDN** | Image distribution | `d30wxqb3mmk4o.cloudfront.net`, `dpf0lffknxpow.cloudfront.net` |
| **Mixpanel** | Analytics tracking | `mixpanel-browser` @ [src/types/mix-panel-analytic.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/types/mix-panel-analytic.ts:0:0-0:0) |
| **Meta Pixel** | Facebook tracking | Pixel ID hardcoded @ `src/app/layout.tsx:17` |
| **Google Analytics** | Web analytics | `UA-203696828-1` @ `.env:9` |
| **HubSpot** | CRM/Chat | Script injection @ `.env:10` |
| **FlagCDN** | Country flags | `flagcdn.com` @ `next.config.mjs:18` |
| **Chat Service** | Support chat | `NEXT_PUBLIC_CHAT_URL=https://dev-xass.wiseadmit.io` |

### Database/ORM
- **Backend-managed:** No direct DB connection from frontend
- **Data fetching:** REST API via `ApiService` with TanStack Query caching
- **Storage:** S3 (via CloudFront) for documents/images

### Internal Service Dependencies
- **Redux Slices:** 18 reducers managing UI state, form data, socket connections, notifications
- **Context Providers:** 12 React contexts for specialized state (auth, notifications, programs, documents, etc.)
- **Hooks:** 24 custom hooks including [useCustomQuery](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/hooks/useCustomQuery.tsx:11:0-38:1), `useNotificationSync`, `useSocketInitializer`

---

## 5. KNOWN ISSUES & TECH DEBT

### Critical Issues

| Issue | Location | Severity |
|-------|----------|----------|
| **Hardcoded Meta Pixel ID** | `src/app/layout.tsx:17` - `WISEADMIT_PIXEL_ID = "8429295153839378"` | High - Should be env-only |
| **Hardcoded Foundation ID** | `.env:30` - `NEXT_PUBLIC_NUAA_FOUNDATION_ID = 6368b57bb9b22b7f9e9397fc` | Medium - Org-specific config in code |
| **Mixed Environment Configs** | [.env](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/.env:0:0-0:0) has active dev URLs mixed with prod comments | High - Risk of misconfiguration |
| **Build Failure** | `build.md:182` - ERR_PNPM_IGNORED_BUILDS for sharp, core-js | High - Blocking deployment |

### Code Quality Issues

| Issue | Evidence | Files |
|-------|----------|-------|
| **Console.log statements** | 155 matches across 79 files | [src/utils/notifications.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/utils/notifications.ts:0:0-0:0) (21), [src/auth/auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/auth/auth.ts:0:0-0:0) (7), etc. |
| **TypeScript 'any' usage** | `(err as any).response` | `src/auth/auth.ts:47`, `src/services/api.service.ts:60` |
| **Magic numbers** | Status codes, timeout values | `src/config/socket.ts:27` (10000ms), various API calls |
| **File naming inconsistency** | [costcaluclator.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/costcaluclator.action.ts:0:0-0:0) (typo), [university.action..ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/university.action..ts:0:0-0:0) (double dot) | [src/api/web/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web:0:0-0:0) |
| **Empty action file** | [helper.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/helper.action.ts:0:0-0:0) exists but is 0 bytes | [src/api/web/helper.action.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/api/web/helper.action.ts:0:0-0:0) |
| **Duplicate middleware** | Two [middleware.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/middleware.ts:0:0-0:0) files (root and src) | [middleware.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/middleware.ts:0:0-0:0), [src/middleware.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/middleware.ts:0:0-0:0) |

### Security Concerns

| Issue | Location | Details |
|-------|----------|---------|
| **API Key in client bundle** | `.env:24` - `NEXT_PUBLIC_API_KEY = WISE873KAHDHDKEMA2` | Public API key pattern (acceptable if rate-limited) |
| **Hardcoded JWT secret** | `.env:18` - `NEXTAUTH_SECRET = wiseadmitisawesome` | Should be strong random in production |
| **CORS headers** | `next.config.mjs:47-68` | Specific origin allowlisting present but commented dev URLs |
| **Referral cookie** | `src/middleware.ts:52-55` - 30 day maxAge | Review security attributes |

### Missing/Incomplete

| Item | Evidence |
|------|----------|
| **No test files** | 0 `.test.` or `.spec.` files found |
| **Empty docs folder** | [docs/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/docs:0:0-0:0) directory exists but is empty |
| **No error boundary** | No global error.tsx in app root |
| **No loading.tsx** | Route-level loading states missing |

---

## 6. REGRESSION RISK AREAS

### High Risk (Tightly Coupled)

| Area | Dependencies | Risk Factors |
|------|--------------|--------------|
| **ApiService** | Used by 44 API action files, Redux, contexts | Change affects all data fetching; auth interceptor changes impact session handling |
| **Auth System** | Middleware, ApiService interceptors, all protected routes | Changes to JWT handling, session strategy affect entire app auth |
| **Redux Store** | 18 reducers, socket middleware, all providers | State shape changes require updates across all consumers |
| **Socket Layer** | Notifications, real-time updates | Changes to event types affect `src/config/socket.ts:87-113` and all listeners |
| **WiseScore** | Complex form state, validation, scoring logic | Hooks depend on each other: `useWiseScoreData`, `useWiseScoreActions`, `useWiseScoreValidation` |

### Medium Risk

| Area | Dependents |
|------|------------|
| **Payment Actions** | Dashboard applications, payment reducers, status components |
| **Application Status** | Dashboard, notifications, documents, socket events |
| **Currency Provider** | Cost calculators, program cards, application fees |
| **Notification Context** | All dashboard pages, push subscription UI |

### Critical Functions Called From Many Places

| Function/Component | Location | Callers |
|-------------------|----------|---------|
| `ApiService.get/post/put/delete/patch` | `src/services/api.service.ts:107-187` | 44+ action files |
| `auth()` from next-auth | [src/auth/auth.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/auth/auth.ts:0:0-0:0) | Middleware, ApiService, server components |
| [useCustomQuery](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/hooks/useCustomQuery.tsx:11:0-38:1) | [src/hooks/useCustomQuery.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/hooks/useCustomQuery.tsx:0:0-0:0) | Dashboard, programs, universities, etc. |
| [request()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/latest-front/src/services/api.service.ts:25:0-54:2) (axios wrapper) | `src/services/api.service.ts:27-55` | File uploads, special API calls |
| `Socket.emit/on` | `src/config/socket.ts:55-74` | Notification system, real-time features |

---

## 7. ENHANCEMENT READINESS

### Clean/Ready for Enhancement

| Module | Assessment | Notes |
|--------|------------|-------|
| **Blog/News** | Clean | Well-isolated, standard CRUD patterns |
| **Gallery** | Clean | Simple image display, minimal dependencies |
| **Webinars** | Clean | Self-contained feature |
| **Help Center** | Clean | Static content with contact form |
| **Scholarships** | Clean | Listings with filters |

### Needs Refactoring Before Enhancement

| Module | Issues | Refactoring Needed |
|--------|--------|-------------------|
| **Dashboard Applications** | Large files (`PaymentModel.tsx:39 matches`), mixed concerns | Split payment UI from application logic, extract components |
| **WiseScore** | Complex hook interdependencies, hardcoded Nepal logic | Abstract country-specific logic, simplify hook chain |
| **Apply Now/Auth** | Split across page-components and app router | Consolidate auth flows, extract common validation |
| **Notification System** | 155 console logs, mixed socket/push logic | Clean up logging, separate socket from push notifications |
| **Student Landing** | Large files (`WhyBeWise.tsx:26908 bytes`, `StudentWall.tsx:17873 bytes`) | Component extraction, lazy loading |
| **Cost Calculator** | Typo in filename, potential calculation issues | Rename file, review calculation accuracy |

### Missing Foundational Pieces (Blocking New Work)

| Item | Current State | Impact |
|------|---------------|--------|
| **Test Suite** | None exists | Cannot safely refactor without regression risk |
| **Error Boundary** | Missing | Crashes in any component can take down entire app |
| **Loading States** | No route-level loading.tsx | Poor UX during navigation |
| **Storybook/Component Docs** | None | Difficult to maintain consistent UI |
| **Build Pipeline** | Broken (build.md shows failures) | Cannot deploy changes |

---

## 8. STRUCTURED JSON OUTPUT

```json
{
  "project_name": "WiseAdmit Frontend",
  "tech_stack": {
    "framework": "Next.js 14.2.5",
    "language": "TypeScript 5.7.3",
    "state_management": ["Redux Toolkit 2.2.7", "TanStack Query 5.65.1"],
    "ui_library": "Material-UI v5.16.5",
    "auth": "Next-Auth 5.0.0-beta.20",
    "realtime": "Socket.io-client 4.8.1",
    "forms": "Formik 2.4.6 + Yup 0.32.11",
    "animation": "Framer Motion 11.18.2",
    "payment": ["Stripe", "Esewa (Nepal)"]
  },
  "architecture": "Full-stack monolithic Next.js App Router with modular page-components, server components default, Redux + TanStack Query state, Socket.io real-time",
  "modules": [
    {
      "name": "Dashboard",
      "path": "src/page-components/dashboard/",
      "files": 180,
      "purpose": "Student portal with applications, documents, profile management"
    },
    {
      "name": "WiseScore",
      "path": "src/page-components/wisescore/",
      "files": 140,
      "purpose": "Eligibility scoring system with multi-step forms"
    },
    {
      "name": "ApplyNow/Auth",
      "path": "src/page-components/apply-now/",
      "files": 22,
      "purpose": "Authentication flows - signin, signup, OTP, password reset"
    },
    {
      "name": "Programs",
      "path": "src/page-components/programs/",
      "files": 27,
      "purpose": "University program discovery and filtering"
    },
    {
      "name": "Universities",
      "path": "src/page-components/universities/",
      "files": 26,
      "purpose": "University profiles and details"
    },
    {
      "name": "Students Landing",
      "path": "src/page-components/students/",
      "files": 49,
      "purpose": "Public marketing pages and student acquisition funnel"
    },
    {
      "name": "Recruiting Partners",
      "path": "src/page-components/recruiting-partners/",
      "files": 40,
      "purpose": "Partner portal for institutions and recruiters"
    },
    {
      "name": "Scholarships",
      "path": "src/page-components/scholarships/",
      "files": 32,
      "purpose": "Scholarship listings and matching"
    },
    {
      "name": "Blog/News",
      "path": "src/page-components/blog/, src/page-components/news/",
      "files": 36,
      "purpose": "Content management and CMS features"
    },
    {
      "name": "Core/Shared",
      "path": "src/components/common/, src/services/, src/auth/",
      "files": 200,
      "purpose": "Shared UI components, API service, authentication system"
    }
  ],
  "features_existing": [
    "JWT-based authentication with email/password and OTP",
    "Student dashboard with application tracking",
    "WiseScore eligibility assessment",
    "Program discovery with AI search",
    "Application management with document uploads",
    "Payment processing (Stripe + Esewa)",
    "Real-time notifications (Socket.io + Push API)",
    "Blog/News content system",
    "Webinar registration",
    "Scholarship matching",
    "Partner/recruiter portal",
    "Cost calculator",
    "Chatbot integration",
    "Analytics (Mixpanel, Meta Pixel, GA)",
    "Mobile responsive design"
  ],
  "features_incomplete": [
    "Invitation section commented out in dashboard (line 75-77, 233-234)",
    "Old dashboard layout commented (lines 299-348)",
    "Helper action file is empty (0 bytes)",
    "Push notification VAPID key generation script exists but not integrated",
    "Build pipeline has unresolved dependency issues"
  ],
  "integrations": [
    "WiseAdmit API (api.wiseadmit.io)",
    "Socket server (api-dev.wiseadmit.io)",
    "Stripe payments",
    "Esewa payment gateway (Nepal)",
    "CloudFront CDN (image distribution)",
    "Mixpanel analytics",
    "Meta Pixel tracking",
    "Google Analytics UA-203696828-1",
    "HubSpot CRM",
    "Chat service (dev-xass.wiseadmit.io)"
  ],
  "tech_debt": [
    "Hardcoded Meta Pixel ID in layout.tsx (line 17)",
    "Hardcoded NUAA Foundation ID in .env (line 30)",
    "155 console.log statements across 79 files",
    "TypeScript 'any' usage in auth.ts and api.service.ts",
    "No test files exist (0% coverage)",
    "Empty docs folder",
    "Duplicate middleware.ts files (root and src)",
    "Mixed dev/prod environment variables in .env",
    "File naming inconsistencies (costcaluclator.action.ts typo)",
    "Build failure: ERR_PNPM_IGNORED_BUILDS for sharp and core-js",
    "Missing error boundaries and loading states"
  ],
  "regression_risk_areas": [
    {
      "area": "ApiService",
      "risk": "High - Used by all 44+ API actions",
      "location": "src/services/api.service.ts:107-187"
    },
    {
      "area": "Auth System",
      "risk": "High - JWT handling affects all protected routes",
      "location": "src/auth/auth.ts, src/middleware.ts"
    },
    {
      "area": "Redux Store",
      "risk": "High - 18 reducers, middleware affects all state",
      "location": "src/global-states/store.ts"
    },
    {
      "area": "Socket Layer",
      "risk": "High - 15 event types, real-time notifications",
      "location": "src/config/socket.ts:87-113"
    },
    {
      "area": "WiseScore Hook Chain",
      "risk": "Medium - Complex interdependent hooks",
      "location": "src/page-components/wisescore/hooks/"
    }
  ],
  "enhancement_ready_modules": [
    "Blog/News (clean CRUD)",
    "Gallery (simple display)",
    "Webinars (self-contained)",
    "Help Center (static content)",
    "Scholarship listings"
  ],
  "needs_refactor_first": [
    {
      "module": "Dashboard Applications",
      "issues": ["PaymentModel.tsx 39 matches", "Mixed concerns", "Large files"]
    },
    {
      "module": "WiseScore",
      "issues": ["Complex hook chain", "Hardcoded Nepal logic", "Large component"]
    },
    {
      "module": "Apply Now/Auth",
      "issues": ["Split across folders", "Inconsistent patterns"]
    },
    {
      "module": "Student Landing",
      "issues": ["WhyBeWise.tsx 26908 bytes", "StudentWall.tsx 17873 bytes", "Needs component extraction"]
    },
    {
      "module": "Notification System",
      "issues": ["155 console logs", "Mixed socket/push logic"]
    }
  ]
}
```

---

**Summary:** WiseAdmit Frontend is a feature-rich Next.js 14 application serving international students with university discovery, applications, and payment processing. While feature-complete for core flows, it has significant tech debt including hardcoded configs, 155 console.log statements, no tests, and build pipeline issues. The architecture is modular but needs refactoring in the Dashboard, WiseScore, and Student Landing areas before major enhancements. Critical dependencies on ApiService, Auth, and Redux mean changes to these require extensive regression testing (which currently doesn't exist).