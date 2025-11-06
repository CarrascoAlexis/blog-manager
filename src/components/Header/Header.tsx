import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Header.css';

import type { ThemeMode } from '../../shared/types';
import { ThemeMode as ThemeModeEnum } from '../../shared/types';
import { ThemeContext } from '../../contexts/ThemeContext';

const THEMES: ThemeMode[] = Object.values(ThemeModeEnum) as ThemeMode[];

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value as ThemeMode;
        toggleTheme(newTheme);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header">
            <Link to="/" className="header-brand">
                <span className="material-symbols-outlined header-brand-icon">article</span>
                <span className="header-brand-text">Blog Manager</span>
            </Link>

            <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
            >
                <span className="material-symbols-outlined">
                    {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
            </button>

            <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <Link to="/" className="header-nav-link" onClick={closeMobileMenu}>
                    <span className="material-symbols-outlined">home</span>
                    <span>Home</span>
                </Link>
                <Link to="/articles" className="header-nav-link" onClick={closeMobileMenu}>
                    <span className="material-symbols-outlined">article</span>
                    <span>Articles</span>
                </Link>
                <div className="header-theme-switcher">
                    <select
                        value={theme}
                        onChange={handleThemeChange}
                        aria-label="Select theme"
                        className="theme-select"
                    >
                        {THEMES.map((t) => (
                            <option key={t} value={t}>
                                {t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ')}
                            </option>
                        ))}
                    </select>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="mobile-overlay" onClick={closeMobileMenu} aria-hidden="true" />
            )}
        </header>
    );
}

export default Header;
