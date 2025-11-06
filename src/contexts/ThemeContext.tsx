import { createContext, useState, useEffect, useRef } from 'react';

import type { ThemeMode, ThemeContextType } from '../shared/types';
import type { ThemeProviderProps } from '../shared/interfaces';

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {},
    volume: 0.3,
    setVolume: () => {},
});

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('theme') as ThemeMode | null;
        return saved || 'light';
    });
    const [volume, setVolumeState] = useState<number>(() => {
        const saved = localStorage.getItem('musicVolume');
        return saved ? parseFloat(saved) : 0.3;
    });
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);

        // Handle theme music
        const musicFiles: Record<string, string> = {
            christmass: '/src/assets/musics/all_i_want_for_christmas_is_you.mp3',
            halloween: '/src/assets/musics/this_is_halloween.mp3',
        };

        const musicFile = musicFiles[theme];

        if (musicFile) {
            if (!audioRef.current || audioRef.current.src !== location.origin + musicFile) {
                // Stop current audio if playing
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
                // Create new audio with the correct file
                audioRef.current = new Audio(musicFile);
                audioRef.current.loop = true;
                audioRef.current.volume = volume;
            } else {
                audioRef.current.volume = volume;
            }
            audioRef.current.play().catch((err) => console.log('Audio play failed:', err));
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [theme, volume]);

    const setVolume = (newVolume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        setVolumeState(clampedVolume);
        localStorage.setItem('musicVolume', clampedVolume.toString());
        if (audioRef.current) {
            audioRef.current.volume = clampedVolume;
        }
    };

    const toggleTheme = (newTheme: ThemeMode) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, volume, setVolume }}>
            {children}
        </ThemeContext.Provider>
    );
}
