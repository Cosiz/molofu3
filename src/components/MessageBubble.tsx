import React from 'react';
import { theme } from '../theme';

interface MessageBubbleProps { text: string; isOwn: boolean; timestamp: string; read?: boolean; }

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isOwn, timestamp, read }) => (
  <div style={{ display: 'flex', justifyContent: isOwn ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
    <div style={{ maxWidth: '75%', padding: '8px 12px', borderRadius: 12, background: isOwn ? theme.colors.info : theme.colors.surface, color: isOwn ? '#fff' : theme.colors.textPrimary, borderBottomRightRadius: isOwn ? 4 : 12, borderBottomLeftRadius: isOwn ? 12 : 4, boxShadow: theme.shadows.card }}>
      <div style={{ fontSize: 14, lineHeight: 1.4 }}>{text}</div>
      <div style={{ fontSize: 10, marginTop: 4, opacity: 0.7, textAlign: 'right' }}>{timestamp}{isOwn && read && ' ✓✓'}</div>
    </div>
  </div>
);
