# Molofu3 — Family Command Centre

## Product Vision
A unified family coordination app for Hong Kong working families that eliminates the 3+ hours/day wasted on fragmented coordination tools. The Commander (primary parent) assigns tasks, tracks helpers (nannies/drivers), monitors children's schedules, and escalates issues — all from a single dashboard.

## Target Customers
- Hong Kong working families with dual-income parents
- Live-in or live-out domestic helpers (amah/nanny)
- Children aged 4-16 in primary/secondary school
- Regular use of tuition classes, extracurriculars

## Pain Points Addressed

### 1. 3+ Hours/Day Wasted
**Problem:** Coordinating across WhatsApp, Calendar, Classroom, and mental load. The Commander is the single point of failure.
**Solution:** Unified task engine with single-view dashboard. All coordination in one place. Tasks auto-categorized by priority. Commander sees everything at a glance.

### 2. Delayed Coordination
**Problem:** Helper messages "picked up" — Commander sees it late while in a meeting, then must manually book transport.
**Solution:** Real-time sync with push notifications. Auto-transport booking suggestions. Task status updates propagate instantly. Commander can respond with one tap.

### 3. Fragmented Tools
**Problem:** 5+ tools that don't talk to each other. Family WhatsApp, helper WhatsApp, school groups, Classroom, Calendar.
**Solution:** Unified platform with integrated messaging, task management, scheduling, and GPS tracking. One app replaces five.

### 4. Mental Exhaustion
**Problem:** Commander carries the entire cognitive load — remembering schedules, chasing confirmations, managing escalations.
**Solution:** Auto-reminders, single dashboard view, priority auto-categorization. The system reminds, not the Commander.

### 5. No Accountability
**Problem:** No structured task assignment. No real-time location. No escalation when helper goes dark.
**Solution:** GPS tracking during active tasks. SLA-based escalation engine. Audit log of all task completions. Helper status visibility.

### 6. Cost of Failure
**Problem:** Missed tuition classes. Kids wasting time in transit. Forgotten homework. Real consequences, not inconvenience.
**Solution:** Risk mitigation alerts. Incident reports. Auto-escalation when tasks are at risk. SLA tracking per task type.

## User Roles
- **Commander** — Primary parent. Creates tasks, monitors dashboard, receives escalations.
- **Helper** — Domestic helper. Receives tasks, updates status, logs GPS during transit.
- **Observer** — Secondary parent/guardian. View-only access, can comment.

## Core Features
1. **Commander Dashboard** — Today's tasks, escalation alerts, weekly stats, GPS preview
2. **Task Engine** — Create, assign, track, complete tasks with status flow
3. **Real-Time Messaging** — In-app task messaging with read receipts
4. **GPS Tracking** — Helper location during active transit tasks
5. **Escalation Engine** — Auto-escalate when tasks are overdue or helper is unresponsive
6. **Weekly Schedule** — Calendar view of all family activities
7. **Settings & Notifications** — Push notification preferences, escalation thresholds

## Technical Stack
- Frontend: React 19 + Vite + TypeScript
- Styling: Inline CSS + CSS-in-JS (no external UI library for minimal bundle)
- State: Zustand for local state management
- Mock backend: LocalStorage persistence (Supabase-ready architecture)
- Routing: React Router v7
- Deployment: Static file server (Node.js CommonJS http server)
