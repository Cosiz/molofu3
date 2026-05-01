import { create } from 'zustand';
import type { User, Task, Message, Escalation, Settings, OnboardingData, UserRole } from './types';

interface AuthSlice {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

interface TasksSlice {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByAssignee: (userId: string) => Task[];
  getTodayTasks: () => Task[];
}

interface MessagesSlice {
  messages: Message[];
  addMessage: (message: Message) => void;
  markRead: (messageId: string) => void;
  getMessagesByTask: (taskId: string) => Message[];
}

interface EscalationsSlice {
  escalations: Escalation[];
  addEscalation: (escalation: Escalation) => void;
  resolveEscalation: (id: string) => void;
  getActiveEscalations: () => Escalation[];
}

interface SettingsSlice {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

interface OnboardingSlice {
  onboarding: OnboardingData | null;
  isOnboardingComplete: boolean;
  setOnboarding: (data: OnboardingData) => void;
  completeOnboarding: () => void;
}

export const useStore = create<
  AuthSlice & TasksSlice & MessagesSlice & EscalationsSlice & SettingsSlice & OnboardingSlice
>((set, get) => {
  // Load from localStorage
  const load = <T>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const savedAuth = load<{ user: User | null }>('molofu_auth', { user: null });
  const savedTasks = load<Task[]>('molofu_tasks', []);
  const savedMessages = load<Message[]>('molofu_messages', []);
  const savedEscalations = load<Escalation[]>('molofu_escalations', []);
  const savedSettings = load<Settings>('molofu_settings', {
    notifications: { push: true, sound: true, email: false },
    escalation: { pickup_sla: 15, dropoff_sla: 15, homework_sla: 30, errand_sla: 45, tuition_sla: 10, meal_sla: 30, shopping_sla: 60 },
  });
  const savedOnboarding = load<OnboardingData | null>('molofu_onboarding', null);

  return {
    // Auth
    currentUser: savedAuth.user,
    isAuthenticated: !!savedAuth.user,
    login: (user) => {
      set({ currentUser: user, isAuthenticated: true });
      localStorage.setItem('molofu_auth', JSON.stringify({ user }));
    },
    logout: () => {
      set({ currentUser: null, isAuthenticated: false });
      localStorage.removeItem('molofu_auth');
    },

    // Tasks
    tasks: savedTasks,
    addTask: (task) => {
      const tasks = [...get().tasks, task];
      set({ tasks });
      localStorage.setItem('molofu_tasks', JSON.stringify(tasks));
    },
    updateTask: (id, updates) => {
      const tasks = get().tasks.map(t => t.id === id ? { ...t, ...updates } : t);
      set({ tasks });
      localStorage.setItem('molofu_tasks', JSON.stringify(tasks));
    },
    deleteTask: (id) => {
      const tasks = get().tasks.filter(t => t.id !== id);
      set({ tasks });
      localStorage.setItem('molofu_tasks', JSON.stringify(tasks));
    },
    getTasksByAssignee: (userId) => get().tasks.filter(t => t.assigned_to === userId),
    getTodayTasks: () => {
      const today = new Date().toISOString().split('T')[0];
      return get().tasks.filter(t => t.due_date.startsWith(today));
    },

    // Messages
    messages: savedMessages,
    addMessage: (message) => {
      const messages = [...get().messages, message];
      set({ messages });
      localStorage.setItem('molofu_messages', JSON.stringify(messages));
    },
    markRead: (messageId) => {
      const messages = get().messages.map(m => m.id === messageId ? { ...m, read: true } : m);
      set({ messages });
      localStorage.setItem('molofu_messages', JSON.stringify(messages));
    },
    getMessagesByTask: (taskId) => get().messages.filter(m => m.task_id === taskId),

    // Escalations
    escalations: savedEscalations,
    addEscalation: (escalation) => {
      const escalations = [...get().escalations, escalation];
      set({ escalations });
      localStorage.setItem('molofu_escalations', JSON.stringify(escalations));
    },
    resolveEscalation: (id) => {
      const escalations = get().escalations.map(e => e.id === id ? { ...e, resolved: true } : e);
      set({ escalations });
      localStorage.setItem('molofu_escalations', JSON.stringify(escalations));
    },
    getActiveEscalations: () => get().escalations.filter(e => !e.resolved),

    // Settings
    settings: savedSettings,
    updateSettings: (updates) => {
      const settings = { ...get().settings, ...updates };
      set({ settings });
      localStorage.setItem('molofu_settings', JSON.stringify(settings));
    },

    // Onboarding
    onboarding: savedOnboarding,
    isOnboardingComplete: !!savedOnboarding,
    setOnboarding: (data) => {
      set({ onboarding: data });
      localStorage.setItem('molofu_onboarding', JSON.stringify(data));
    },
    completeOnboarding: () => {
      set({ isOnboardingComplete: true });
    },
  };
});
