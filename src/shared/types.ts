export const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
  SOLARIZED: 'solarized',
  HIGH_CONTRAST: 'high-contrast',
  SEPIA: 'sepia',
  NIGHT_MODE: 'night-mode',
  CUSTOM: 'custom',
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];
