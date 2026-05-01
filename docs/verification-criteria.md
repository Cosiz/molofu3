# Molofu3 Verification Criteria

## Pain Point 1: 3+ Hours/Day Wasted
- id: PP1-001
  requirement: Commander Dashboard shows all today's tasks in single view
  verification_method: browser-render
  assertion: Dashboard screen renders with task cards showing title, assignee, status, and due time
  threshold: All task elements visible in screenshot

- id: PP1-002
  requirement: Tasks are auto-categorized by priority
  verification_method: code-audit
  assertion: Source code contains priority categorization logic (high/medium/low)
  threshold: Priority field exists in task type and is displayed in UI

- id: PP1-003
  requirement: Weekly stats show coordination time trends
  verification_method: browser-render
  assertion: Dashboard renders weekly trend chart or stats section
  threshold: Stats visible in screenshot

- id: PP1-004
  requirement: Commander can see all household activities at a glance
  verification_method: browser-render
  assertion: Dashboard shows summary cards with counts (pending, in-progress, completed)
  threshold: Summary stats visible

## Pain Point 2: Delayed Coordination
- id: PP2-001
  requirement: Real-time sync between Commander and Helper views
  verification_method: code-audit
  assertion: Zustand store updates propagate to all components using the same store
  threshold: Store update triggers re-render in both Commander and Helper screens

- id: PP2-002
  requirement: Push notification system architecture present
  verification_method: code-audit
  assertion: Notification service/module exists with push capability interface
  threshold: Service file present with notification methods

- id: PP2-003
  requirement: Helper task status updates are immediately visible
  verification_method: browser-render
  assertion: Helper screen shows task status badges (assigned/in-progress/done)
  threshold: Status badges visible and update on interaction

- id: PP2-004
  requirement: One-tap task response
  verification_method: manual
  assertion: Helper can complete a task in ≤3 taps from task list
  threshold: Task list → tap task → tap "Done" = 3 taps

## Pain Point 3: Fragmented Tools
- id: PP3-001
  requirement: Unified messaging hub for all family communication
  verification_method: browser-render
  assertion: Message/feed screen exists with task-linked conversations
  threshold: Messaging UI visible with message bubbles

- id: PP3-002
  requirement: Task management replaces separate coordination tools
  verification_method: browser-render
  assertion: Task list screen with create, edit, assign, complete flows
  threshold: Full CRUD visible in task screens

- id: PP3-003
  requirement: Single app navigation replaces app switching
  verification_method: browser-render
  assertion: Bottom/side navigation with Dashboard, Tasks, Messages, Schedule, Settings
  threshold: Navigation bar visible with ≥5 sections

- id: PP3-004
  requirement: Calendar/scheduling integrated (not separate tool)
  verification_method: browser-render
  assertion: Schedule/Calendar screen shows weekly view with events
  threshold: Weekly calendar visible

## Pain Point 4: Mental Exhaustion
- id: PP4-001
  requirement: Auto-reminders for upcoming tasks
  verification_method: code-audit
  assertion: Reminder/notification logic exists in codebase
  threshold: Reminder service or scheduled notification code present

- id: PP4-002
  requirement: Single dashboard view reduces cognitive load
  verification_method: browser-render
  assertion: Dashboard shows critical info without navigation (tasks, alerts, stats)
  threshold: All three sections visible on one screen

- id: PP4-003
  requirement: Priority auto-categorization
  verification_method: code-audit
  assertion: Task creation auto-assigns priority based on rules
  threshold: Auto-priority logic in task creation code

- id: PP4-004
  requirement: System reminds, not the Commander
  verification_method: code-audit
  assertion: Notification triggers are automatic, not manual
  threshold: Auto-trigger logic in notification/reminder code

## Pain Point 5: No Accountability
- id: PP5-001
  requirement: GPS tracking during active tasks
  verification_method: code-audit
  assertion: GPS/location tracking service exists and is called during active tasks
  threshold: Geolocation API usage in active task flow

- id: PP5-002
  requirement: SLA-based escalation engine
  verification_method: code-audit
  assertion: Escalation service with time-based triggers exists
  threshold: Escalation logic with overdue detection

- id: PP5-003
  requirement: Audit log of task completions
  verification_method: code-audit
  assertion: Task history/audit log storage and display exists
  threshold: Audit log component or history tracking in code

- id: PP5-004
  requirement: Helper status visibility to Commander
  verification_method: browser-render
  assertion: Commander dashboard shows helper location/status during tasks
  threshold: Status indicator or location preview visible

## Pain Point 6: Cost of Failure
- id: PP6-001
  requirement: Risk mitigation alerts for at-risk tasks
  verification_method: browser-render
  assertion: Escalation/alert banner visible on dashboard
  threshold: Alert UI with risk indicators visible

- id: PP6-002
  requirement: Incident reporting for missed tasks
  verification_method: browser-render
  assertion: Incident report or missed task notification screen exists
  threshold: Incident report UI visible

- id: PP6-003
  requirement: Auto-escalation when tasks are at risk
  verification_method: code-audit
  assertion: Automatic escalation triggers when task exceeds SLA threshold
  threshold: Auto-escalation logic with time threshold

- id: PP6-004
  requirement: SLA tracking per task type
  verification_method: code-audit
  assertion: Different task types have configurable SLA durations
  threshold: SLA configuration per task type in code

## Runtime Verification (v3.3 Mandatory)
- id: RT-001
  requirement: App renders without blank page
  verification_method: browser-render
  assertion: App served on localhost, loaded in browser, shows visible UI
  threshold: Screenshot shows rendered content, not blank

- id: RT-002
  requirement: Zero JavaScript console errors on load
  verification_method: browser-console
  assertion: Browser console has zero uncaught exceptions after page load
  threshold: 0 errors

- id: RT-003
  requirement: All major routes render without crash
  verification_method: browser-render
  assertion: /, /dashboard, /tasks, /messages, /schedule, /settings all render
  threshold: Each route returns visible content

- id: RT-004
  requirement: No React mount errors
  verification_method: browser-console
  assertion: Console has no "React has stopped working" or similar mount errors
  threshold: 0 React errors

- id: RT-005
  requirement: User sees app content, not server error
  verification_method: browser-render
  assertion: Page HTML does not contain "Server error", "500", or blank content
  threshold: curl response contains <title> and <script> tags with app name
