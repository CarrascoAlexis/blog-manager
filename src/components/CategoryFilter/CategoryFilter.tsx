import './CategoryFilter.css';

/**
 * Props interface for CategoryFilter component
 */
interface CategoryFilterProps {
    categories: string[]; // List of available categories
    selectedCategory: string; // Currently selected category
    onCategoryChange: (category: string) => void; // Callback when category changes
}

/**
 * CategoryFilter component for filtering articles by category
 * Displays buttons for each category with active state styling
 * 
 * @param {CategoryFilterProps} props - Component props
 */
function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="category-filters">
            {/* Render a button for each category */}
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    // Add 'active' class to currently selected category
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
