export const colors = {
  primary: '#1E40AF',
  primaryLight: '#3B82F6',
  secondary: '#10B981',
  alert: '#EF4444',
  warning: '#F59E0B',
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  heading: { fontSize: 20, fontWeight: 700 },
  subheading: { fontSize: 16, fontWeight: 600 },
  body: { fontSize: 14, fontWeight: 400 },
  small: { fontSize: 12, fontWeight: 400 },
  button: { fontSize: 16, fontWeight: 700, textTransform: 'uppercase' as const },
  helperLabel: { fontSize: 18, fontWeight: 700 },
};

export const statusColors: Record<string, string> = {
  pending: colors.warning,
  accepted: colors.primary,
  in_progress: colors.primaryLight,
  arrived: colors.secondary,
  done: colors.secondary,
};

export const priorityColors: Record<string, string> = {
  high: colors.alert,
  medium: colors.warning,
  low: colors.secondary,
};

export const taskTypeLabels: Record<string, string> = {
  pickup: 'Pickup',
  dropoff: 'Dropoff',
  homework: 'Homework',
  errand: 'Errand',
  tuition: 'Tuition',
  meal: 'Meal',
  shopping: 'Shopping',
};

export const taskTypeColors: Record<string, string> = {
  pickup: '#3B82F6',
  dropoff: '#8B5CF6',
  homework: '#10B981',
  errand: '#F59E0B',
  tuition: '#8B5CF6',
  meal: '#EF4444',
  shopping: '#06B6D4',
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const shadow = {
  card: `0 2px 8px ${colors.shadow}`,
  elevated: `0 4px 16px ${colors.shadow}`,
};

export const touchTarget = {
  min: 44,
  large: 56,
};
