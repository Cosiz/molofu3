# Molofu3 v3.7.2 — Family Command Centre

## Product Vision
A unified family coordination app for Hong Kong working families that eliminates the 3+ hours/day wasted on fragmented coordination tools. The Commander (primary parent) assigns tasks, tracks helpers (nannies/drivers), monitors children's schedules, and escalates issues — all from a single dashboard.

## Empathy-Driven Target Customer Analysis

**Hong Kong Working Families — The Reality:**
- **Pace:** Frenetic. MTR rush hour, traffic jams, back-to-back meetings. Every minute counts.
- **Pressure:** Dual-income survival. Both parents work long hours. The "Commander" (usually the mother) carries the mental load of the entire household.
- **Guilt:** "Am I doing enough for my kids?" "Did the helper pick them up on time?" "Did they eat properly?"
- **Fragmentation:** 5+ WhatsApp groups (family, helper, school, tuition, building management) + Google Calendar + mental notes. Information scatters everywhere.
- **Helper dynamics:** Live-in or live-out domestic helpers (often from Philippines/Indonesia) are essential but communication barriers exist. Language differences, different cultural expectations.
- **Children's schedules:** School, tuition (3-4 times/week), extracurriculars. Kids are as scheduled as CEOs.
- **Consequences of failure:** Missed tuition classes (wasted money, falling behind), kids waiting alone (safety risk), helper going AWOL (chaos).

**Emotional Core:** The Commander is exhausted not from physical work, but from the cognitive load of coordinating everything. She doesn't need another app to manage — she needs peace of mind. She needs to know that when she's in a board meeting, her kids are safe, fed, and where they should be.

## Personas (Empathy-First)

### Persona 1: Sarah Chen (Commander)
**Who:** 38, Marketing Director at Central firm, mother of two (Ethan 10, Sophia 7)
**Context:** Office 8AM-7PM, MTR commute, home by 8PM. Lives in Mid-Levels.
**Constraints:** 
- 30 seconds max per interaction during work hours
- One-hand operation (always carrying laptop/coffee)
- Can't type long messages during meetings
- High stress, low tolerance for friction
**Goal:** Assign tasks and monitor progress without disrupting work or feeling anxious
**Frustrations:** 
- WhatsApp messages from helper get buried under work messages
- Forgets to book transport after helper confirms pickup
- Feels guilty when she can't track if kids are safe
**Success looks like:** "I create a task in 20 seconds during a meeting pause, and I know it's handled."
**Failure looks like:** "I miss the helper's message, kids wait 40 minutes at school, I feel like a terrible mother."
**Emotional state:** Anxious → Confident when informed → Guilty when things go wrong

### Persona 2: Maria Santos (Helper)
**Who:** 45, Domestic helper from Philippines, working for Chen family for 3 years
**Context:** Markets, school runs, home, cooking. Always moving.
**Constraints:** 
- Limited English (basic phrases, relies on icons)
- Big fingers, needs large touch targets
- Often has wet/dirty hands (cooking, cleaning)
- No typing preferred — tap-only interactions
- Uses cheap Android phone, slow internet in some areas
**Goal:** See what to do next, update status simply, know if she's done correctly
**Frustrations:** 
- Confusing apps with small buttons
- English labels she doesn't understand
- Apps that crash or are slow
**Success looks like:** "I see big green button → I tap → job done. No confusion."
**Failure looks like:** "I tap wrong thing, Sarah gets angry message, I feel ashamed."
**Emotional state:** Nervous about making mistakes → Relieved when clear → Proud when praised

### Persona 3: David Chen (Observer)
**Who:** 40, Finance Manager, father, travels 1-2 weeks/month for work
**Context:** Office, hotels, airports. Different timezones.
**Constraints:** 
- View-only access (doesn't want to interfere with Sarah's system)
- Needs quick status checks (30 seconds max)
- Laptop preferred when in hotel, phone when commuting
- Anxious about family when away
**Goal:** Check family status in one glance, feel connected without micromanaging
**Frustrations:** 
- Asking Sarah for updates feels nagging
- Can't see what's happening when he's in Singapore
**Success looks like:** "Open app → see green checkmarks → family is good → I can focus on my meeting."
**Failure looks like:** "No visibility → I call Sarah during her presentation → she's annoyed → I feel helpless."
**Emotional state:** Anxious when away → Relieved when informed → Guilty for not being there

## Pain Points (From Screenshot + Empathy)

### 1. 3+ Hours/Day Wasted
**Problem:** Coordinating across WhatsApp, Calendar, Classroom, and mental load. The Commander is the single point of failure.
**Empathy insight:** Sarah spends her "in-between" moments (walking to MTR, waiting for coffee) sending coordination messages instead of breathing. She has no mental downtime.
**Solution:** Unified task engine with single-view dashboard. All coordination in one place. Tasks auto-categorized by priority. Commander sees everything at a glance — no more app-switching anxiety.

### 2. Delayed Coordination
**Problem:** Helper messages "picked up" — Commander sees it late while in a meeting, then must manually book transport.
**Empathy insight:** The delay isn't just inefficient — it's emotionally costly. Sarah feels panic when she realizes she missed a time-sensitive message.
**Solution:** Real-time sync with push notifications. Auto-transport booking suggestions. Task status updates propagate instantly. Commander can respond with one tap — even from a locked phone notification.

### 3. Fragmented Tools
**Problem:** 5+ tools that don't talk to each other. Family WhatsApp, helper WhatsApp, school groups, Classroom, Calendar.
**Empathy insight:** Fragmentation = cognitive load. Every app switch is a mental context switch. Sarah's brain is always in "where did I see that?" mode.
**Solution:** Unified platform with integrated messaging, task management, scheduling, and GPS tracking. One app replaces five. One place to look.

### 4. Mental Exhaustion
**Problem:** Commander carries the entire cognitive load — remembering schedules, chasing confirmations, managing escalations.
**Empathy insight:** Mental exhaustion is worse than physical. Sarah can rest her body but her mind never stops. "Did I forget something?" loops at 2AM.
**Solution:** Auto-reminders, single dashboard view, priority auto-categorization. The system remembers so Sarah doesn't have to. She can finally sleep.

### 5. No Accountability
**Problem:** No structured task assignment. No real-time location. No escalation when helper goes dark.
**Empathy insight:** When helper goes dark, Sarah's imagination runs worst-case scenarios. Is the helper okay? Are the kids okay? Is this a safety issue?
**Solution:** GPS tracking during active tasks. SLA-based escalation engine. Audit log of all task completions. Helper status visibility. Sarah knows, not wonders.

### 6. Cost of Failure
**Problem:** Missed tuition classes. Kids wasting time in transit. Forgotten homework. Real consequences, not inconvenience.
**Empathy insight:** Failure isn't just "oops" — it's real harm. Kids fall behind, money is wasted, trust erodes. Sarah feels the weight of these consequences.
**Solution:** Risk mitigation alerts. Incident reports. Auto-escalation when tasks are at risk. SLA tracking per task type. Prevention, not just reaction.

## User Roles
- **Commander** — Primary parent (usually mother). Creates tasks, monitors dashboard, receives escalations. Full control.
- **Helper** — Domestic helper. Receives tasks, updates status, logs GPS during transit. Simplified UI, big buttons, icon-driven.
- **Observer** — Secondary parent/guardian (usually father). View-only access, can comment. Peace-of-mind focused.

## Core Features (Empathy-Driven)
1. **Commander Dashboard** — Today's tasks, escalation alerts, weekly stats, GPS preview. Sarah's control center.
2. **Helper Dashboard** — Big buttons, simple English, icon-driven. Maria's task list.
3. **Observer Dashboard** — Read-only status, family timeline. David's peace of mind.
4. **Task Engine** — Create, assign, track, complete tasks with status flow. The coordination backbone.
5. **Real-Time Messaging** — In-app task messaging with read receipts. No more WhatsApp confusion.
6. **GPS Tracking** — Helper location during active transit tasks. Sarah knows, not wonders.
7. **Escalation Engine** — Auto-escalate when tasks are overdue or helper is unresponsive. Prevention.
8. **Weekly Schedule** — Calendar view of all family activities. The big picture.
9. **Settings & Notifications** — Push notification preferences, escalation thresholds. Control.

## Technical Stack
- Frontend: React 18 + Vite + TypeScript (stable, proven)
- Routing: React Router v6 (stable, no v7 breaking changes)
- Styling: Inline CSS + CSS-in-JS (no external UI library for minimal bundle)
- State: Zustand for local state management
- Mock backend: LocalStorage persistence (Supabase-ready architecture)
- Deployment: Static file server (Node.js CommonJS http server)
- Build: Vite + rolldown
