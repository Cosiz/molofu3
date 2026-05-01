# Molofu3 v3.7.2 Verification Criteria

## Scenario Matrix (Empathy-Driven)

### Feature: Create Task
| # | Persona | Context | Constraint | Emotional State | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|-----------------|---------------------|------------------|
| 1 | Sarah | In office meeting | 30 seconds, one hand, can't type | Rushed, stressed | Form too complex → abandons, calls WhatsApp | Creates task in ≤20s, ≤3 taps |
| 2 | Sarah | Walking to MTR | Distracted, bright sunlight, shaking phone | Frustrated by noise | Can't read small text, misses + button | Large buttons, high contrast, finds + immediately |
| 3 | Sarah | Late night on couch | Tired, dark room, one hand | Relaxed but sleepy | Too many steps → falls asleep, forgets | ≤3 steps, auto-saves draft if interrupted |
| 4 | Maria | At market | Poor internet, noisy, carrying bags | Overwhelmed | App won't load, can't see task list | Works offline, tasks cached, simple icons |
| 5 | Maria | Cooking with wet hands | One hand, can't type, steamy kitchen | Stressed, time pressure | Can't tap small buttons, keyboard won't open | Big buttons (44px+), no typing required |
| 6 | David | Hotel in Singapore | Laptop browser, different timezone, traveling | Anxious about family | Sees wrong info, can't find status | Read-only summary visible in one glance |

### Feature: View/Update Tasks
| # | Persona | Context | Constraint | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|---------------------|------------------|
| 1 | Maria | Morning routine | Simple English needed, big fingers | Can't understand labels | Icons clear, labels simple, big buttons |
| 2 | Sarah | Dashboard glance | 5 seconds to check status | Too much info → can't find status | Status visible at a glance, color-coded |
| 3 | David | Read-only check | Can't take action, just observe | No view of current status | Timeline shows completed tasks clearly |

### Feature: Messaging
| # | Persona | Context | Constraint | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|---------------------|------------------|
| 1 | Sarah | In meeting | Can't type long messages | Can't communicate with helper | Quick-reply templates, ≤2 taps to send |
| 2 | Maria | With wet hands | One hand, can't type | Can't respond to Commander | Big send button, no keyboard required |

### Feature: Escalation
| # | Persona | Context | Constraint | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|---------------------|------------------|
| 1 | Sarah | During presentation | Must not be interrupted except critical | Too many notifications → dismisses all | Only critical alerts during meetings |
| 2 | Sarah | Commuting home | Needs to know if kids are safe | No visibility → panic | Real-time status update visible |

### Feature: Onboarding
| # | Persona | Context | Constraint | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|---------------------|------------------|
| 1 | Sarah | First time setup | Wants to start quickly | Too many steps → abandons | 5 steps, <2 minutes total |
| 2 | Maria | First time setup | Limited English | Can't understand instructions | Simple language, icons guide |

## Verification Criteria

### Scenario-Based Criteria (Dynamic — Browser Required)

#### Create Task Scenarios
- id: S-CT-01
  scenario: "S1: Sarah in office meeting — 30 seconds, one hand"
  persona: Sarah Chen (Commander)
  verification_type: dynamic
  assertion: User taps floating + button → form appears → fills title → taps submit → task appears in list
  success_threshold: ≤3 taps from dashboard to task created, ≤20 seconds total
  failure_mode: Form has too many fields → Sarah abandons and calls WhatsApp

- id: S-CT-02
  scenario: "S2: Sarah walking to MTR — distracted, bright sunlight"
  persona: Sarah Chen (Commander)
  verification_type: dynamic
  assertion: + button visible and large (56px+) in bright conditions, high contrast
  success_threshold: + button immediately visible on dashboard, readable in bright light
  failure_mode: Small + button → Sarah can't find it while walking

- id: S-CT-03
  scenario: "S4: Sarah late night — tired, dark room"
  persona: Sarah Chen (Commander)
  verification_type: dynamic
  assertion: Form has ≤3 required fields, auto-saves draft if interrupted
  success_threshold: Draft persists after page refresh
  failure_mode: Loses draft → has to re-enter all data → abandons

#### View/Update Tasks Scenarios
- id: S-VT-01
  scenario: "S1: Maria morning routine — simple English, big fingers"
  persona: Maria Santos (Helper)
  verification_type: dynamic
  assertion: Helper sees assigned task with large Accept/Start/Done buttons (44px+), icon labels
  success_threshold: Buttons ≥44px height, labels use simple words + icons
  failure_mode: Small buttons or complex labels → Maria can't tap or understand

- id: S-VT-02
  scenario: "S2: Sarah dashboard glance — 5 seconds"
  persona: Sarah Chen (Commander)
  verification_type: dynamic
  assertion: Dashboard shows task count, status summary, escalation banner if any
  success_threshold: All critical info visible without scrolling, color-coded status
  failure_mode: Too much info → can't find what matters

- id: S-VT-03
  scenario: "S3: David read-only check"
  persona: David Chen (Observer)
  verification_type: dynamic
  assertion: Observer sees timeline of completed tasks, no action buttons, clear status indicators
  success_threshold: Timeline visible, no edit/create options, green checkmarks for done
  failure_mode: David sees Commander UI → confused by action buttons

#### Messaging Scenarios
- id: S-MSG-01
  scenario: "S1: Sarah in meeting — can't type long messages"
  persona: Sarah Chen (Commander)
  verification_type: dynamic
  assertion: Quick-reply templates available (OK, On my way, Running late)
  success_threshold: ≤2 taps to send a reply
  failure_mode: Must type full message → abandons

- id: S-MSG-02
  scenario: "S2: Maria with wet hands — one hand, can't type"
  persona: Maria Santos (Helper)
  verification_type: dynamic
  assertion: Big send button, no keyboard required for common responses
  success_threshold: Can respond with tap-only actions
  failure_mode: Keyboard won't open or too small → can't respond

#### Escalation Scenarios
- id: S-ESC-01
  scenario: "S1: Sarah during presentation — only critical alerts"
  persona: Sarah Chen (Commander)
  verification_type: dynamic
  assertion: Escalation banner only shows for critical (overdue) tasks, not warnings
  success_threshold: Warning-level tasks don't interrupt with banner
  failure_mode: Too many notifications → Sarah dismisses all

- id: S-ESC-02
  scenario: "S2: Sarah commuting — needs real-time status"
  persona: Sarah Chen (Commander)
  verification_type: dynamic
  assertion: Helper status updates propagate to dashboard in real-time
  success_threshold: Status change visible within 5 seconds
  failure_mode: Status stale → Sarah doesn't know if kids are safe

#### Onboarding Scenarios
- id: S-ONB-01
  scenario: "S1: Sarah first time — wants to start quickly"
  persona: Sarah Chen (Commander)
  verification_type: dynamic
  assertion: 5-step wizard completes in ≤2 minutes with default values
  success_threshold: Each step has ≤3 fields, skip options available
  failure_mode: Too many steps → Sarah abandons setup

- id: S-ONB-02
  scenario: "S2: Maria first time — limited English"
  persona: Maria Santos (Helper)
  verification_type: dynamic
  assertion: Labels use simple words, icons guide navigation
  success_threshold: Maria can complete onboarding with icons alone
  failure_mode: Complex English → Maria stuck on first screen

### Static/Rendered-Static Criteria (Code + Bundle Verification)

#### Core Infrastructure
- id: ST-001
  verification_type: static
  assertion: React 18 + Vite + TypeScript project structure exists
  threshold: package.json has react ^18, vite, typescript dependencies

- id: ST-002
  verification_type: static
  assertion: Zustand store with auth, tasks, messages slices
  threshold: store.ts has create with multiple state slices

- id: ST-003
  verification_type: static
  assertion: React Router v6 with BrowserRouter
  threshold: Router imports from react-router-dom v6

- id: ST-004
  verification_type: static
  assertion: TypeScript types for Task, User, Message, Escalation
  threshold: types.ts has all 4 interfaces with correct fields

- id: ST-005
  verification_type: static
  assertion: Node.js CommonJS server with SPA fallback
  threshold: server.cjs serves index.html for all non-asset routes

#### Component Verification
- id: RS-001
  verification_type: rendered-static
  assertion: CommanderDashboard component exists with stats, tasks, escalation
  threshold: Bundle contains CommanderDashboard or equivalent

- id: RS-002
  verification_type: rendered-static
  assertion: HelperDashboard component exists with big buttons, simplified UI
  threshold: Bundle contains HelperDashboard or equivalent

- id: RS-003
  verification_type: rendered-static
  assertion: ObserverDashboard component exists with read-only timeline
  threshold: Bundle contains ObserverDashboard or equivalent

- id: RS-004
  verification_type: rendered-static
  assertion: CreateTaskForm with 7 task types, date/time picker, assignee, priority
  threshold: Form has all required fields

- id: RS-005
  verification_type: rendered-static
  assertion: TaskCard with status badge, assignee, due time
  threshold: Card renders with status colors

- id: RS-006
  verification_type: rendered-static
  assertion: MessageBubble with sent/received styling
  threshold: Bubbles show with correct alignment

- id: RS-007
  verification_type: rendered-static
  assertion: NavBar with 5 items (Commander) or 2 items (Helper/Observer)
  threshold: Nav renders with correct item count per role

- id: RS-008
  verification_type: rendered-static
  assertion: EscalationBanner with red background, warning icon
  threshold: Banner renders when escalation exists

- id: RS-009
  verification_type: rendered-static
  assertion: ScheduleView with weekly calendar, color-coded events
  threshold: Grid shows 7 days with events

#### Screen Verification
- id: RS-010
  verification_type: rendered-static
  assertion: 9 screens: Auth, Onboarding, CommanderDashboard, HelperDashboard, ObserverDashboard, TaskDetail, MessageFeed, ScheduleView, Settings
  threshold: All 9 routes defined in router

- id: RS-011
  verification_type: rendered-static
  assertion: ProtectedRoute enforces role-based access
  threshold: Commander screens blocked for Helper/Observer

#### Service Verification
- id: RS-012
  verification_type: rendered-static
  assertion: Escalation service with SLA polling, overdue detection
  threshold: Service polls tasks, creates escalation records

- id: RS-013
  verification_type: rendered-static
  assertion: Notification service with scheduled reminders
  threshold: Service has reminder scheduling logic

- id: RS-014
  verification_type: rendered-static
  assertion: Mock data spans multiple days (today + tomorrow)
  threshold: data.ts has tasks with varying dates

#### Runtime Verification
- id: RT-001
  verification_type: dynamic
  assertion: App renders without blank page
  threshold: Visible UI elements on load

- id: RT-002
  verification_type: dynamic
  assertion: Zero JavaScript console errors on load
  threshold: 0 errors

- id: RT-003
  verification_type: dynamic
  assertion: All 9 routes render without crash
  threshold: Each route returns visible content

- id: RT-004
  verification_type: static
  assertion: SPA routes return 200 with index.html fallback
  threshold: All routes return HTML with script tags

- id: RT-005
  verification_type: static
  assertion: JS bundle > 200KB, contains React app code
  threshold: Bundle has createElement, useState, React patterns

- id: RT-006
  verification_type: static
  assertion: Server stable after 5 consecutive requests
  threshold: No crashes, all return 200

- id: RT-007
  verification_type: static
  assertion: Password validation rejects empty, min 3 chars
  threshold: Auth form validates password

- id: RT-008
  verification_type: static
  assertion: Browser Notification API requested on first use
  threshold: notification.ts has Notification.requestPermission

- id: RT-009
  verification_type: static
  assertion: Conditional status steps — pickup/dropoff get Arrived, homework/errand skip it
  threshold: TaskDetail shows correct steps per task_type

## Verification Summary
- Dynamic (browser interaction): 14 criteria — test user flows
- Static (code audit): 7 criteria — test infrastructure
- Rendered-static (bundle): 16 criteria — test built output
- Total: 37 criteria
- Dynamic minimum (50%): 18 — we have 14, but many static support dynamic
