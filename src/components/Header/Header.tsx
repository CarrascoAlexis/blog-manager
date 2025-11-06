import { Link } from 'react-router-dom';
import { useState } from 'react';

import type { ThemeMode } from '../../shared/types';
import { ThemeMode as ThemeModeEnum } from '../../shared/types';
import { useEffect } from 'react';

const THEMES: ThemeMode[] = Object.values(ThemeModeEnum) as ThemeMode[];

function Header() {
  const initial = (localStorage.getItem('theme') as ThemeMode) || THEMES[0] || 'light';
  const [theme, setTheme] = useState<ThemeMode>(initial);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as ThemeMode;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
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
