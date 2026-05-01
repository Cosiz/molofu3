import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { theme } from '../theme';
import { mockUsers, mockTasks } from '../mocks/data';

const steps = ['Household', 'Commander', 'Helper', 'Children', 'Confirm'];
const stepIcons = ['🏠', '👤', '👩‍💼', '👶', '✅'];
const stepDesc = [
  "Set up your household profile. We'll help you organize everything.",
  'You are the Commander — the primary coordinator for your family.',
  'Add your helper (nanny, driver) who will receive and complete tasks.',
  'Add your children and their regular schedules.',
  "All set! Your Family Command Centre is ready to use.",
];

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser, tasks } = useStore();
  const [step, setStep] = useState(0);

  if (tasks.length === 0) {
    mockTasks.forEach((t) => useStore.getState().addTask(t));
    useStore.getState().setCurrentUser(mockUsers[0]);
  }

  const handleComplete = () => {
    setCurrentUser(useStore.getState().currentUser || mockUsers[0]);
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 4, background: theme.colors.border }}>
        <div style={{ height: '100%', width: `${((step + 1) / steps.length) * 100}%`, background: theme.colors.accent, transition: 'width 0.3s' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{stepIcons[step]}</div>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: theme.colors.textPrimary }}>{steps[step]}</div>
        <div style={{ fontSize: 15, color: theme.colors.textSecondary, textAlign: 'center', maxWidth: 320, lineHeight: 1.5 }}>{stepDesc[step]}</div>
      </div>
      <div style={{ padding: '16px 32px 32px', display: 'flex', gap: 12 }}>
        {step > 0 && <button onClick={() => setStep(step - 1)} style={{ flex: 1, padding: 14, borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.border}`, background: 'transparent', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: theme.colors.textPrimary }}>Back</button>}
        <button onClick={step < steps.length - 1 ? () => setStep(step + 1) : handleComplete} style={{ flex: 2, padding: 14, borderRadius: theme.borderRadius.md, border: 'none', background: theme.colors.accent, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{step < steps.length - 1 ? 'Next' : 'Get Started'}</button>
      </div>
    </div>
  );
};
