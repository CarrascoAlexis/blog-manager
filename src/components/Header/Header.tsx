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
        <header className="header" role="banner">
            {/* Brand/logo link to home */}
            <Link to="/" className="header-brand" aria-label="Blog Manager - Home">
                <span className="material-symbols-outlined header-brand-icon" aria-hidden="true">article</span>
                <span className="header-brand-text">Blog Manager</span>
            </Link>

            {/* Mobile menu toggle button (hamburger/close icon) */}
            <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="main-navigation"
            >
                <span className="material-symbols-outlined" aria-hidden="true">
                    {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
            </button>

            {/* Navigation menu - includes mobile-open class on mobile when menu is open */}
            <nav 
                id="main-navigation"
                className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Home link */}
                <Link to="/" className="header-nav-link" onClick={closeMobileMenu} aria-label="Navigate to Home">
                    <span className="material-symbols-outlined" aria-hidden="true">home</span>
                    <span>Home</span>
                </Link>
                {/* Articles link */}
                <Link to="/articles" className="header-nav-link" onClick={closeMobileMenu} aria-label="View all articles">
                    <span className="material-symbols-outlined" aria-hidden="true">article</span>
                    <span>Articles</span>
                </Link>
                {/* New article link with special styling */}
                <Link to="/new" className="header-nav-link new-article-btn" onClick={closeMobileMenu} aria-label="Create new article">
                    <span className="material-symbols-outlined" aria-hidden="true">add</span>
                    <span>New Article</span>
                </Link>
                {/* Theme switcher dropdown */}
                <div className="header-theme-switcher">
                    <label htmlFor="theme-select" className="visually-hidden">Select theme</label>
                    <select
                        id="theme-select"
                        value={theme}
                        onChange={handleThemeChange}
                        aria-label="Select color theme"
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
                <div 
                    className="mobile-menu-overlay" 
                    onClick={closeMobileMenu}
                    role="presentation"
                    aria-hidden="true"
                ></div>
            )}
        </header>
    );
}

export default Header;
