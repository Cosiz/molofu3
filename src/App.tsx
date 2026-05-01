import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import { NavBar } from './components/NavBar';
import { CommanderDashboard } from './screens/CommanderDashboard';
import { TaskList } from './screens/TaskList';
import { TaskDetail } from './screens/TaskDetail';
import { MessageFeed } from './screens/MessageFeed';
import { ScheduleView } from './screens/ScheduleView';
import { SettingsScreen } from './screens/SettingsScreen';
import { LocationMap } from './screens/LocationMap';
import { AuthScreen } from './screens/AuthScreen';
import { Onboarding } from './screens/Onboarding';

const AppRoutes: React.FC = () => {
  const { currentUser } = useStore();
  if (!currentUser) {
    return (<Routes>
      <Route path="/auth" element={<AuthScreen />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>);
  }
  return (<Routes>
    <Route path="/" element={<CommanderDashboard />} />
    <Route path="/dashboard" element={<CommanderDashboard />} />
    <Route path="/tasks" element={<TaskList />} />
    <Route path="/tasks/:id" element={<TaskDetail />} />
    <Route path="/messages" element={<MessageFeed />} />
    <Route path="/schedule" element={<ScheduleView />} />
    <Route path="/settings" element={<SettingsScreen />} />
    <Route path="/location" element={<LocationMap />} />
    <Route path="/auth" element={<AuthScreen />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>);
};

export const App: React.FC = () => {
  const { currentUser } = useStore();
  return (<BrowserRouter><AppRoutes />{currentUser && <NavBar />}</BrowserRouter>);
};
