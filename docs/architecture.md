# Molofu3 Architecture

## Tech Stack
- **Frontend:** React 19 + Vite + TypeScript
- **Routing:** React Router v7 (BrowserRouter)
- **State Management:** Zustand
- **Styling:** CSS-in-JS (inline style objects)
- **Build:** Vite v8 (rolldown)
- **Server:** Native Node.js CommonJS http server (SPA routing)
- **Storage:** localStorage (mock, Supabase-ready)
- **GPS:** Browser Geolocation API

## File Structure
```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Router + layout shell
├── theme.ts                    # Design tokens
├── types.ts                    # TypeScript interfaces
├── store.ts                    # Zustand store
├── services/
│   ├── notification.ts         # Auto-reminder service
│   └── escalation.ts           # SLA escalation engine
├── components/
│   ├── NavBar.tsx              # Bottom navigation
│   ├── TaskCard.tsx            # Reusable task card
│   ├── StatusBadge.tsx         # Priority/status badges
│   └── MessageBubble.tsx       # Chat message component
├── screens/
│   ├── AuthScreen.tsx          # Login/signup
│   ├── Onboarding.tsx          # 5-step wizard
│   ├── CommanderDashboard.tsx  # Main dashboard
│   ├── TaskList.tsx            # All tasks view
│   ├── TaskDetail.tsx          # Single task view
│   ├── MessageFeed.tsx         # In-app messaging
│   ├── ScheduleView.tsx        # Weekly calendar
│   ├── SettingsScreen.tsx      # Settings
│   └── LocationMap.tsx         # GPS tracking
├── mocks/
│   └── data.ts                 # Sample data
└── utils/
    └── time.ts                 # Date/time helpers
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
  due_date: string;
  location?: string;
  task_type: 'pickup' | 'dropoff' | 'homework' | 'errand' | 'tuition';
  sla_minutes: number;
  created_at: string;
  completed_at?: string;
  gps_log?: GeoPoint[];
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
Single store with slices: auth, tasks, messages, gps, escalations, settings.

## Key Flows

### Task Lifecycle
1. Commander creates task → `pending`
2. Helper accepts → `accepted`
3. Helper starts transit → `in_progress` (GPS starts)
4. Helper arrives → `arrived`
5. Helper completes → `done`
6. If SLA exceeded at any point → escalation triggered

### Escalation Engine
- Polls every 30 seconds for overdue tasks
- Checks: current time > due_date - sla_minutes
- Creates escalation record
- Shows banner on Commander dashboard

### GPS Tracking
- On task status `in_progress` → start watching position
- Log point every 10 seconds
- Stop on status change to `arrived` or `done`

## Deployment
- Build: `npx vite build` → `dist/`
- Server: `server.cjs` (CommonJS static file server)
- Port: `process.env.PORT || 3000`
- SPA fallback: All routes serve `index.html`
