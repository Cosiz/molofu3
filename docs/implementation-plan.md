# Molofu3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development to implement this plan task-by-task.

**Goal:** Build a family coordination web app (Molofu3) for HK working families with Commander dashboard, task engine, messaging, GPS tracking, and escalation.

**Architecture:** React 19 + Vite + TypeScript, Zustand state, React Router v7, native http server.

**Tech Stack:** React 19, Vite v8, TypeScript, Zustand, CSS-in-JS, Geolocation API

---

### Task 1: Project Scaffold & Core Types
**Files:** `src/types.ts`, `src/theme.ts`, `tsconfig.json`, `vite.config.ts`, `package.json`, `index.html`
- Write package.json with React 19, Vite 8, TypeScript, Zustand, React Router
- Write types.ts with User, Task, Message, Escalation, GeoPoint interfaces
- Write theme.ts with design tokens (colors, spacing, typography)
- Write tsconfig.json, vite.config.ts, index.html
- **Verify:** `npm install` succeeds, `npx vite build` produces dist/

### Task 2: Zustand Store & Mock Data
**Files:** `src/store.ts`, `src/mocks/data.ts`, `src/utils/time.ts`
- Write store.ts with Zustand slices: auth, tasks, messages, escalations, settings, GPS
- Wire store to localStorage persistence (load on init, save on change)
- Write mock data: 3 users, 6 tasks, 3 messages
- Write time utils: formatTime, formatDate, isOverdue, daysFromNow
- **Verify:** Store initializes with mock data, CRUD operations work

### Task 3: Auth & Onboarding Screens
**Files:** `src/screens/AuthScreen.tsx`, `src/screens/Onboarding.tsx`
- AuthScreen: email/password login, role selection, mock login
- Onboarding: 5-step wizard (household→commander→helper→children→confirm)
- Wire AuthScreen to set current user in store
- **Verify:** Can login → see onboarding → complete → redirected to dashboard

### Task 4: Commander Dashboard
**Files:** `src/screens/CommanderDashboard.tsx`, `src/components/TaskCard.tsx`, `src/components/StatusBadge.tsx`
- TaskCard: reusable card with title, assignee, status, priority badge
- CommanderDashboard: stats row (pending/active/done), today's tasks, escalation banner, GPS preview
- Wire dashboard to store — show real task data, calculate stats
- Start escalation polling on mount
- **Verify:** Dashboard shows mock tasks, stats counts match, escalation banner for overdue

### Task 5: Task List & Detail Screens
**Files:** `src/screens/TaskList.tsx`, `src/screens/TaskDetail.tsx`
- TaskList: filter chips (All/Pending/Done), sorted task cards
- TaskDetail: info grid, status stepper, action buttons, message feed
- Wire status stepper: pending → accepted → in_progress → arrived → done
- Wire action buttons to update task status in store
- **Verify:** Task list shows all tasks with filters. Tap task → detail. Action buttons change status.

### Task 6: Message Feed
**Files:** `src/screens/MessageFeed.tsx`, `src/components/MessageBubble.tsx`
- MessageBubble: left/right alignment, read receipts
- MessageFeed: task-linked conversations, message list, input + send
- Wire to store — send message adds to message array
- **Verify:** Can type message → send → appears in list. Read receipts show.

### Task 7: Schedule & Settings
**Files:** `src/screens/ScheduleView.tsx`, `src/screens/SettingsScreen.tsx`
- ScheduleView: weekly calendar grid, event blocks from tasks
- SettingsScreen: profile, notification toggles, escalation config
- Wire settings toggles to store
- **Verify:** Schedule shows weekly view. Settings toggles update store.

### Task 8: GPS & Escalation Services
**Files:** `src/services/escalation.ts`, `src/services/notification.ts`, `src/screens/LocationMap.tsx`
- escalation.ts: SLA polling (every 30s), overdue detection, escalation creation
- notification.ts: scheduled reminders, browser notification API
- LocationMap: mock map with helper status cards
- Wire GPS tracking to store
- **Verify:** Escalation creates for overdue tasks. GPS tracking starts/stops correctly.

### Task 9: App Shell & Routing
**Files:** `src/App.tsx`, `src/main.tsx`, `src/components/NavBar.tsx`, `server.cjs`
- NavBar: 5 icons (Dashboard, Tasks, Messages, Schedule, Settings)
- App.tsx: React Router routes for all screens
- main.tsx: React mount
- server.cjs: CommonJS static server for dist/ with SPA fallback
- **Verify:** `npx vite build` succeeds. `node server.cjs` serves app. All routes render.

### Task 10: Integration & Polish
**Files:** All screen files
- Wire all screens to shared store
- Add loading states, empty states
- Verify responsive layout on mobile viewport
- Run full verification criteria check
- **Verify:** All 29 verification criteria pass. App renders without errors.
