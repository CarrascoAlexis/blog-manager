// Define all available theme modes as a constant object
// 'as const' makes values literal types instead of string type
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

// Create a union type from all values in ThemeMode object
// This allows TypeScript to know all possible theme values
export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

/**
 * Type definition for the Theme Context
 * Describes the shape of data and functions available through ThemeContext
 */
export type ThemeContextType = {
    theme: ThemeMode; // Current active theme
    toggleTheme: (theme: ThemeMode) => void; // Function to change the theme
    volume: number; // Music volume level (0-1)
    setVolume: (volume: number) => void; // Function to adjust volume
};
