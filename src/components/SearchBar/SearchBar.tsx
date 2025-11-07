import './SearchBar.css';

/**
 * Props interface for SearchBar component
 */
interface SearchBarProps {
    searchTerm: string; // Current search value
    onSearchChange: (value: string) => void; // Callback when search changes
}

/**
 * SearchBar component for filtering articles by text
 * Displays a search icon and input field for real-time search
 * 
 * @param {SearchBarProps} props - Component props
 */
function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
        <div className="search-box">
            {/* Material Symbols search icon */}
            <span className="material-symbols-outlined search-icon">search</span>
            {/* Search input with controlled value */}
            <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
        </div>
    );
}

export default SearchBar;
