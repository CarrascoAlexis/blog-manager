import { useState } from 'react';
import type { Article } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortDropdown, { type SortOption } from '../../components/SortDropdown/SortDropdown';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ArticleList from '../../components/ArticleList/ArticleList';
import './Articles.css';

function Articles() {
    const [articles] = useLocalStorage<Article[]>('blog-articles', []);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState<SortOption>('date-newest');

    const categories = ['All', ...new Set(articles.map(article => article.category.name))];

    const filteredAndSortedArticles = articles
        .filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || article.category.name === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                case 'date-newest':
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case 'date-oldest':
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                default:
                    return 0;
            }
        });

    return (
        <div className="articles-page">
            <div className="articles-header">
                <h1 className="articles-title">
                    <span className="material-symbols-outlined">article</span>
                    Articles
                </h1>
                <p className="articles-subtitle">
                    Explore our collection of articles on web development, design, and technology
                </p>
            </div>

            <div className="articles-filters">
                <div className="filters-top-row">
                    <SearchBar 
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                    <SortDropdown 
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                </div>

                <CategoryFilter 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </div>

            <ArticleList articles={filteredAndSortedArticles} />
        </div>
    );
}

export default Articles;
