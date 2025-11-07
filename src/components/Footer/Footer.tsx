import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './Footer.css';

function Footer() {
    const { theme } = useContext(ThemeContext);
    const isHalloween = theme === 'halloween';
    const isChristmas = theme === 'christmass';
    const [isStarClicked, setIsStarClicked] = useState(false);
    const [clickedPumpkin, setClickedPumpkin] = useState<number | null>(null);

    const handleStarClick = () => {
        setIsStarClicked(true);
        setTimeout(() => setIsStarClicked(false), 1000);
    };

    const handlePumpkinClick = (index: number) => {
        setClickedPumpkin(index);
        setTimeout(() => setClickedPumpkin(null), 800);
    };

    return (
        <footer className="footer">
            {isHalloween && (
                <>
                    {/* Spider webs in corners */}
                    <div className="spider-web top-left">
                        <svg viewBox="0 0 100 100" className="web-svg">
                            <path d="M0,0 L50,50 M0,20 Q25,25 50,50 M0,40 Q25,42 50,50 M20,0 Q25,25 50,50 M40,0 Q42,25 50,50" 
                                  stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"/>
                        </svg>
                        <div className="spider spider-1"></div>
                    </div>
                    <div className="spider-web top-right">
                        <svg viewBox="0 0 100 100" className="web-svg">
                            <path d="M100,0 L50,50 M100,20 Q75,25 50,50 M100,40 Q75,42 50,50 M80,0 Q75,25 50,50 M60,0 Q58,25 50,50" 
                                  stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"/>
                        </svg>
                        <div className="spider spider-2"></div>
                    </div>
                    
                    {/* Pumpkins on top of footer */}
                    <div className="halloween-pumpkins">
                        <div 
                            className={`pumpkin pumpkin-1 ${clickedPumpkin === 1 ? 'pumpkin-clicked' : ''}`}
                            onClick={() => handlePumpkinClick(1)}
                        >
                            🎃
                        </div>
                        <div 
                            className={`pumpkin pumpkin-2 ${clickedPumpkin === 2 ? 'pumpkin-clicked' : ''}`}
                            onClick={() => handlePumpkinClick(2)}
                        >
                            🎃
                        </div>
                        <div 
                            className={`pumpkin pumpkin-3 ${clickedPumpkin === 3 ? 'pumpkin-clicked' : ''}`}
                            onClick={() => handlePumpkinClick(3)}
                        >
                            🎃
                        </div>
                    </div>
                </>
            )}

            {isChristmas && (
                <>
                    {/* Garland on top */}
                    <div className="christmas-garland">
                        <div className="garland-strand"></div>
                        <div className="ornament ornament-1">🔴</div>
                        <div className="ornament ornament-2">🟡</div>
                        <div className="ornament ornament-3">🔵</div>
                        <div className="ornament ornament-4">🟢</div>
                        <div className="ornament ornament-5">🔴</div>
                        <div className="ornament ornament-6">🟡</div>
                    </div>
                    
                    {/* Christmas tree on left side */}
                    <div className="christmas-tree">
                        <div 
                            className={`tree-star ${isStarClicked ? 'star-clicked' : ''}`}
                            onClick={handleStarClick}
                        >
                            ⭐
                        </div>
                        <div className="tree-top">🌲</div>
                    </div>
                </>
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
