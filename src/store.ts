import { create } from 'zustand';
import type { User, Task, Message, Escalation } from './types';

interface AppState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  messages: Message[];
  addMessage: (msg: Message) => void;
  markMessagesRead: (task_id: string) => void;
  escalations: Escalation[];
  addEscalation: (esc: Escalation) => void;
  resolveEscalation: (id: string) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

const STORAGE_KEY = 'molofu3_store';

function loadFromStorage(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

export const useStore = create<AppState>((set) => {
  const initial = loadFromStorage();
  return {
    currentUser: initial.currentUser || null,
    setCurrentUser: (user) => set({ currentUser: user }),
    tasks: initial.tasks || [],
    addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),
    updateTask: (id, updates) => set((s) => ({
      tasks: s.tasks.map((t) => t.id === id ? { ...t, ...updates } : t),
    })),
    messages: initial.messages || [],
    addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
    markMessagesRead: (task_id) => set((s) => ({
      messages: s.messages.map((m) => m.task_id === task_id ? { ...m, read: true } : m),
    })),
    escalations: initial.escalations || [],
    addEscalation: (esc) => set((s) => ({ escalations: [...s.escalations, esc] })),
    resolveEscalation: (id) => set((s) => ({
      escalations: s.escalations.map((e) => e.id === id ? { ...e, resolved: true } : e),
    })),
    notificationsEnabled: initial.notificationsEnabled !== undefined ? initial.notificationsEnabled : true,
    setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
  };
});

useStore.subscribe((state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentUser: state.currentUser,
      tasks: state.tasks,
      messages: state.messages,
      escalations: state.escalations,
      notificationsEnabled: state.notificationsEnabled,
    }));
  } catch { /* ignore */ }
});
