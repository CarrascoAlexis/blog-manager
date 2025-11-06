import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './VolumeControl.css';

function VolumeControl() {
    const { theme, volume, setVolume } = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);

    // Only show volume control when a theme with music is active
    if (theme !== 'christmass' && theme !== 'halloween') {
        return null;
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
    };

    const toggleMute = () => {
        setVolume(volume > 0 ? 0 : 0.3);
    };

    const getVolumeIcon = () => {
        if (volume === 0) return 'volume_off';
        if (volume < 0.5) return 'volume_down';
        return 'volume_up';
    };

    return (
        <div className="volume-control">
            <button
                className="volume-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Volume control"
                title={`Volume: ${Math.round(volume * 100)}%`}
            >
                <span className="material-symbols-outlined">{getVolumeIcon()}</span>
            </button>
            {isOpen && (
                <div className="volume-slider-container">
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
