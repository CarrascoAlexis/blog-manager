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
                            {/* Radial strands from corner */}
                            <line x1="0" y1="0" x2="50" y2="50" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="0" y1="0" x2="30" y2="50" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="0" y1="0" x2="50" y2="30" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="0" y1="0" x2="20" y2="50" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="0" y1="0" x2="50" y2="20" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="0" y1="0" x2="10" y2="50" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="0" y1="0" x2="50" y2="10" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            {/* Concentric web circles */}
                            <path d="M 8,8 Q 8,25 13,35 Q 20,42 30,42 Q 38,42 42,35 Q 47,25 47,15" 
                                  stroke="rgba(200,200,200,0.35)" strokeWidth="0.8" fill="none"/>
                            <path d="M 15,15 Q 15,30 20,37 Q 25,42 33,42 Q 40,42 42,37 Q 45,30 45,22" 
                                  stroke="rgba(200,200,200,0.35)" strokeWidth="0.8" fill="none"/>
                            <path d="M 22,22 Q 22,32 26,38 Q 30,42 36,42 Q 41,42 42,38 Q 44,32 44,28" 
                                  stroke="rgba(200,200,200,0.35)" strokeWidth="0.8" fill="none"/>
                            <path d="M 30,30 Q 30,35 32,38 Q 34,40 38,40 Q 41,40 42,38 Q 43,35 43,33" 
                                  stroke="rgba(200,200,200,0.35)" strokeWidth="0.8" fill="none"/>
                        </svg>
                        {/* Animated spider with legs */}
                        <div className="spider spider-1" aria-hidden="true">
                            <div className="spider-eyes">
                                <div className="spider-eye spider-eye-left"></div>
                                <div className="spider-eye spider-eye-right"></div>
                            </div>
                            <div className="spider-mouth"></div>
                            <div className="spider-legs">
                                <div className="spider-leg spider-leg-1"></div>
                                <div className="spider-leg spider-leg-2"></div>
                                <div className="spider-leg spider-leg-3"></div>
                                <div className="spider-leg spider-leg-4"></div>
                                <div className="spider-leg spider-leg-5"></div>
                                <div className="spider-leg spider-leg-6"></div>
                                <div className="spider-leg spider-leg-7"></div>
                                <div className="spider-leg spider-leg-8"></div>
                            </div>
                        </div>
                    </div>
                    <div className="spider-web top-right">
                        <svg viewBox="0 0 100 100" className="web-svg" aria-hidden="true">
                            {/* Radial strands from corner (mirrored) */}
                            <line x1="100" y1="0" x2="50" y2="50" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="100" y1="0" x2="70" y2="50" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="100" y1="0" x2="50" y2="30" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="100" y1="0" x2="80" y2="50" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="100" y1="0" x2="50" y2="20" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="100" y1="0" x2="90" y2="50" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            <line x1="100" y1="0" x2="50" y2="10" stroke="rgba(200,200,200,0.4)" strokeWidth="1"/>
                            {/* Concentric web circles (mirrored) */}
                            <path d="M 92,8 Q 92,25 87,35 Q 80,42 70,42 Q 62,42 58,35 Q 53,25 53,15" 
                                  stroke="rgba(200,200,200,0.35)" strokeWidth="0.8" fill="none"/>
                            <path d="M 85,15 Q 85,30 80,37 Q 75,42 67,42 Q 60,42 58,37 Q 55,30 55,22" 
                                  stroke="rgba(200,200,200,0.35)" strokeWidth="0.8" fill="none"/>
                            <path d="M 78,22 Q 78,32 74,38 Q 70,42 64,42 Q 59,42 58,38 Q 56,32 56,28" 
                                  stroke="rgba(200,200,200,0.35)" strokeWidth="0.8" fill="none"/>
                            <path d="M 70,30 Q 70,35 68,38 Q 66,40 62,40 Q 59,40 58,38 Q 57,35 57,33" 
                                  stroke="rgba(200,200,200,0.35)" strokeWidth="0.8" fill="none"/>
                        </svg>
                        <div className="spider spider-2" aria-hidden="true">
                            <div className="spider-eyes">
                                <div className="spider-eye spider-eye-left"></div>
                                <div className="spider-eye spider-eye-right"></div>
                            </div>
                            <div className="spider-mouth"></div>
                            <div className="spider-legs">
                                <div className="spider-leg spider-leg-1"></div>
                                <div className="spider-leg spider-leg-2"></div>
                                <div className="spider-leg spider-leg-3"></div>
                                <div className="spider-leg spider-leg-4"></div>
                                <div className="spider-leg spider-leg-5"></div>
                                <div className="spider-leg spider-leg-6"></div>
                                <div className="spider-leg spider-leg-7"></div>
                                <div className="spider-leg spider-leg-8"></div>
                            </div>
                        </div>
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
