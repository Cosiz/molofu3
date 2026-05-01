import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useStore } from './store';
import { NavBar } from './components/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthScreen } from './screens/AuthScreen';
import { Onboarding } from './screens/Onboarding';
import { CommanderDashboard } from './screens/CommanderDashboard';
import { HelperDashboard } from './screens/HelperDashboard';
import { ObserverDashboard } from './screens/ObserverDashboard';
import { TaskDetail } from './screens/TaskDetail';
import { MessageFeed } from './screens/MessageFeed';
import { ScheduleView } from './screens/ScheduleView';
import { SettingsScreen } from './screens/SettingsScreen';
import { colors } from './theme';

function AppContent() {
  const { currentUser, isAuthenticated, isOnboardingComplete } = useStore();
  const location = useLocation();

  const showNav = isAuthenticated &&
    location.pathname !== '/auth' &&
    location.pathname !== '/onboarding';

  const dashboardForRole = () => {
    if (!currentUser) return <Navigate to="/auth" />;
    switch (currentUser.role) {
      case 'commander': return <CommanderDashboard />;
      case 'helper': return <HelperDashboard />;
      case 'observer': return <ObserverDashboard />;
      default: return <Navigate to="/auth" />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <Routes>
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute>{dashboardForRole()}</ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute allowedRoles={['commander', 'helper']}><TaskListView /></ProtectedRoute>} />
        <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetail /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessageFeed /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute allowedRoles={['commander']}><ScheduleView /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={['commander', 'helper']}><SettingsScreen /></ProtectedRoute>} />
        <Route path="/" element={
          isAuthenticated
            ? (isOnboardingComplete ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />)
            : <Navigate to="/auth" />
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {showNav && <NavBar />}
    </div>
  );
}

// Task List View (shared between Commander and Helper)
function TaskListView() {
  const { currentUser, tasks, updateTask } = useStore();
  const isCommander = currentUser?.role === 'commander';

  const myTasks = isCommander
    ? tasks
    : tasks.filter(t => t.assigned_to === currentUser?.id);

  const sorted = [...myTasks].sort((a, b) => {
    if (a.status === 'done' && b.status !== 'done') return 1;
    if (b.status === 'done' && a.status !== 'done') return -1;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  const handleAction = (taskId: string, action: string) => {
    const statusMap: Record<string, string> = {
      accept: 'accepted',
      start: 'in_progress',
      done: 'done',
    };
    const newStatus = statusMap[action];
    if (newStatus) {
      updateTask(taskId, {
        status: newStatus as any,
        ...(newStatus === 'done' ? { completed_at: new Date().toISOString() } : {}),
      });
    }
  };

  return (
    <div style={{ padding: '16px', paddingBottom: 80 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
        {isCommander ? 'All Tasks' : 'My Tasks'}
      </h1>
      {sorted.map(task => (
        <div
          key={task.id}
          onClick={() => window.location.hash = `/tasks/${task.id}`}
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${
              task.status === 'done' ? '#10B981' :
              task.status === 'in_progress' || task.status === 'accepted' ? '#3B82F6' :
              '#F59E0B'
            }`,
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontWeight: 600, fontSize: 16 }}>{task.title}</span>
            <span style={{
              fontSize: 12,
              padding: '2px 8px',
              borderRadius: 4,
              background: (task.status === 'done' ? '#10B981' : '#3B82F6') + '20',
              color: task.status === 'done' ? '#10B981' : '#3B82F6',
              fontWeight: 600,
            }}>{task.status.replace('_', ' ')}</span>
          </div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>
            {task.task_type} • Due {new Date(task.due_date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
          {!isCommander && task.status !== 'done' && (
            <button
              onClick={(e) => { e.stopPropagation(); handleAction(task.id, task.status === 'pending' ? 'accept' : task.status === 'accepted' ? 'start' : 'done'); }}
              style={{
                width: '100%',
                marginTop: 8,
                padding: 12,
                borderRadius: 8,
                background: '#1E40AF',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {task.status === 'pending' ? 'Accept' : task.status === 'accepted' ? 'Start' : 'Done'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
