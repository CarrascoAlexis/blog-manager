import './SearchBar.css';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
        <div className="search-box">
            <span className="material-symbols-outlined search-icon">search</span>
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
