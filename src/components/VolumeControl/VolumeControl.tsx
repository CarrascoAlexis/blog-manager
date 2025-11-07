import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './VolumeControl.css';

/**
 * VolumeControl component for adjusting theme music volume
 * Only visible when a theme with background music is active (Christmas or Halloween)
 * Provides volume slider and mute/unmute functionality
 */
function VolumeControl() {
    // Access theme context for current theme, volume, and volume setter
    const { theme, volume, setVolume } = useContext(ThemeContext);
    // Track whether volume controls are expanded (slider visible)
    const [isOpen, setIsOpen] = useState(false);

    // Only show volume control when a theme with music is active
    if (theme !== 'christmass' && theme !== 'halloween') {
        return null;
    }

    /**
     * Handle volume slider change
     * @param {React.ChangeEvent<HTMLInputElement>} e - Change event from range input
     */
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
    };

    /**
     * Toggle mute/unmute
     * Muted = volume 0, unmuted = volume 0.3 (30%)
     */
    const toggleMute = () => {
        setVolume(volume > 0 ? 0 : 0.3);
    };

    /**
     * Get appropriate volume icon based on current volume level
     * @returns {string} - Material icon name
     */
    const getVolumeIcon = () => {
        if (volume === 0) return 'volume_off';      // Muted
        if (volume < 0.5) return 'volume_down';      // Low volume
        return 'volume_up';                          // High volume
    };

    return (
        <div className="volume-control">
            {/* Button to toggle volume controls visibility */}
            <button
                className="volume-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Volume control"
                title={`Volume: ${Math.round(volume * 100)}%`}
            >
                {/* Dynamic volume icon based on current level */}
                <span className="material-symbols-outlined">{getVolumeIcon()}</span>
            </button>
            {/* Volume controls panel - only visible when isOpen is true */}
            {isOpen && (
                <div className="volume-slider-container">
                    {/* Range slider for precise volume control (0.00 to 1.00) */}
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                        aria-label="Volume slider"
                    />
                    {/* Quick mute/unmute button */}
                    <button
                        className="mute-button"
                        onClick={toggleMute}
                        aria-label={volume > 0 ? 'Mute' : 'Unmute'}
                    >
                        <span className="material-symbols-outlined">
                            {volume > 0 ? 'volume_off' : 'volume_up'}
                        </span>
                        <span>{volume > 0 ? 'Mute' : 'Unmute'}</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default VolumeControl;
