import React from 'react';
import { theme } from '../theme';

export const LocationMap: React.FC = () => (
  <div style={{ minHeight: '100vh', background: theme.colors.background, paddingBottom: 80 }}>
    <div style={{ background: theme.colors.primary, padding: '16px', color: '#fff' }}>
      <div style={{ fontSize: 20, fontWeight: 700 }}>Location Tracking</div>
      <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>Real-time helper positions</div>
    </div>
    <div style={{ margin: 16, height: 300, borderRadius: theme.borderRadius.md, background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: theme.shadows.card }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
      <div style={{ fontSize: 16, fontWeight: 600 }}>GPS Tracking Active</div>
      <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>Helper location updates every 10s</div>
    </div>
    <div style={{ padding: '0 16px' }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Active Helpers</div>
      <div style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 14, marginBottom: 8, boxShadow: theme.shadows.card }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><div style={{ fontWeight: 600, fontSize: 15 }}>Maria Santos</div><div style={{ fontSize: 13, color: theme.colors.textSecondary }}>TST → Home</div></div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ background: theme.colors.info, color: '#fff', padding: '2px 8px', borderRadius: theme.borderRadius.pill, fontSize: 11, fontWeight: 600 }}>In Transit</div>
            <div style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 }}>ETA: 12 min</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
