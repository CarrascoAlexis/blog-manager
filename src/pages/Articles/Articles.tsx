import { useState, useEffect } from 'react';
import type { Article } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortDropdown, { type SortOption } from '../../components/SortDropdown/SortDropdown';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ArticleList from '../../components/ArticleList/ArticleList';
import './Articles.css';

/**
 * Articles page component that displays all articles with filtering and sorting
 * Provides search, category filter, and sort options for browsing articles
 */
function Articles() {
    // Load articles from localStorage
    const [articles] = useLocalStorage<Article[]>('blog-articles', []);
    // Track search term for filtering
    const [searchTerm, setSearchTerm] = useState('');
    // Track selected category for filtering
    const [selectedCategory, setSelectedCategory] = useState('All');
    // Track current sort option
    const [sortBy, setSortBy] = useState<SortOption>('date-newest');

    // Set page title
    useEffect(() => {
        document.title = 'Articles - Blog Manager';
    }, []);

    // Extract unique categories from articles and prepend 'All' option
    const categories = ['All', ...new Set(articles.map(article => article.category.name))];

    // Filter and sort articles based on current state
    const filteredAndSortedArticles = articles
        .filter(article => {
            // Check if article matches search term (in title or excerpt)
            const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            // Check if article matches selected category (or 'All' is selected)
            const matchesCategory = selectedCategory === 'All' || article.category.name === selectedCategory;
            // Article must match both search and category filters
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            // Sort articles based on selected sort option
            switch (sortBy) {
                case 'name-asc':
                    // Sort by title A→Z
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    // Sort by title Z→A
                    return b.title.localeCompare(a.title);
                case 'date-newest':
                    // Sort by date newest first
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case 'date-oldest':
                    // Sort by date oldest first
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                default:
                    return 0;
            }
        });

    return (
        <div className="articles-page">
            {/* Page header with title and description */}
            <header className="articles-header">
                <h1 className="articles-title">
                    <span className="material-symbols-outlined" aria-hidden="true">article</span>
                    Articles
                </h1>
                <p className="articles-subtitle">
                    Explore our collection of articles on web development, design, and technology
                </p>
            </header>

            {/* Filters section */}
            <section className="articles-filters" aria-label="Article filters and sorting">
                {/* Top row: Search and Sort */}
                <div className="filters-top-row">
                    {/* Search bar for text filtering */}
                    <SearchBar 
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                    {/* Sort dropdown for ordering */}
                    <SortDropdown 
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                </div>

                {/* Category filter buttons */}
                <CategoryFilter 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </section>

            {/* Display filtered and sorted articles */}
            <ArticleList articles={filteredAndSortedArticles} />
        </div>
    );
}

export default Articles;
