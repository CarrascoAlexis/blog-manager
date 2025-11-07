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
        <div className="search-box" role="search">
            {/* Material Symbols search icon */}
            <span className="material-symbols-outlined search-icon" aria-hidden="true">search</span>
            {/* Search input with controlled value */}
            <label htmlFor="article-search" className="visually-hidden">Search articles</label>
            <input
                id="article-search"
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
                aria-label="Search articles by title, content, or author"
            />
        </div>
    );
}

export default SearchBar;
