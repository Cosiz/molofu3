# Molofu3 Design Specification v3.7

## Persona-Driven Architecture

### Persona 1: Sarah Chen (Commander)
**Who:** 38, marketing director, primary parent
**Context:** Office during day, commuting, home evenings
**Constraints:** 30 seconds max per interaction during work, one-hand operation, can't type long messages
**Goal:** Assign tasks and monitor progress without disrupting work
**Success:** Creates a task in ≤30 seconds, sees all tasks at a glance
**Failure:** Can't find task creation, abandons and calls helper on WhatsApp

### Persona 2: Maria Santos (Helper)
**Who:** 45, domestic helper from Philippines
**Context:** Markets, school runs, home, often with wet/dirty hands
**Constraints:** Limited English, big fingers, needs large touch targets, no typing preferred
**Goal:** See what to do next, update status simply
**Success:** Sees assigned task, taps "Accept", taps "Done" — 2 taps
**Failure:** Confusing UI, can't read labels, abandons task

### Persona 3: David Chen (Observer)
**Who:** 40, finance manager, secondary parent
**Context:** Office, travel, home
**Constraints:** View-only, needs quick status checks, laptop preferred
**Goal:** Check family status in one glance
**Success:** Opens app, sees all kids' status, no action needed
**Failure:** Can't find info, asks Sarah on WhatsApp

## UI Per Persona

### Commander UI (Full Dashboard)
- **Header:** "Good morning, Sarah" + date
- **Stats Row:** 3 cards (Tasks Today, Escalations, Helper Status)
- **Escalation Banner:** Red banner if any task overdue
- **Task List:** All tasks with status, assignee, due time
- **Floating "+" Button:** Create new task
- **Bottom Nav:** Dashboard, Tasks, Messages, Schedule, Settings
- **GPS Preview:** Small map showing helper locations

### Helper UI (Simplified, Big Buttons)
- **Header:** Simple greeting + next task
- **Big Action Card:** Current task with large "Accept"/"Start"/"Done" buttons (44px+ touch targets)
- **Task List:** Only assigned tasks, chronological
- **Status Badges:** Simple icons (⏳ pending, 🚗 in transit, ✅ done)
- **Bottom Nav:** My Tasks, Messages (only 2 items)
- **No settings, no calendar, no GPS** — keep it simple

### Observer UI (Read-Only)
- **Header:** "Family Status"
- **Summary Cards:** Kids' locations, helper status, upcoming events
- **Timeline:** Chronological feed of completed tasks
- **Bottom Nav:** Status, Feed (only 2 items)
- **No action buttons** — everything is view-only

## Color Palette
- **Primary:** #1E40AF (deep blue — trust, reliability)
- **Secondary:** #10B981 (green — success, done)
- **Alert:** #EF4444 (red — escalation, overdue)
- **Warning:** #F59E0B (amber — approaching deadline)
- **Background:** #F8FAFC (light gray)
- **Card:** #FFFFFF (white)
- **Text Primary:** #1F2937 (dark gray)
- **Text Secondary:** #6B7280 (medium gray)

## Typography
- **Headings:** System font, 20px bold
- **Subheadings:** System font, 16px semibold
- **Body:** System font, 14px regular
- **Small:** System font, 12px regular (timestamps, labels)
- **Buttons:** System font, 16px bold, uppercase

## Spacing Tokens
- **XS:** 4px (tight spacing)
- **SM:** 8px (element spacing)
- **MD:** 16px (section spacing)
- **LG:** 24px (card spacing)
- **XL:** 32px (page margins)

## Component Specifications

### TaskCard
- **Width:** Full width - 32px padding
- **Height:** Auto (min 80px)
- **Border Radius:** 12px
- **Shadow:** 0 2px 8px rgba(0,0,0,0.1)
- **Content:** Title (16px bold), Status badge, Assignee, Due time
- **Status Colors:** pending=amber, accepted=blue, in_progress=blue, arrived=green, done=green

### NavBar
- **Height:** 64px
- **Items:** 5 icons with labels
- **Active State:** Primary color
- **Inactive State:** Gray

### EscalationBanner
- **Height:** 48px
- **Background:** #EF4444
- **Text:** White, bold
- **Icon:** ⚠️ warning
- **Action:** Tap to view details

### CreateTaskForm (Modal)
- **Fields:** Title (text), Assignee (dropdown), Due (date+time), Priority (auto/manual), Type (dropdown)
- **Submit:** Full-width button at bottom
- **Cancel:** Top-right X button

### MessageBubble
- **Sent:** Primary color background, white text, right-aligned
- **Received:** White background, dark text, left-aligned
- **Radius:** 16px (12px on bubble tail side)
- **Timestamp:** Small gray below bubble

### ScheduleView
- **Layout:** Weekly grid, 7 columns
- **Header:** Day names
- **Cells:** Color-coded blocks for events
- **Colors:** School=blue, Tuition=purple, Activity=green, Personal=amber

## Screen Specifications

### 1. Auth Screen
- **Logo:** Molofu3 icon
- **Title:** "Family Command Centre"
- **Form:** Email, Password, Role selector (Commander/Helper/Observer)
- **Actions:** Login, Sign Up
- **Password:** Min 3 chars, visible

### 2. Onboarding (5 steps)
- Step 1: Welcome + Commander name
- Step 2: Helper name + phone
- Step 3: Children names
- Step 4: Default pickup/dropoff locations
- Step 5: Notification preferences

### 3. Commander Dashboard
- Stats row (3 cards)
- Escalation banner (conditional)
- Today's tasks (list)
- Floating "+" button

### 4. Helper Dashboard
- Greeting + next task big card
- Assigned tasks list
- Simple 2-item nav

### 5. Observer Dashboard
- Family status summary
- Activity timeline
- Simple 2-item nav

### 6. Task Detail
- Full task info
- Status stepper
- Action buttons (persona-dependent)
- In-task messaging

### 7. Message Feed
- Task-filtered conversations
- Message bubbles
- Read receipts

### 8. Schedule View
- Weekly calendar
- Color-coded events
- Tap to view details

### 9. Settings
- Notification toggles
- Escalation thresholds
- Profile info

## Responsive Breakpoints
- **Mobile:** < 768px (primary target)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px (Observer primary)

## Accessibility
- Minimum touch target: 44x44px
- Contrast ratio: 4.5:1 minimum
- Screen reader labels on all interactive elements
- Focus visible on keyboard navigation
