import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { useStore } from './store';
import { mockUsers, mockTasks, mockMessages, mockEscalations } from './mocks/data';
import { requestNotificationPermission } from './services/notification';

const store = useStore.getState();
if (store.tasks.length === 0) {
  mockTasks.forEach(task => store.addTask(task));
  mockMessages.forEach(msg => store.addMessage(msg));
  mockEscalations.forEach(esc => store.addEscalation(esc));
}

requestNotificationPermission();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
