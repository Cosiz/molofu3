# Molofu3 Architecture v3.7

## Tech Stack
- **Frontend:** React 19 + Vite + TypeScript
- **Routing:** React Router v7 (BrowserRouter + ProtectedRoute)
- **State Management:** Zustand with localStorage persistence
- **Styling:** CSS-in-JS (inline style objects, no external UI library)
- **Build:** Vite v8 (rolldown)
- **Server:** Native Node.js CommonJS http server (SPA routing)
- **Storage:** localStorage (mock, Supabase-ready)
- **GPS:** Browser Geolocation API
- **Notifications:** Browser Notification API

## File Structure
```
src/
├── main.tsx                    # Entry point
── App.tsx                     # Router + layout shell + ProtectedRoute
├── theme.ts                    # Design tokens (colors, spacing, typography)
├── types.ts                    # TypeScript interfaces
├── store.ts                    # Zustand store (auth, tasks, messages, escalations, settings)
├── services/
│   ├── notification.ts         # Auto-reminder + browser notifications
│   └── escalation.ts           # SLA polling, overdue detection
├── components/
│   ├── NavBar.tsx              # Role-based bottom navigation
│   ├── TaskCard.tsx            # Reusable task card with status colors
│   ├── MessageBubble.tsx       # Chat message (sent/received)
│   ├── EscalationBanner.tsx    # Red alert banner for overdue tasks
│   ├── CreateTaskForm.tsx      # Modal form with 7 task types
│   ├── StatusStepper.tsx       # Conditional status steps per task type
│   └── ProtectedRoute.tsx      # Role-based route guard
├── screens/
│   ├── AuthScreen.tsx          # Login/signup with role selector
│   ├── Onboarding.tsx          # 5-step wizard (name, helper, children, locations, prefs)
│   ├── CommanderDashboard.tsx  # Full dashboard: stats, tasks, escalation, GPS
│   ├── HelperDashboard.tsx     # Simplified: big buttons, assigned tasks only
│   ├── ObserverDashboard.tsx   # Read-only: family status, timeline
│   ├── TaskDetail.tsx          # Full task info + status stepper + in-task messaging
│   ├── MessageFeed.tsx         # Task-filtered conversations
│   ├── ScheduleView.tsx        # Weekly calendar, color-coded events
│   └── SettingsScreen.tsx      # Notification toggles, escalation config
├── mocks/
│   └── data.ts                 # Multi-day sample data (today + tomorrow)
└── utils/
    └── time.ts                 # Date/time helpers, SLA calculations
```

## Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  role: 'commander' | 'helper' | 'observer';
  email: string;
  avatar?: string;
  phone?: string;
}
```

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  created_by: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'arrived' | 'done';
  priority: 'high' | 'medium' | 'low';
  due_date: string; // ISO datetime
  location?: string;
  task_type: 'pickup' | 'dropoff' | 'homework' | 'errand' | 'tuition' | 'meal' | 'shopping';
  sla_minutes: number;
  created_at: string;
  completed_at?: string;
  gps_log?: { lat: number; lng: number; timestamp: string }[];
}
```

### Message
```typescript
interface Message {
  id: string;
  task_id: string;
  from_user_id: string;
  text: string;
  timestamp: string;
  read: boolean;
}
```

### Escalation
```typescript
interface Escalation {
  id: string;
  task_id: string;
  triggered_at: string;
  reason: 'overdue' | 'no_response' | 'gps_lost';
  severity: 'warning' | 'critical';
  resolved: boolean;
}
```

## State Management (Zustand)
Single store with slices:
- **auth:** currentUser, login, logout, role
- **tasks:** tasks, addTask, updateTask, deleteTask, getTasksByAssignee
- **messages:** messages, addMessage, markRead
- **escalations:** escalations, triggerEscalation, resolveEscalation
- **settings:** notificationPrefs, escalationThresholds
- **onboarding:** isComplete, step, saveStep

All slices persist to localStorage automatically.

## Routing & Access Control
- `/` → Redirect to `/auth` if not logged in, else role-based dashboard
- `/auth` → AuthScreen (public)
- `/onboarding` → Onboarding (after first login)
- `/dashboard` → CommanderDashboard (commander only)
- `/tasks` → TaskList → TaskDetail (all roles, filtered by role)
- `/messages` → MessageFeed (all roles)
- `/schedule` → ScheduleView (commander only)
- `/settings` → SettingsScreen (commander/helper)
- ProtectedRoute checks auth.role and blocks unauthorized access

## Key Flows

### Task Lifecycle
1. Commander creates task → `pending`
2. Helper accepts → `accepted`
3. Helper starts transit → `in_progress` (GPS starts)
4. Helper arrives → `arrived` (pickup/dropoff only)
5. Helper completes → `done`
6. If SLA exceeded → escalation triggered automatically

### Escalation Engine
- Polls every 30 seconds for overdue tasks
- Checks: current time > due_date - sla_minutes
- Creates escalation record with severity
- Shows red banner on Commander dashboard
- Triggers browser notification

### GPS Tracking
- On task status `in_progress` → start watching position
- Log point every 10 seconds
- Stop on status change to `arrived` or `done`
- Show preview on Commander dashboard

### Role-Based UI
- **Commander:** Full dashboard, all nav items (5), create tasks, view escalations
- **Helper:** Simplified dashboard, 2 nav items (My Tasks, Messages), big buttons, no settings/calendar
- **Observer:** Read-only dashboard, 2 nav items (Status, Feed), timeline only

## Deployment
- Build: `npx vite build` → `dist/`
- Server: `server.cjs` (CommonJS static file server with SPA fallback)
- Port: `process.env.PORT || 3000` (explicit override required)
- SPA fallback: All routes serve `index.html`
- Zeabur: Auto-deploy on push to main
