import { createContext, useState, useEffect, useRef } from 'react';

import type { ThemeMode, ThemeContextType } from '../shared/types';
import type { ThemeProviderProps } from '../shared/interfaces';

// Create Theme Context with default values
// This context will be used to share theme state across all components
export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {},
    volume: 0.3,
    setVolume: () => {},
});

/**
 * ThemeProvider component that manages global theme state and background music
 * Handles theme switching, music playback for seasonal themes, and volume control
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
    // Initialize theme from localStorage or default to 'light'
    const [theme, setTheme] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('theme') as ThemeMode | null;
        return saved || 'light';
    });
    
    // Initialize volume from localStorage or default to 0.3 (30%)
    const [volume, setVolumeState] = useState<number>(() => {
        const saved = localStorage.getItem('musicVolume');
        return saved ? parseFloat(saved) : 0.3;
    });
    
    // Track transition animation state
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    // Reference to audio element for theme music
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Effect runs when theme or volume changes
    useEffect(() => {
        // Apply theme to document root for CSS variables
        document.documentElement.setAttribute('data-theme', theme);

        // Map of themes to their music files
        const musicFiles: Record<string, string> = {
            christmass: '/src/assets/musics/all_i_want_for_christmas_is_you.mp3',
            halloween: '/src/assets/musics/this_is_halloween.mp3',
        };

        const musicFile = musicFiles[theme];

        if (musicFile) {
            // If theme has music associated with it
            if (!audioRef.current || audioRef.current.src !== location.origin + musicFile) {
                // Stop current audio if playing different file
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
                // Create new audio element with the correct file
                audioRef.current = new Audio(musicFile);
                audioRef.current.loop = true; // Loop the music
                audioRef.current.volume = volume;
            } else {
                // Same file is already loaded, just update volume
                audioRef.current.volume = volume;
            }
            // Attempt to play audio (may fail due to browser autoplay policies)
            audioRef.current.play().catch((err) => console.log('Audio play failed:', err));
        } else {
            // No music for current theme, stop any playing audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [theme, volume]);

    /**
     * Set volume with validation and persistence
     * @param {number} newVolume - Volume level between 0 and 1
     */
    const setVolume = (newVolume: number) => {
        // Clamp volume between 0 and 1
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        setVolumeState(clampedVolume);
        // Save to localStorage
        localStorage.setItem('musicVolume', clampedVolume.toString());
        // Update audio element if it exists
        if (audioRef.current) {
            audioRef.current.volume = clampedVolume;
        }
    };

    /**
     * Toggle to a new theme with transition animation
     * @param {ThemeMode} newTheme - The theme to switch to
     */
    const toggleTheme = (newTheme: ThemeMode) => {
        // Trigger transition animation overlay
        setIsTransitioning(true);
        
        // Change theme
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Remove transition class after animation completes (500ms)
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, volume, setVolume }}>
            {children}
            {/* Show transition overlay during theme changes */}
            {isTransitioning && <div className="theme-transition-overlay" />}
        </ThemeContext.Provider>
    );
}
