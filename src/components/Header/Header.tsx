import { Link } from 'react-router-dom';
import { useContext } from 'react';

import type { ThemeMode } from '../../shared/types';
import { ThemeMode as ThemeModeEnum } from '../../shared/types';
import { ThemeContext } from '../../contexts/ThemeContext';

const THEMES: ThemeMode[] = Object.values(ThemeModeEnum) as ThemeMode[];

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value as ThemeMode;
        toggleTheme(newTheme);
    };

    return (
        <header>
            <div>
                <Link to="/">Blog Manager</Link>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <select value={theme} onChange={handleThemeChange} aria-label="Select theme">
                {THEMES.map((t) => (
                    <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                ))}
            </select>
        </header>
    );
}

export default Header;
