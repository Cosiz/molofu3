import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { mockUsers } from '../mocks/data';
import { colors, typography, spacing, borderRadius, shadow } from '../theme';

export function AuthScreen() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'commander' | 'helper' | 'observer'>('commander');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (password.length < 3) {
      setError('Password must be at least 3 characters');
      return;
    }

    // Check mock users
    const user = mockUsers.find(u => u.email === email && u.role === role);
    if (user) {
      login(user);
      navigate('/onboarding');
      return;
    }

    // Demo login — accept any email/password for demo
    const newUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      role,
      email,
      avatar: email.slice(0, 2).toUpperCase(),
    };
    login(newUser);
    navigate('/onboarding');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xl,
      background: colors.background,
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: borderRadius.xl,
        background: colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
        marginBottom: spacing.lg,
      }}>👨‍‍👧👦</div>

      <h1 style={{ ...typography.heading, marginBottom: spacing.xs }}>Family Command Centre</h1>
      <p style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.xl }}>Molofu3</p>

      <div style={{
        width: '100%',
        maxWidth: 400,
        background: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        boxShadow: shadow.card,
      }}>
        <h2 style={{ ...typography.subheading, marginBottom: spacing.md }}>
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>

        {error && (
          <div style={{
            background: colors.alert + '20',
            color: colors.alert,
            padding: spacing.sm,
            borderRadius: borderRadius.sm,
            ...typography.small,
            marginBottom: spacing.md,
          }}>{error}</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          <label style={{ ...typography.body }}>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
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
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min 3 characters"
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
            I am a...
            <select
              value={role}
              onChange={e => setRole(e.target.value as any)}
              style={{
                width: '100%',
                padding: spacing.md,
                borderRadius: borderRadius.sm,
                border: `1px solid ${colors.border}`,
                ...typography.body,
                marginTop: 4,
                background: colors.card,
              }}
            >
              <option value="commander">Commander (Parent)</option>
              <option value="helper">Helper (Nanny/Driver)</option>
              <option value="observer">Observer (Family Member)</option>
            </select>
          </label>

          <button
            onClick={handleSubmit}
            style={{
              padding: spacing.md,
              borderRadius: borderRadius.sm,
              background: colors.primary,
              color: colors.card,
              border: 'none',
              ...typography.button,
              minHeight: 48,
              cursor: 'pointer',
              marginTop: spacing.sm,
            }}
          >{isSignup ? 'Sign Up' : 'Login'}</button>

          <button
            onClick={() => setIsSignup(!isSignup)}
            style={{
              padding: spacing.sm,
              borderRadius: borderRadius.sm,
              background: 'transparent',
              color: colors.primary,
              border: 'none',
              ...typography.body,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >{isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}</button>
        </div>

        <div style={{ marginTop: spacing.lg, paddingTop: spacing.md, borderTop: `1px solid ${colors.border}` }}>
          <p style={{ ...typography.small, color: colors.textSecondary, textAlign: 'center' }}>
            Demo: Try sarah@chen.com as Commander
          </p>
        </div>
      </div>
    </div>
  );
}
