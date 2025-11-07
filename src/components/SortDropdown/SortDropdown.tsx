import './SortDropdown.css';

// Type definition for sorting options
// Can sort by name (ascending/descending) or date (newest/oldest)
export type SortOption = 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest';

/**
 * Props interface for SortDropdown component
 */
interface SortDropdownProps {
    sortBy: SortOption; // Current sort option
    onSortChange: (value: SortOption) => void; // Callback when sort changes
}

/**
 * SortDropdown component for selecting article sort order
 * Provides options to sort by name or date in ascending/descending order
 * 
 * @param {SortDropdownProps} props - Component props
 */
function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
    return (
        <div className="sort-box">
            {/* Material Symbols sort icon */}
            <span className="material-symbols-outlined sort-icon">sort</span>
            {/* Dropdown select with sort options */}
            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="sort-select"
            >
                <option value="date-newest">Date: Newest First</option>
                <option value="date-oldest">Date: Oldest First</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
            </select>
        </div>
    );
}

export default SortDropdown;
