import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './Footer.css';

/**
 * Footer component that appears at the bottom of every page
 * Displays themed decorations for Halloween and Christmas themes
 * Shows copyright information and project attribution
 */
function Footer() {
    // Get current theme from context
    const { theme } = useContext(ThemeContext);
    // Check if special themes are active
    const isHalloween = theme === 'halloween';
    const isChristmas = theme === 'christmass';
    // Track clicked state for interactive elements
    const [isStarClicked, setIsStarClicked] = useState(false);
    const [clickedPumpkin, setClickedPumpkin] = useState<number | null>(null);

    /**
     * Handle Christmas tree star click animation
     */
    const handleStarClick = () => {
        setIsStarClicked(true);
        // Reset after 1 second
        setTimeout(() => setIsStarClicked(false), 1000);
    };

    /**
     * Handle Halloween pumpkin click animation
     * @param {number} index - Pumpkin identifier (1-3)
     */
    const handlePumpkinClick = (index: number) => {
        setClickedPumpkin(index);
        // Reset after 800ms
        setTimeout(() => setClickedPumpkin(null), 800);
    };

    return (
        <footer className="footer" role="contentinfo">
            {/* Halloween theme decorations - only visible when Halloween theme active */}
            {isHalloween && (
                <div role="presentation" aria-hidden="true">
                    {/* Spider webs in top corners */}
                    <div className="spider-web top-left">
                        {/* SVG spider web graphic */}
                        <svg viewBox="0 0 100 100" className="web-svg" aria-hidden="true">
                            <path d="M0,0 L50,50 M0,20 Q25,25 50,50 M0,40 Q25,42 50,50 M20,0 Q25,25 50,50 M40,0 Q42,25 50,50" 
                                  stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"/>
                        </svg>
                        {/* Animated spider */}
                        <div className="spider spider-1"></div>
                    </div>
                    <div className="spider-web top-right">
                        <svg viewBox="0 0 100 100" className="web-svg" aria-hidden="true">
                            <path d="M100,0 L50,50 M100,20 Q75,25 50,50 M100,40 Q75,42 50,50 M80,0 Q75,25 50,50 M60,0 Q58,25 50,50" 
                                  stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"/>
                        </svg>
                        <div className="spider spider-2"></div>
                    </div>
                    
                    {/* Interactive clickable pumpkins */}
                    <div className="halloween-pumpkins">
                        <button 
                            className={`pumpkin pumpkin-1 ${clickedPumpkin === 1 ? 'pumpkin-clicked' : ''}`}
                            onClick={() => handlePumpkinClick(1)}
                            aria-label="Decorative pumpkin 1"
                        >
                            🎃
                        </button>
                        <button 
                            className={`pumpkin pumpkin-2 ${clickedPumpkin === 2 ? 'pumpkin-clicked' : ''}`}
                            onClick={() => handlePumpkinClick(2)}
                            aria-label="Decorative pumpkin 2"
                        >
                            🎃
                        </button>
                        <button 
                            className={`pumpkin pumpkin-3 ${clickedPumpkin === 3 ? 'pumpkin-clicked' : ''}`}
                            onClick={() => handlePumpkinClick(3)}
                            aria-label="Decorative pumpkin 3"
                        >
                            🎃
                        </button>
                    </div>
                </div>
            )}

            {/* Christmas theme decorations - only visible when Christmas theme active */}
            {isChristmas && (
                <div role="presentation" aria-hidden="true">
                    {/* Decorative garland across top */}
                    <div className="christmas-garland">
                        <div className="garland-strand"></div>
                        {/* Colorful ornaments hanging from garland */}
                        <div className="ornament ornament-1">🔴</div>
                        <div className="ornament ornament-2">🟡</div>
                        <div className="ornament ornament-3">🔵</div>
                        <div className="ornament ornament-4">🟢</div>
                        <div className="ornament ornament-5">🔴</div>
                        <div className="ornament ornament-6">🟡</div>
                    </div>
                    
                    {/* Christmas tree on left side */}
                    <div className="christmas-tree">
                        <button 
                            className={`tree-star ${isStarClicked ? 'star-clicked' : ''}`}
                            onClick={handleStarClick}
                            aria-label="Decorative Christmas tree star"
                        >
                            ⭐
                        </button>
                        <div className="tree-top">🌲</div>
                    </div>

                    {/* Falling snowflakes */}
                    <div className="snowflakes" aria-hidden="true">
                        <div className="snowflake snowflake-1">❄️</div>
                        <div className="snowflake snowflake-2">❅</div>
                        <div className="snowflake snowflake-3">❆</div>
                        <div className="snowflake snowflake-4">❄️</div>
                        <div className="snowflake snowflake-5">❅</div>
                        <div className="snowflake snowflake-6">❆</div>
                        <div className="snowflake snowflake-7">❄️</div>
                        <div className="snowflake snowflake-8">❅</div>
                        <div className="snowflake snowflake-9">❆</div>
                        <div className="snowflake snowflake-10">❄️</div>
                        <div className="snowflake snowflake-11">❅</div>
                        <div className="snowflake snowflake-12">❆</div>
                        <div className="snowflake snowflake-13">❄️</div>
                        <div className="snowflake snowflake-14">❅</div>
                        <div className="snowflake snowflake-15">❆</div>
                    </div>
                </div>
            )}
            
            <div className="footer-content">
                <p className="footer-text">
                    © {new Date().getFullYear()} Blog Manager. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
