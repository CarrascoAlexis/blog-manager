export const ThemeMode = {
    LIGHT: 'light',
    DARK: 'dark',
    HALLOWEEN: 'halloween',
    CHRISTMASS: 'christmass',
    FRANCE: 'france',
    SOLARIZED: 'solarized',
    HIGH_CONTRAST: 'high-contrast',
    SEPIA: 'sepia',
    NIGHT_MODE: 'night-mode',
    CUSTOM: 'custom',
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

export type ThemeContextType = {
    theme: ThemeMode;
    toggleTheme: (theme: ThemeMode) => void;
    volume: number;
    setVolume: (volume: number) => void;
};
