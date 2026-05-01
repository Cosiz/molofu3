import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import type { OnboardingData } from '../types';
import { colors, typography, spacing, borderRadius, shadow } from '../theme';

export function Onboarding() {
  const navigate = useNavigate();
  const { setOnboarding, completeOnboarding, currentUser } = useStore();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    commanderName: currentUser?.name || '',
    helperName: '',
    helperPhone: '',
    children: [''],
    defaultPickup: '',
    defaultDropoff: '',
    notificationsEnabled: true,
  });

  const steps = [
    { title: 'Welcome', subtitle: 'Let us set up your Family Command Centre' },
    { title: 'Your Helper', subtitle: 'Who helps with the family tasks?' },
    { title: 'Your Children', subtitle: 'Who are we coordinating for?' },
    { title: 'Locations', subtitle: 'Common pickup and dropoff points' },
    { title: 'Notifications', subtitle: 'How would you like to be alerted?' },
  ];

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setOnboarding(data);
      completeOnboarding();
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const addChild = () => {
    updateData({ children: [...data.children, ''] });
  };

  const removeChild = (index: number) => {
    if (data.children.length > 1) {
      updateData({ children: data.children.filter((_, i) => i !== index) });
    }
  };

  const updateChild = (index: number, value: string) => {
    const newChildren = [...data.children];
    newChildren[index] = value;
    updateData({ children: newChildren });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      padding: spacing.xl,
      paddingBottom: 100,
    }}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.xl }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: i < step ? colors.primary : colors.border,
            }} />
          ))}
        </div>

        {/* Step Content */}
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.lg,
          boxShadow: shadow.card,
        }}>
          <h2 style={{ ...typography.heading, marginBottom: spacing.xs }}>{steps[step - 1].title}</h2>
          <p style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.lg }}>
            {steps[step - 1].subtitle}
          </p>

          {step === 1 && (
            <label style={{ ...typography.body }}>
              Your Name
              <input
                type="text"
                value={data.commanderName}
                onChange={e => updateData({ commanderName: e.target.value })}
                placeholder="e.g., Sarah Chen"
                style={{
                  width: '100%',
                  padding: spacing.md,
                  borderRadius: borderRadius.sm,
                  border: `1px solid ${colors.border}`,
                  ...typography.body,
                  marginTop: 4,
                }}
              />
            </label>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              <label style={{ ...typography.body }}>
                Helper Name
                <input
                  type="text"
                  value={data.helperName}
                  onChange={e => updateData({ helperName: e.target.value })}
                  placeholder="e.g., Maria Santos"
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    borderRadius: borderRadius.sm,
                    border: `1px solid ${colors.border}`,
                    ...typography.body,
                    marginTop: 4,
                  }}
                />
              </label>
              <label style={{ ...typography.body }}>
                Helper Phone
                <input
                  type="tel"
                  value={data.helperPhone}
                  onChange={e => updateData({ helperPhone: e.target.value })}
                  placeholder="+852 9000 0000"
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    borderRadius: borderRadius.sm,
                    border: `1px solid ${colors.border}`,
                    ...typography.body,
                    marginTop: 4,
                  }}
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              {data.children.map((child, i) => (
                <div key={i} style={{ display: 'flex', gap: spacing.sm }}>
                  <input
                    type="text"
                    value={child}
                    onChange={e => updateChild(i, e.target.value)}
                    placeholder={`Child ${i + 1} name`}
                    style={{
                      flex: 1,
                      padding: spacing.md,
                      borderRadius: borderRadius.sm,
                      border: `1px solid ${colors.border}`,
                      ...typography.body,
                    }}
                  />
                  {data.children.length > 1 && (
                    <button
                      onClick={() => removeChild(i)}
                      style={{
                        padding: `0 ${spacing.md}`,
                        borderRadius: borderRadius.sm,
                        background: colors.alert + '20',
                        color: colors.alert,
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 18,
                      }}
                    >×</button>
                  )}
                </div>
              ))}
              <button
                onClick={addChild}
                style={{
                  padding: spacing.sm,
                  borderRadius: borderRadius.sm,
                  background: 'transparent',
                  color: colors.primary,
                  border: `1px dashed ${colors.primary}`,
                  ...typography.body,
                  cursor: 'pointer',
                }}
              >+ Add another child</button>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              <label style={{ ...typography.body }}>
                Default Pickup Location
                <input
                  type="text"
                  value={data.defaultPickup}
                  onChange={e => updateData({ defaultPickup: e.target.value })}
                  placeholder="e.g., HKIS, Happy Valley"
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    borderRadius: borderRadius.sm,
                    border: `1px solid ${colors.border}`,
                    ...typography.body,
                    marginTop: 4,
                  }}
                />
              </label>
              <label style={{ ...typography.body }}>
                Default Dropoff Location
                <input
                  type="text"
                  value={data.defaultDropoff}
                  onChange={e => updateData({ defaultDropoff: e.target.value })}
                  placeholder="e.g., Home, Mid-Levels"
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    borderRadius: borderRadius.sm,
                    border: `1px solid ${colors.border}`,
                    ...typography.body,
                    marginTop: 4,
                  }}
                />
              </label>
            </div>
          )}

          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.md,
                padding: spacing.md,
                borderRadius: borderRadius.sm,
                background: colors.background,
                cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  checked={data.notificationsEnabled}
                  onChange={e => updateData({ notificationsEnabled: e.target.checked })}
                  style={{ width: 20, height: 20 }}
                />
                <div>
                  <div style={{ ...typography.subheading }}>Push Notifications</div>
                  <div style={{ ...typography.small, color: colors.textSecondary }}>
                    Get alerted when tasks are due or overdue
                  </div>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: spacing.md, marginTop: spacing.lg }}>
          {step > 1 && (
            <button
              onClick={handleBack}
              style={{
                flex: 1,
                padding: spacing.md,
                borderRadius: borderRadius.sm,
                background: colors.background,
                color: colors.textPrimary,
                border: `1px solid ${colors.border}`,
                ...typography.button,
                minHeight: 48,
                cursor: 'pointer',
              }}
            >Back</button>
          )}
          <button
            onClick={handleNext}
            style={{
              flex: step === 1 ? 1 : 2,
              padding: spacing.md,
              borderRadius: borderRadius.sm,
              background: colors.primary,
              color: colors.card,
              border: 'none',
              ...typography.button,
              minHeight: 48,
              cursor: 'pointer',
            }}
          >{step === 5 ? 'Get Started' : 'Next'}</button>
        </div>
      </div>
    </div>
  );
}
