// Central source of truth for brand colors.
// Both the MUI theme (src/styles via ThemeProvider) and Tailwind config
// derive their palette from these values to keep the two systems in sync.

export const COLORS = {
  primary: '#2563EB',
  secondary: '#14B8A6',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F59E0B',
  background: '#F8FAFC',
  backgroundDark: '#0F172A',
};

export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
};

export default COLORS;
