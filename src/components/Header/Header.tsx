import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Header.css';

import type { ThemeMode } from '../../shared/types';
import { ThemeMode as ThemeModeEnum } from '../../shared/types';
import { ThemeContext } from '../../contexts/ThemeContext';

// Array of all available themes for the dropdown
const THEMES: ThemeMode[] = Object.values(ThemeModeEnum) as ThemeMode[];

/**
 * Header component that appears at the top of every page
 * Provides navigation, theme switcher, and mobile menu functionality
 */
function Header() {
    // Access theme context for current theme and toggle function
    const { theme, toggleTheme } = useContext(ThemeContext);
    // Track mobile menu open/closed state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    /**
     * Handle theme selection change
     * @param {React.ChangeEvent<HTMLSelectElement>} e - Change event from select element
     */
    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value as ThemeMode;
        toggleTheme(newTheme);
    };

    /**
     * Toggle mobile menu open/closed
     */
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    /**
     * Close mobile menu (used when a nav link is clicked)
     */
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header">
            {/* Brand/logo link to home */}
            <Link to="/" className="header-brand">
                <span className="material-symbols-outlined header-brand-icon">article</span>
                <span className="header-brand-text">Blog Manager</span>
            </Link>

            {/* Mobile menu toggle button (hamburger/close icon) */}
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

            {/* Navigation menu - includes mobile-open class on mobile when menu is open */}
            <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                {/* Home link */}
                <Link to="/" className="header-nav-link" onClick={closeMobileMenu}>
                    <span className="material-symbols-outlined">home</span>
                    <span>Home</span>
                </Link>
                {/* Articles link */}
                <Link to="/articles" className="header-nav-link" onClick={closeMobileMenu}>
                    <span className="material-symbols-outlined">article</span>
                    <span>Articles</span>
                </Link>
                {/* New article link with special styling */}
                <Link to="/new" className="header-nav-link new-article-btn" onClick={closeMobileMenu}>
                    <span className="material-symbols-outlined">add</span>
                    <span>New Article</span>
                </Link>
                {/* Theme switcher dropdown */}
                <div className="header-theme-switcher">
                    <select
                        value={theme}
                        onChange={handleThemeChange}
                        aria-label="Select theme"
                        className="theme-select"
                    >
                        {/* Render option for each theme, capitalize and format name */}
                        {THEMES.map((t) => (
                            <option key={t} value={t}>
                                {t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ')}
                            </option>
                        ))}
                    </select>
                </div>
            </nav>

            {/* Semi-transparent overlay when mobile menu is open - clicking it closes menu */}
            {isMobileMenuOpen && (
                <div className="mobile-overlay" onClick={closeMobileMenu} aria-hidden="true" />
            )}
        </header>
    );
}

export default Header;
