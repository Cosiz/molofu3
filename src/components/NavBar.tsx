import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../theme';

const navItems = [
  { path: '/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/tasks', icon: '📋', label: 'Tasks' },
  { path: '/messages', icon: '💬', label: 'Messages' },
  { path: '/schedule', icon: '📅', label: 'Schedule' },
  { path: '/settings', icon: '⚙️', label: 'Settings' },
];

export const NavBar: React.FC = () => {
  const location = useLocation();
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 60, background: theme.colors.primary, display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000, borderTop: `1px solid ${theme.colors.secondary}` }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
        return (
          <Link key={item.path} to={item.path} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none', color: isActive ? theme.colors.accent : 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: isActive ? 700 : 400, padding: '4px 8px' }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
