import './SortDropdown.css';

export type SortOption = 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest';

interface SortDropdownProps {
    sortBy: SortOption;
    onSortChange: (value: SortOption) => void;
}

function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
    return (
        <div className="sort-box">
            <span className="material-symbols-outlined sort-icon">sort</span>
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
