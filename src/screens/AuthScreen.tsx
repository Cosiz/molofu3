import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { theme } from '../theme';
import { mockUsers } from '../mocks/data';

export const AuthScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useStore();
  const [email, setEmail] = useState('sarah@example.com');
  const [password, setPassword] = useState('password');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    if (!email || !password) return;
    const user = mockUsers.find((u) => u.email === email) || mockUsers[0];
    setCurrentUser(user);
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, color: '#fff' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🏠</div>
      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Family Command Centre</div>
      <div style={{ fontSize: 15, opacity: 0.7, marginBottom: 32, textAlign: 'center' }}>Molofu3 — One app to coordinate your family</div>
      <div style={{ width: '100%', maxWidth: 360, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: theme.borderRadius.lg, padding: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{isLogin ? 'Sign In' : 'Create Account'}</div>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ width: '100%', padding: '12px 14px', borderRadius: theme.borderRadius.md, border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: 12 }} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', padding: '12px 14px', borderRadius: theme.borderRadius.md, border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: 20 }} />
        <button onClick={handleAuth} style={{ width: '100%', padding: 14, borderRadius: theme.borderRadius.md, border: 'none', background: theme.colors.accent, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>{isLogin ? 'Sign In' : 'Create Account'}</button>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, opacity: 0.7 }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: theme.colors.accent, fontWeight: 700, cursor: 'pointer' }}>{isLogin ? 'Sign Up' : 'Sign In'}</span>
        </div>
      </div>
    </div>
  );
};
