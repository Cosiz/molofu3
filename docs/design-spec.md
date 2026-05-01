# Molofu3 Design Specification

## Design System

### Color Palette
- **Primary:** #1A1A2E (Deep Navy) — Headers, primary actions
- **Secondary:** #16213E (Dark Blue) — Secondary backgrounds
- **Accent:** #E94560 (Coral Red) — Alerts, escalation, CTAs
- **Success:** #00B894 (Mint Green) — Completed tasks, confirmations
- **Warning:** #FDCB6E (Amber) — Pending, warnings
- **Danger:** #D63031 (Red) — Overdue, escalation banners
- **Info:** #0984E3 (Blue) — Info badges, helper status
- **Surface:** #FFFFFF (White) — Cards, content areas
- **Background:** #F8F9FA (Light Gray) — Page backgrounds
- **Text Primary:** #2D3436 (Charcoal) — Headings, body text
- **Text Secondary:** #636E72 (Gray) — Subtitles, metadata
- **Text Inverse:** #FFFFFF — Text on dark backgrounds

### Typography
- **Headings:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Body:** Same system font stack
- **Scale:** 32px (h1), 24px (h2), 20px (h3), 16px (body), 14px (small), 12px (caption)

### Spacing
- **Grid:** 8px base unit
- **Padding:** 8px, 12px, 16px, 24px, 32px
- **Card Gap:** 16px
- **Section Gap:** 24px

### Component Patterns
- **Cards:** White background, 8px border-radius, subtle shadow (0 2px 8px rgba(0,0,0,0.08))
- **Buttons:** 8px border-radius, 12px vertical padding, 24px horizontal padding
- **Badges:** 16px height, 8px border-radius (pill), 6px vertical padding, 12px horizontal padding
- **Inputs:** 8px border-radius, 1px border (#DFE6E9), 12px padding
- **Navigation Bar:** Fixed bottom, 60px height, 5 icons with labels

### Screen Layouts

#### Commander Dashboard (Dark Theme)
- Top: Greeting + date
- Stats row: 3 cards (Pending, In Progress, Completed) with counts
- Today's Tasks: Scrollable list with priority indicators
- Escalation Banner: Red banner if any tasks are overdue
- GPS Preview: Map snippet showing helper locations
- Bottom Nav: Dashboard | Tasks | Messages | Schedule | Settings

#### Task List (Light Theme)
- Header: "Tasks" with filter chips (All/Pending/Done)
- Task Cards: Title, assignee, due time, priority badge, status
- Floating Action Button: Create new task
- Tap task → Task Detail screen

#### Task Detail (Light Theme)
- Header: Task title + back button
- Info Grid: Assignee, Due, Priority, Status
- Status Stepper: Assigned → Accepted → Started → Arrived → Done
- Action Buttons: Accept, Start, Arrive, Done (based on current status)
- Message Feed: In-app messages related to this task
- GPS Log: Location history if task involves transit

#### Helper Dashboard (Light Theme)
- Greeting: "Good morning, [Helper Name]"
- Today's Tasks: Cards with action buttons
- GPS Status: "Location tracking: ON" indicator
- Quick Actions: Mark arrived, Message Commander, Emergency

#### Messages (Light Theme)
- Header: "Messages" with search
- Task-linked conversations: Each task has its own message thread
- Message bubbles: Left (received), Right (sent)
- Read receipts: Small checkmarks
- Input: Text field + send button

#### Schedule (Dark Theme)
- Week header: Mon-Sun with date
- Day columns: Events as colored blocks
- Transport events: Highlighted with vehicle icon
- Tap day → Day detail view

#### Settings (Dark/Light Theme)
- Profile section: Name, role, avatar
- Notification toggles: Push, SMS, Email
- Escalation config: SLA thresholds
- Account: Sign out, data export

#### Auth Screen (Light Theme)
- Logo + "Family Command Centre"
- Email/password fields
- Login/Sign Up toggle
- Role selection (Commander/Helper/Observer)

#### Onboarding (Light Theme)
- 5-step wizard: Household → Commander → Helper → Children → Confirm
- Progress indicator at top
- Next/Back buttons
- Skip option for non-required steps
