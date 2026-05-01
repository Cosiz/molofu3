# Molofu3 v3.7.2 Design Specification

## Persona-Driven Architecture

### Persona 1: Sarah Chen (Commander) — Control & Calm
**Design Principle:** "Give Sarah control without complexity."
- Dashboard must show everything at a glance — no scrolling needed for critical info
- Task creation must be ≤3 taps — she's in a meeting, can't navigate deep forms
- Color coding is critical — red = urgent, green = done, amber = pending. She processes color faster than text.
- Escalation banner must be impossible to miss when critical, but not distracting for warnings
- GPS preview gives her peace of mind — she sees, not wonders

### Persona 2: Maria Santos (Helper) — Clarity & Confidence
**Design Principle:** "Make Maria feel capable, not confused."
- Buttons must be 44px+ minimum — her fingers are big, she often has wet hands
- Labels must be simple English + icons — she understands pictures better than words
- No typing required — tap-only interactions for status updates
- Big green "DONE" button gives her satisfaction — she knows she completed the task
- Simple navigation — only 2 tabs (My Tasks, Messages). She doesn't need settings or calendar.

### Persona 3: David Chen (Observer) — Peace of Mind
**Design Principle:** "Let David see everything in one glance."
- Read-only timeline of completed tasks — he wants to know things are done
- Green checkmarks everywhere — visual reassurance
- No action buttons — he shouldn't accidentally change anything
- Simple 2-tab navigation — Status and Feed only
- Summary cards with counts — he wants numbers, not details

## UI Per Persona

### Commander UI (Full Dashboard)
- **Header:** "Good morning, Sarah" + date (personalized greeting)
- **Stats Row:** 3 cards (Tasks Today, Escalations, Helper Status) — color-coded
- **Escalation Banner:** Red banner if any task overdue — impossible to miss
- **Task List:** All tasks with status, assignee, due time — color-coded borders
- **Floating "+" Button:** Large (56px), high contrast, bottom-right — easy to tap
- **Bottom Nav:** 5 items (Dashboard, Tasks, Messages, Schedule, Settings)
- **GPS Preview:** Small map card showing helper locations — peace of mind

### Helper UI (Simplified, Big Buttons)
- **Header:** Simple greeting + next task — no clutter
- **Big Action Card:** Current task with large "Accept"/"Start"/"Done" buttons (56px+)
- **Task List:** Only assigned tasks, chronological — simple icons
- **Status Badges:** Simple icons (⏳ pending,  in transit, ✅ done) — no text needed
- **Bottom Nav:** 2 items (My Tasks, Messages) — nothing else
- **No settings, no calendar, no GPS** — keep it simple, reduce cognitive load

### Observer UI (Read-Only)
- **Header:** "Family Status" — calm, reassuring
- **Summary Cards:** Kids' locations, helper status, upcoming events — counts and colors
- **Timeline:** Chronological feed of completed tasks — green checkmarks
- **Bottom Nav:** 2 items (Status, Feed) — nothing else
- **No action buttons** — everything is view-only, no mistakes possible

## Color Palette (Emotion-Driven)
- **Primary:** #1E40AF (deep blue — trust, reliability, calm)
- **Secondary:** #10B981 (green — success, done, peace of mind)
- **Alert:** #EF4444 (red — urgent, critical, must act now)
- **Warning:** #F59E0B (amber — approaching deadline, pay attention)
- **Background:** #F8FAFC (light gray — clean, uncluttered)
- **Card:** #FFFFFF (white — clear separation)
- **Text Primary:** #1F2937 (dark gray — readable)
- **Text Secondary:** #6B7280 (medium gray — supporting info)
- **Status Colors:**
  - pending: amber (#F59E0B) — "needs attention"
  - accepted: blue (#1E40AF) — "in progress"
  - in_progress: blue (#3B82F6) — "moving"
  - arrived: green (#10B981) — "almost done"
  - done: green (#10B981) — "complete, peace of mind"

## Typography (Clarity-First)
- **Headings:** System font, 20px bold — clear hierarchy
- **Subheadings:** System font, 16px semibold — section breaks
- **Body:** System font, 14px regular — readable on mobile
- **Small:** System font, 12px regular — timestamps, labels
- **Buttons:** System font, 16px bold, uppercase — action-oriented
- **Helper Labels:** System font, 18px bold — larger for Maria's readability

## Spacing Tokens (Breathing Room)
- **XS:** 4px (tight spacing)
- **SM:** 8px (element spacing)
- **MD:** 16px (section spacing)
- **LG:** 24px (card spacing)
- **XL:** 32px (page margins)
- **Touch Target:** 44px minimum (accessibility standard)

## Component Specifications

### TaskCard
- **Width:** Full width - 32px padding
- **Height:** Auto (min 80px)
- **Border Radius:** 12px (friendly, modern)
- **Shadow:** 0 2px 8px rgba(0,0,0,0.1) (subtle depth)
- **Left Border:** 4px color-coded by status (instant status recognition)
- **Content:** Title (16px bold), Status badge, Assignee, Due time
- **Delight:** Color-coded left border — Sarah knows status before reading text

### NavBar
- **Height:** 64px (comfortable touch target)
- **Items:** 5 icons with labels (Commander) or 2 (Helper/Observer)
- **Active State:** Primary color + bold — clear indication of location
- **Inactive State:** Gray — reduced cognitive load
- **Delight:** Active tab is obvious — no confusion about where you are

### EscalationBanner
- **Height:** 48px
- **Background:** #EF4444 (red — urgent)
- **Text:** White, bold — high contrast, readable
- **Icon:** ⚠️ warning — universal symbol
- **Action:** Tap to view details — clear affordance
- **Delight:** Only shows for critical — doesn't cry wolf

### CreateTaskForm (Modal)
- **Fields:** Title (text), Assignee (dropdown), Due (date+time), Priority (auto/manual), Type (dropdown)
- **Submit:** Full-width button at bottom — clear action
- **Cancel:** Top-right X button — easy escape
- **Delight:** Auto-priority based on task type — Sarah doesn't have to think

### MessageBubble
- **Sent:** Primary color background, white text, right-aligned
- **Received:** White background, dark text, left-aligned
- **Radius:** 16px (12px on bubble tail side) — friendly chat feel
- **Timestamp:** Small gray below bubble
- **Read Receipts:** ✓✓ for read — Sarah knows Maria saw the message
- **Delight:** Read receipts give Sarah confidence her message was seen

### ScheduleView
- **Layout:** Weekly grid, 7 columns
- **Header:** Day names
- **Cells:** Color-coded blocks for events
- **Colors:** School=blue, Tuition=purple, Activity=green, Personal=amber
- **Delight:** Color coding — Sarah sees patterns at a glance

## Screen Specifications

### 1. Auth Screen
- **Logo:** Molofu3 icon (👨‍👩‍👧‍👦 family emoji)
- **Title:** "Family Command Centre"
- **Form:** Email, Password, Role selector (Commander/Helper/Observer)
- **Actions:** Login, Sign Up
- **Password:** Min 3 chars, visible — simple for Maria
- **Delight:** Role selector helps Maria find her path quickly

### 2. Onboarding (5 steps)
- Step 1: Welcome + Commander name
- Step 2: Helper name + phone
- Step 3: Children names
- Step 4: Default pickup/dropoff locations
- Step 5: Notification preferences
- **Progress:** Visual progress bar — Maria knows how much is left
- **Delight:** ≤2 minutes total — respects Sarah's time

### 3. Commander Dashboard
- Stats row (3 cards)
- Escalation banner (conditional)
- Today's tasks (list)
- Floating "+" button
- GPS preview (small map card)
- **Delight:** One glance tells Sarah everything she needs to know

### 4. Helper Dashboard
- Greeting + next task big card
- Assigned tasks list
- Simple 2-item nav
- **Delight:** Big green "DONE" button gives Maria satisfaction

### 5. Observer Dashboard
- Family status summary
- Activity timeline
- Simple 2-item nav
- **Delight:** Green checkmarks everywhere — David feels reassured

### 6. Task Detail
- Full task info
- Status stepper (conditional per task type)
- Action buttons (persona-dependent)
- In-task messaging
- **Delight:** Status stepper shows progress — everyone knows where things stand

### 7. Message Feed
- Task-filtered conversations
- Message bubbles
- Read receipts
- **Delight:** Read receipts eliminate "did they see it?" anxiety

### 8. Schedule View
- Weekly calendar
- Color-coded events
- Tap to view details
- **Delight:** Color coding — patterns visible at a glance

### 9. Settings
- Notification toggles
- Escalation thresholds
- Profile info
- Logout button
- **Delight:** Simple toggles — Sarah feels in control

## Responsive Breakpoints
- **Mobile:** < 768px (primary target — Sarah and Maria are on phones)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px (Observer primary — David checks from laptop)

## Accessibility (Delight for All)
- Minimum touch target: 44x44px (Maria's fingers)
- Contrast ratio: 4.5:1 minimum (readable in bright sunlight)
- Screen reader labels on all interactive elements
- Focus visible on keyboard navigation
- Simple English labels (Maria's limited English)
- Icons alongside text (universal understanding)
