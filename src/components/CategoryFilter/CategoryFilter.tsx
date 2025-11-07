import './CategoryFilter.css';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="category-filters">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
