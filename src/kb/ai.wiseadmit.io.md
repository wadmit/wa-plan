# Project Intelligence Report: AI Interview Frontend

## 1. PROJECT OVERVIEW

**Project Name:** AI Interview Frontend (WiseAdmit AI Interview Platform)

**Purpose:** A Next.js-based web application for conducting AI-powered video interviews with voice synthesis (TTS), automated speech-to-text, and real-time media recording capabilities. Candidates complete technical/behavioral interviews through a guided web interface with device setup onboarding.

**Tech Stack:**
| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 15.0.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | 3.4.1 |
| UI Animation | Framer Motion | ^12.10.2 |
| State Management | Redux Toolkit | ^2.4.0 |
| HTTP Client | Axios | ^1.7.9 |
| TTS Provider | ElevenLabs API | v1 |
| AI Generation | OpenAI GPT-4 | - |
| Icons | Lucide React | ^0.484.0 |
| Build Tool | Turbopack (via `next dev --turbopack`) | - |
| Package Manager | pnpm | (evident from pnpm-lock.yaml) |

**Architecture Type:** Full-stack monolithic Next.js application using App Router
- **Frontend:** React 19 with server/client components
- **Backend:** Next.js API routes for TTS and interview generation
- **State:** Redux for global state + React Context for feature-specific state (TTS, Media, Audio Permission, Steps)
- **No Database:** Relies entirely on external API (`ai-dev.wiseadmit.io/api/v1`)

**Deployment/Infra Hints:**
- No Dockerfile or CI configuration files found
- Environment variables for API keys stored in `.env` (server-side only for sensitive keys)
- CloudFront CDN domains configured in `next.config.ts` for images:
  - `d30wxqb3mmk4o.cloudfront.net`
  - `dpf0lffknxpow.cloudfront.net`
- Google Analytics configured: `G-PDG88W6Y6G`
- Server actions body size limit: 100MB (for video uploads)
- CORS headers configured for `/api/*` routes

---

## 2. MODULE MAP

### Core/Shared Modules

| Module | Files | Purpose | Key Dependencies |
|--------|-------|---------|------------------|
| **HTTP/API Layer** | [src/http/api.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/http/api.ts:0:0-0:0) | Axios instance with interceptors for backend API communication | axios |
| **Types** | [src/types/types.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/types/types.ts:0:0-0:0) | Shared TypeScript interfaces for device setup, audio status, setup steps | - |
| **Redux Store** | [src/lib/store.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/store.ts:0:0-0:0), `src/lib/reducers/*.ts` | Global state management for interview session, questions, candidate data | @reduxjs/toolkit |
| **Hooks** | `src/lib/hooks/*.ts`, `src/hooks/*.ts` | Custom React hooks: TTS management, interview orchestration, background uploads, media queries | react, howler |

### Feature Modules

| Feature | Owner Files | Purpose | Key Dependencies |
|---------|-------------|---------|------------------|
| **TTS System** | [src/lib/services/tts.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/tts.service.ts:0:0-0:0)<br>`src/lib/services/tts-providers/*`<br>[src/lib/services/voice-settings.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/voice-settings.service.ts:0:0-0:0)<br>[src/context/tts-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/tts-context.tsx:0:0-0:0)<br>[src/lib/hooks/useTTSManager.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/hooks/useTTSManager.ts:0:0-0:0) | Text-to-speech with ElevenLabs, caching, queue management, voice presets | howler, framer-motion |
| **Media Recording** | [src/context/media-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/media-context.tsx:0:0-0:0) | Audio/video/screen recording via MediaRecorder API, device permission handling | - |
| **Upload Service** | [src/lib/services/upload.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/upload.service.ts:0:0-0:0)<br>[src/lib/utils/file-compression.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/utils/file-compression.ts:0:0-0:0) | Chunked file uploads, compression, presigned URL uploads, progress tracking | - |
| **Interview Orchestration** | [src/lib/services/interview.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/interview.service.ts:0:0-0:0)<br>[src/lib/hooks/useInterviewManager.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/hooks/useInterviewManager.ts:0:0-0:0)<br>`src/lib/reducers/interview*.ts` | Interview state machine (reducer pattern), question flow, answer recording | openai (API) |
| **Onboarding** | `src/app/onboarding/**/*` | 2-page onboarding: interview overview + device setup (mic, camera, screen share, speech recognition) | framer-motion, lucide-react |
| **Interview Session** | `src/app/interview/**/*` | Main interview UI: ExamPortal, QuestionAnswer, SubmitModal, CongratsModal, MediaComponent | redux, axios |
| **Login** | `src/app/login/**/*` | Login page (minimal implementation) | - |
| **Mobile Blocking** | [src/app/components/MobileBlocker.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/components/MobileBlocker.tsx:0:0-0:0) | Prevents mobile/tablet access with animated UI | framer-motion |
| **Audio Lock** | [src/lib/services/audio-lock.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/audio-lock.ts:0:0-0:0) | Mutex for coordinating TTS playback across components | - |

---

## 3. CURRENT FEATURE INVENTORY

### Fully Implemented Features

| Feature | Implementation Location | Status |
|---------|------------------------|--------|
| AI-generated interview questions | [src/app/api/generate-interview/route.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/api/generate-interview/route.ts:0:0-0:0) | ✅ Uses GPT-4 Turbo to generate welcome, rephrased questions, transitions, closing |
| Text-to-Speech (TTS) | [src/lib/services/tts.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/tts.service.ts:0:0-0:0), [src/app/api/tts/route.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/api/tts/route.ts:0:0-0:0) | ✅ ElevenLabs integration with caching, queue system, retry logic |
| Voice presets (formal/friendly/expressive) | [src/lib/services/voice-settings.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/voice-settings.service.ts:0:0-0:0) | ✅ 4 presets with configurable stability/style |
| Audio recording | [src/context/media-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/media-context.tsx:0:0-0:0) | ✅ Web MediaRecorder with blob handling |
| Video recording | [src/context/media-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/media-context.tsx:0:0-0:0) | ✅ Web MediaRecorder with webm format |
| Screen recording | [src/context/media-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/media-context.tsx:0:0-0:0) | ✅ getDisplayMedia with optimized bitrate (2MBps) |
| Chunked file upload | [src/lib/services/upload.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/upload.service.ts:0:0-0:0) | ✅ 512KB chunks, retry logic, progress tracking |
| Presigned URL upload (S3) | [src/lib/services/upload.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/upload.service.ts:0:0-0:0) | ✅ Background upload without blocking interview flow |
| File compression | [src/lib/utils/file-compression.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/utils/file-compression.ts:0:0-0:0) | ✅ Audio compression via Web Audio API |
| Background upload tracking | [src/lib/hooks/useBackgroundUploads.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/hooks/useBackgroundUploads.ts:0:0-0:0) | ✅ 200ms polling for upload progress |
| Interview onboarding Page 1 | [src/app/onboarding/components/onboardingpage1/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/onboarding/components/onboardingpage1:0:0-0:0) | ✅ Interview overview, tips, FAQ, start button |
| Interview onboarding Page 2 | [src/app/onboarding/components/onboardingpage2/](cci:9://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/onboarding/components/onboardingpage2:0:0-0:0) | ✅ Step-based device setup with TTS guidance |
| Speech recognition | [src/app/onboarding/components/onboardingpage2/components/micro-phone/SpeechRecognition.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/onboarding/components/onboardingpage2/components/micro-phone/SpeechRecognition.tsx:0:0-0:0) | ✅ Web Speech API for "I am ready" confirmation |
| Device selection | [src/app/onboarding/components/onboardingpage2/components/micro-phone/MicrophoneSelector.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/onboarding/components/onboardingpage2/components/micro-phone/MicrophoneSelector.tsx:0:0-0:0) | ✅ enumerateDevices for mic/camera selection |
| Audio level visualization | [src/app/onboarding/components/onboardingpage2/components/micro-phone/AudioIntensity.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/onboarding/components/onboardingpage2/components/micro-phone/AudioIntensity.tsx:0:0-0:0) | ✅ Real-time audio visualizer |
| Mobile/tablet blocking | [src/app/components/MobileBlocker.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/components/MobileBlocker.tsx:0:0-0:0) | ✅ UAParser + screen size detection |
| Interview session flow | [src/app/interview/components/ExamPortal.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/ExamPortal.tsx:0:0-0:0) | ✅ Question progression, progress bar, timer |
| Answer submission | [src/app/interview/components/QuestionAnswer.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/QuestionAnswer.tsx:0:0-0:0) | ✅ Stop recording, submit with chunking |
| Submit modal with TTS | [src/app/interview/components/SubmitModal.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/SubmitModal.tsx:0:0-0:0) | ✅ 833 lines, screen recording finalization |
| Congrats modal | [src/app/interview/components/CongratsModal.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/CongratsModal.tsx:0:0-0:0) | ✅ Completion celebration UI |
| Audio lock coordination | [src/lib/services/audio-lock.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/audio-lock.ts:0:0-0:0) | ✅ Prevents overlapping TTS playback |
| Dark/light mode | [src/app/globals.css](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/globals.css:0:0-0:0), `tailwind.config.ts` | ✅ CSS variables with dark variant |

### Partially Implemented / Incomplete

| Feature | Location | Issue |
|---------|----------|-------|
| TTS onboarding instructions | `src/context/tts-context.tsx:103-139` | 🔴 **All instructions commented out** - only "testing" is spoken. Full onboarding TTS is disabled. |
| Welcome message TTS | `src/context/tts-context.tsx:89-98` | 🔴 Hardcoded to speak "testing" instead of actual welcome message |
| Auth/Login system | [src/app/login/page.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/login/page.tsx:0:0-0:0), `src/http/api.ts:14-17` | 🔴 Login form UI exists but auth interceptor is commented out; no actual authentication flow |
| Audio permission popup | `src/layout.tsx:66`, `src/components/AudioPermissionPopup.tsx` | 🟡 `audioPermission` hardcoded to `false`; popup never shows |

### Deprecated/Legacy Code

| Code | Location | Status |
|------|----------|--------|
| Old [answerQuestion](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/actions/interview.ts:17:0-75:2) function | `src/app/actions/interview.ts:19-76` | ⚠️ Marked as "legacy" but still present; uses direct axios instead of presigned URLs |
| Chunked upload method | `src/lib/services/upload.service.ts:216-356` | ⚠️ Superseded by [uploadWithPresignedUrls](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/upload.service.ts:468:2-606:3) but still in codebase |
| Interview reducer in services | `src/lib/services/interview.service.ts:55-134` | ⚠️ Separate reducer pattern (not Redux Toolkit) for interview state, may be unused |

---

## 4. DEPENDENCIES & INTEGRATIONS

### External APIs & Services

| Service | Purpose | Integration Point | Auth Method |
|---------|---------|---------------------|-------------|
| **WiseAdmit Backend API** | Core interview data, answers, upload tracking | [src/http/api.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/http/api.ts:0:0-0:0) baseURL: `ai-dev.wiseadmit.io/api/v1` | Token-based (via URL params/form data) |
| **ElevenLabs** | Text-to-speech synthesis | [src/app/api/tts/route.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/api/tts/route.ts:0:0-0:0) (server-side) | API key in env: `ELEVEN_LABS_API_KEY` |
| **OpenAI GPT-4** | Interview content generation | [src/app/api/generate-interview/route.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/api/generate-interview/route.ts:0:0-0:0) | API key in env: `OPENAI_API_KEY` |
| **Amazon S3** | File storage via presigned URLs | `src/lib/services/upload.service.ts:497-507` | Presigned URLs from backend |
| **Google Analytics** | Usage tracking | [src/app/layout.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/layout.tsx:0:0-0:0) (via LayoutScript) | Measurement ID: `G-PDG88W6Y6G` |

### Internal Service Dependencies

```
OnboardingPage2
├── uses TTSContext (speakMicrophoneInstructions, etc.)
├── uses MediaContext (device streams, permissions)
├── uses StepContext (current step state)
└── uses AudioPermissionContext

ExamPortal / QuestionAnswer
├── uses Redux (currentInterview, interviewQuestions)
├── uses MediaContext (start/stop recording)
├── uses BackgroundUploads hook
└── calls interview actions (submitAnswerWithChunking)

SubmitModal
├── uses MediaContext (screen recording finalization)
├── uses TTSContext (speakText)
├── uses AudioLock (coordinate audio)
└── uses BackgroundUploads (wait for uploads)

TTS Service
├── calls ElevenLabsProvider
├── uses voice-settings.service
└── maintains audioCache (Map<string, Blob>)
```

### Data Flow

1. **Interview Start:** Token from URL → [fetchCandidateInterview](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/actions/interview.ts:6:0-15:2) → Redux store populated
2. **Onboarding:** Step-based flow with TTS instructions → device testing → speech recognition confirmation
3. **Interview:** Question displayed → TTS speaks → recording starts → submit → background upload → next question
4. **Submission:** Final screen recording → upload to S3 → complete interview API call

---

## 5. KNOWN ISSUES & TECH DEBT

### Hardcoded Values

| Value | Location | Issue |
|-------|----------|-------|
| Test string "testing" | `src/context/tts-context.tsx:94,106,115,123,131,138` | All TTS onboarding functions speak "testing" instead of actual instructions |
| `audioPermission = false` | `src/app/layout.tsx:22` | Audio permission popup is permanently disabled |
| Timer constants | `src/app/interview/components/QuestionAnswer.tsx:39` | Preparation time hardcoded to 10 seconds, main timer to 90 seconds |
| 5-minute break detection | `src/app/interview/components/ExamPortal.tsx:54` | Resume detection uses 300000ms (5 min) threshold, not configurable |
| Mobile breakpoint | `src/app/layout.tsx:27` | 768px hardcoded for mobile detection |

### Missing Error Handling

| Location | Issue |
|----------|-------|
| `src/app/onboarding/page.tsx:28-30` | Page 404 handler just shows "Page Not Found" with no navigation |
| `src/lib/services/tts-providers/elevenlabs-provider.ts:75-76` | Empty console statements (debug code left in) |
| `src/app/actions/interview.ts:141-143` | Background upload errors caught but only logged to console |
| `src/lib/services/upload.service.ts:107-110` | Compression failures silently fall back to original |

### API Key Exposure Risk

| Location | Risk Level | Issue |
|----------|------------|-------|
| `.env` file | 🔴 **CRITICAL** | Contains hardcoded production API keys for ElevenLabs and OpenAI |

**Exposed Keys (must be rotated):**
- ElevenLabs: `sk_14e8e4578ff796f6fbc96e7c86e8891f713da1bfd51356a1`
- OpenAI: `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`

### Deprecated API Usage

| API | Location | Alternative |
|-----|----------|-------------|
| `eslint` | `package.json` | Listed as peer dependency but no ESLint config found |
| `NextResponse` with `any` types | Multiple API routes | Should use proper type annotations |

### Low/No Test Coverage

- **Zero test files found** in the entire codebase
- No Jest, Vitest, Playwright, or Cypress configuration
- Manual testing only appears to be the current practice

---

## 6. REGRESSION RISK AREAS

### High-Risk Coupled Modules

| Area | Files | Risk |
|------|-------|------|
| **Media Recording** | [media-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/media-context.tsx:0:0-0:0), [QuestionAnswer.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/QuestionAnswer.tsx:0:0-0:0), [ExamPortal.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/ExamPortal.tsx:0:0-0:0) | Recording state synchronization between context and components is complex; changes to start/stop logic could break interview flow |
| **TTS Queue System** | [tts.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/tts.service.ts:0:0-0:0), [useTTSManager.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/hooks/useTTSManager.ts:0:0-0:0), [tts-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/tts-context.tsx:0:0-0:0) | Request queue with MAX_CONCURRENT_REQUESTS=1; any change to queue logic could cause audio playback failures |
| **Background Uploads** | [upload.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/upload.service.ts:0:0-0:0), [useBackgroundUploads.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/hooks/useBackgroundUploads.ts:0:0-0:0), [QuestionAnswer.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/QuestionAnswer.tsx:0:0-0:0) | Upload state tracked in service singleton + React hook; desync could cause "waiting for uploads" hangs |
| **Redux Interview State** | [interview.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/actions/interview.ts:0:0-0:0) reducer, [ExamPortal.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/ExamPortal.tsx:0:0-0:0), [page.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/page.tsx:0:0-0:0) | Current question index and attempted questions arrays; changes to state shape would break filtering logic |

### Critical Functions Called From Many Places

| Function | Call Sites | Impact if Changed |
|----------|------------|-------------------|
| `speakText()` | 15+ locations across onboarding and interview | Core TTS functionality; signature changes would break all speech |
| `startAudioRecording()` / `stopAudioRecording()` | [QuestionAnswer.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/QuestionAnswer.tsx:0:0-0:0), [useInterviewManager.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/hooks/useInterviewManager.ts:0:0-0:0) | Recording lifecycle; changes affect answer capture |
| [submitAnswerWithChunking()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/actions/interview.ts:77:0-95:2) | [QuestionAnswer.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/QuestionAnswer.tsx:0:0-0:0), [interview.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/actions/interview.ts:0:0-0:0) actions | Answer submission; changes could lose candidate responses |
| [uploadService.uploadWithPresignedUrls()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/upload.service.ts:468:2-606:3) | [upload.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/upload.service.ts:0:0-0:0) internally, [interview.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/actions/interview.ts:0:0-0:0) | Background upload orchestration |
| [updateDeviceStatus()](cci:1://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/media-context.tsx:290:2-292:4) | [OnBoardingPage2.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/onboarding/components/onboardingpage2/OnBoardingPage2.tsx:0:0-0:0), [media-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/media-context.tsx:0:0-0:0) | Device setup progression; changes could block interview start |

### Side-Effect Heavy Areas

| Code | Side Effects | Risk |
|------|--------------|------|
| `tts.service.ts:284-297` | Cache mutation, API calls | Cache invalidation bugs could cause stale audio |
| `media-context.tsx:295-371` | `getDisplayMedia()`, `MediaRecorder` constructor | Screen recording permissions; browser compatibility issues |
| `upload.service.ts:572-583` | Fire-and-forget Promise without await | Upload failures may go unnoticed by user |
| `OnBoardingPage2.tsx:81-82` | `setTimeout(() => setIsListening(true), 2000)` | Arbitrary delay; race conditions possible |

---

## 7. ENHANCEMENT READINESS

### Clean/Well-Structured Modules (Ready for Enhancement)

| Module | Cleanliness Score | Notes |
|--------|-------------------|-------|
| [voice-settings.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/voice-settings.service.ts:0:0-0:0) | ⭐⭐⭐⭐⭐ | Pure functions, clear interfaces, no dependencies |
| [audio-lock.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/audio-lock.ts:0:0-0:0) | ⭐⭐⭐⭐⭐ | Self-contained mutex with timeout handling |
| [types.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/types/types.ts:0:0-0:0) | ⭐⭐⭐⭐⭐ | Well-organized TypeScript interfaces |
| [step-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/step-context.tsx:0:0-0:0) | ⭐⭐⭐⭐⭐ | Simple state, proper error handling |
| [file-compression.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/utils/file-compression.ts:0:0-0:0) | ⭐⭐⭐⭐☆ | Good separation, but uses `any` in window.AudioContext |
| [elevenlabs-provider.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/tts-providers/elevenlabs-provider.ts:0:0-0:0) | ⭐⭐⭐⭐☆ | Clean provider pattern, good retry logic |

### Modules Needing Refactoring Before Enhancement

| Module | Issues | Refactor Priority |
|--------|--------|-------------------|
| [tts-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/tts-context.tsx:0:0-0:0) | All instructions commented out, test strings hardcoded | 🔴 High - Must fix TTS content before any onboarding enhancements |
| [SubmitModal.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/SubmitModal.tsx:0:0-0:0) | 833 lines, multiple useEffect hooks, complex state | 🔴 High - Break into smaller components/hooks |
| [QuestionAnswer.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/interview/components/QuestionAnswer.tsx:0:0-0:0) | 635 lines, mixes recording logic with UI | 🟡 Medium - Extract recording logic to hook |
| [upload.service.ts](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/lib/services/upload.service.ts:0:0-0:0) | 654 lines, two different upload methods | 🟡 Medium - Consolidate upload strategies |
| [OnBoardingPage2.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/app/onboarding/components/onboardingpage2/OnBoardingPage2.tsx:0:0-0:0) | Complex step logic, tightly coupled to TTS | 🟡 Medium - Extract step management to hook |
| [media-context.tsx](cci:7://file:///c:/Users/subha/OneDrive/Documents/GitHub/ai-interview-frontend/src/context/media-context.tsx:0:0-0:0) | 472 lines, handles 3 media types | 🟡 Medium - Could split into specialized contexts |

### Missing Foundational Pieces (Blockers for New Work)

| Missing Piece | Impact | Recommended Solution |
|---------------|--------|----------------------|
| **Error Boundary** | App crashes could lose interview progress | Add React Error Boundary with recovery UI |
| **Retry Mechanism for API Calls** | Network failures not consistently handled | Implement axios-retry or custom interceptor |
| **Logging Service** | Console.log scattered throughout | Replace with structured logging (e.g., pino) |
| **Feature Flags** | Cannot A/B test or disable features | Add LaunchDarkly or config-based flags |
| **Testing Framework** | No automated testing | Add Vitest + React Testing Library + Playwright |
| **API Response Validation** | No runtime type checking | Add Zod for API response schemas |
| **Rate Limiting Handling** | ElevenLabs 429s not gracefully handled | Add rate limit detection with user-friendly messages |

---

## 8. STRUCTURED JSON OUTPUT

```json
{
  "project_name": "AI Interview Frontend (WiseAdmit)",
  "project_version": "0.1.0",
  "tech_stack": {
    "framework": "Next.js 15.0.4",
    "language": "TypeScript ^5",
    "styling": "Tailwind CSS 3.4.1",
    "state_management": ["Redux Toolkit ^2.4.0", "React Context"],
    "animation": "Framer Motion ^12.10.2",
    "http_client": "Axios ^1.7.9",
    "icons": ["Lucide React ^0.484.0", "React Icons ^5.5.0"],
    "audio": "Howler ^2.2.4",
    "build_tool": "Turbopack"
  },
  "architecture": {
    "type": "full-stack monolith",
    "pattern": "Next.js App Router with API routes",
    "state_strategy": "Redux for global + Context for feature state"
  },
  "modules": [
    {
      "name": "TTS System",
      "files": [
        "src/lib/services/tts.service.ts",
        "src/lib/services/tts-providers/elevenlabs-provider.ts",
        "src/lib/services/tts-providers/tts-provider-factory.ts",
        "src/lib/services/voice-settings.service.ts",
        "src/context/tts-context.tsx",
        "src/lib/hooks/useTTSManager.ts",
        "src/app/api/tts/route.ts"
      ],
      "dependencies": ["howler", "framer-motion"],
      "description": "Text-to-speech with ElevenLabs, caching, queue management, voice presets"
    },
    {
      "name": "Media Recording",
      "files": [
        "src/context/media-context.tsx"
      ],
      "dependencies": [],
      "description": "Audio/video/screen recording via MediaRecorder API"
    },
    {
      "name": "Upload Service",
      "files": [
        "src/lib/services/upload.service.ts",
        "src/lib/utils/file-compression.ts",
        "src/lib/hooks/useBackgroundUploads.ts"
      ],
      "dependencies": [],
      "description": "Chunked uploads, compression, presigned URL uploads, progress tracking"
    },
    {
      "name": "Interview Orchestration",
      "files": [
        "src/lib/services/interview.service.ts",
        "src/lib/hooks/useInterviewManager.ts",
        "src/lib/reducers/interview.ts",
        "src/lib/reducers/interview-question.ts"
      ],
      "dependencies": ["openai"],
      "description": "Interview state machine, question flow, answer recording"
    },
    {
      "name": "Onboarding",
      "files": [
        "src/app/onboarding/page.tsx",
        "src/app/onboarding/components/onboardingpage1/OnBoardingPage1.tsx",
        "src/app/onboarding/components/onboardingpage2/OnBoardingPage2.tsx",
        "src/app/onboarding/components/onboardingpage2/components/DeviceSetup.tsx",
        "src/app/onboarding/components/onboardingpage2/steps/*.tsx",
        "src/app/onboarding/components/onboardingpage2/components/micro-phone/*.tsx"
      ],
      "dependencies": ["framer-motion", "lucide-react"],
      "description": "2-page onboarding with interview overview and step-based device setup"
    },
    {
      "name": "Interview Session",
      "files": [
        "src/app/interview/page.tsx",
        "src/app/interview/components/ExamPortal.tsx",
        "src/app/interview/components/QuestionAnswer.tsx",
        "src/app/interview/components/SubmitModal.tsx",
        "src/app/interview/components/CongratsModal.tsx",
        "src/app/interview/components/MediaComponent.tsx",
        "src/app/actions/interview.ts"
      ],
      "dependencies": ["redux", "axios"],
      "description": "Main interview UI with question flow, recording, submission"
    },
    {
      "name": "Mobile Blocker",
      "files": [
        "src/app/components/MobileBlocker.tsx"
      ],
      "dependencies": ["framer-motion", "lucide-react"],
      "description": "Prevents mobile/tablet access with animated UI"
    },
    {
      "name": "Audio Lock",
      "files": [
        "src/lib/services/audio-lock.ts"
      ],
      "dependencies": [],
      "description": "Mutex for coordinating TTS playback across components"
    }
  ],
  "features_existing": [
    "AI-generated interview questions via GPT-4",
    "Text-to-Speech with ElevenLabs API",
    "Voice presets (formal, friendly, expressive, default)",
    "Audio/video/screen recording",
    "Chunked file upload with retry logic",
    "Presigned URL S3 upload (background)",
    "File compression (audio)",
    "Background upload progress tracking",
    "Step-based onboarding with device testing",
    "Speech recognition for confirmation",
    "Device selection (microphone, camera)",
    "Audio level visualization",
    "Mobile/tablet blocking",
    "Interview progress tracking",
    "Submit modal with TTS",
    "Congrats modal",
    "Dark/light mode",
    "Audio lock coordination"
  ],
  "features_incomplete": [
    {
      "feature": "TTS onboarding instructions",
      "location": "src/context/tts-context.tsx",
      "issue": "All instruction functions speak 'testing' instead of actual content"
    },
    {
      "feature": "Authentication system",
      "location": "src/app/login/page.tsx, src/http/api.ts",
      "issue": "Login UI exists but auth interceptor commented out, no actual auth flow"
    },
    {
      "feature": "Audio permission popup",
      "location": "src/app/layout.tsx",
      "issue": "audioPermission hardcoded to false, popup never displays"
    }
  ],
  "integrations": [
    {
      "service": "WiseAdmit Backend API",
      "endpoint": "https://ai-dev.wiseadmit.io/api/v1",
      "purpose": "Core interview data, answers, upload tracking",
      "auth": "Token-based via URL/form params"
    },
    {
      "service": "ElevenLabs",
      "endpoint": "https://api.elevenlabs.io/v1/text-to-speech",
      "purpose": "Text-to-speech synthesis",
      "auth": "API key (server-side only)"
    },
    {
      "service": "OpenAI GPT-4",
      "endpoint": "https://api.openai.com/v1/chat/completions",
      "purpose": "Interview content generation",
      "auth": "API key (server-side only)"
    },
    {
      "service": "Amazon S3",
      "endpoint": "Presigned URLs from backend",
      "purpose": "File storage for audio/video/screen recordings",
      "auth": "Presigned URLs"
    },
    {
      "service": "Google Analytics",
      "id": "G-PDG88W6Y6G",
      "purpose": "Usage tracking",
      "auth": "Measurement ID"
    }
  ],
  "tech_debt": [
    {
      "type": "hardcoded_values",
      "description": "TTS speaks 'testing' instead of actual instructions in all onboarding functions",
      "severity": "high",
      "files": ["src/context/tts-context.tsx:94,106,115,123,131,138"]
    },
    {
      "type": "hardcoded_values",
      "description": "audioPermission = false in layout.tsx blocks permission popup",
      "severity": "medium",
      "files": ["src/app/layout.tsx:22"]
    },
    {
      "type": "security",
      "description": "API keys exposed in .env file (ElevenLabs and OpenAI)",
      "severity": "critical",
      "files": [".env:3,6"]
    },
    {
      "type": "missing_tests",
      "description": "Zero test files, no testing framework configured",
      "severity": "high",
      "files": ["entire codebase"]
    },
    {
      "type": "legacy_code",
      "description": "Old answerQuestion function marked as legacy but still present",
      "severity": "low",
      "files": ["src/app/actions/interview.ts:19-76"]
    },
    {
      "type": "large_components",
      "description": "SubmitModal.tsx is 833 lines, mixes concerns",
      "severity": "medium",
      "files": ["src/app/interview/components/SubmitModal.tsx"]
    },
    {
      "type": "large_components",
      "description": "QuestionAnswer.tsx is 635 lines, UI mixed with recording logic",
      "severity": "medium",
      "files": ["src/app/interview/components/QuestionAnswer.tsx"]
    },
    {
      "type": "debug_code",
      "description": "Empty console.log statements in elevenlabs-provider.ts",
      "severity": "low",
      "files": ["src/lib/services/tts-providers/elevenlabs-provider.ts:75-76"]
    }
  ],
  "regression_risk_areas": [
    {
      "area": "Media Recording State",
      "description": "Recording state synchronization between MediaContext and components is complex",
      "coupled_files": [
        "src/context/media-context.tsx",
        "src/app/interview/components/QuestionAnswer.tsx",
        "src/app/interview/components/ExamPortal.tsx"
      ],
      "risk_level": "high"
    },
    {
      "area": "TTS Queue System",
      "description": "MAX_CONCURRENT_REQUESTS=1 queue; changes could cause audio failures",
      "coupled_files": [
        "src/lib/services/tts.service.ts",
        "src/lib/hooks/useTTSManager.ts"
      ],
      "risk_level": "high"
    },
    {
      "area": "Background Uploads",
      "description": "Upload state in service singleton + React hook; desync could cause hangs",
      "coupled_files": [
        "src/lib/services/upload.service.ts",
        "src/lib/hooks/useBackgroundUploads.ts",
        "src/app/interview/components/QuestionAnswer.tsx"
      ],
      "risk_level": "high"
    },
    {
      "area": "Redux Interview State",
      "description": "Current question index filtering logic sensitive to state shape",
      "coupled_files": [
        "src/lib/reducers/interview.ts",
        "src/app/interview/page.tsx",
        "src/app/interview/components/ExamPortal.tsx"
      ],
      "risk_level": "medium"
    },
    {
      "function": "speakText",
      "call_sites": 15,
      "impact": "Signature changes would break all TTS functionality",
      "risk_level": "critical"
    },
    {
      "function": "submitAnswerWithChunking",
      "call_sites": 2,
      "impact": "Changes could lose candidate responses",
      "risk_level": "critical"
    }
  ],
  "enhancement_ready_modules": [
    {
      "name": "voice-settings.service.ts",
      "score": 5,
      "notes": "Pure functions, clear interfaces, no dependencies"
    },
    {
      "name": "audio-lock.ts",
      "score": 5,
      "notes": "Self-contained mutex with timeout handling"
    },
    {
      "name": "types.ts",
      "score": 5,
      "notes": "Well-organized TypeScript interfaces"
    },
    {
      "name": "step-context.tsx",
      "score": 5,
      "notes": "Simple state, proper error handling"
    },
    {
      "name": "file-compression.ts",
      "score": 4,
      "notes": "Good separation, minor any type usage"
    },
    {
      "name": "elevenlabs-provider.ts",
      "score": 4,
      "notes": "Clean provider pattern, good retry logic"
    }
  ],
  "needs_refactor_first": [
    {
      "name": "tts-context.tsx",
      "priority": "high",
      "issues": ["All instructions commented out", "Test strings hardcoded"],
      "blocker_for": "Any onboarding TTS enhancements"
    },
    {
      "name": "SubmitModal.tsx",
      "priority": "high",
      "issues": ["833 lines", "Multiple useEffect hooks", "Complex state"],
      "blocker_for": "Submission flow enhancements"
    },
    {
      "name": "QuestionAnswer.tsx",
      "priority": "medium",
      "issues": ["635 lines", "UI mixed with recording logic"],
      "blocker_for": "Recording flow changes"
    },
    {
      "name": "upload.service.ts",
      "priority": "medium",
      "issues": ["654 lines", "Two upload methods (chunked + presigned)"],
      "blocker_for": "Upload strategy changes"
    },
    {
      "name": "OnBoardingPage2.tsx",
      "priority": "medium",
      "issues": ["Complex step logic", "Tightly coupled to TTS"],
      "blocker_for": "Onboarding flow changes"
    },
    {
      "name": "media-context.tsx",
      "priority": "medium",
      "issues": ["472 lines", "Handles 3 media types"],
      "blocker_for": "Media recording enhancements"
    }
  ]
}
```

---

**Summary:** This is a feature-rich AI interview platform with a solid architectural foundation (Next.js, Redux, TypeScript). However, it has critical issues including **exposed API keys in `.env`** that must be rotated immediately, and **disabled TTS onboarding content** (all instructions speak "testing" instead of actual content). The codebase lacks any automated testing and several core components exceed 600+ lines, indicating refactoring needs before major enhancements. The media recording and upload systems are sophisticated but tightly coupled, making them high-risk areas for regression.