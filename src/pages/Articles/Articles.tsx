import { useState } from 'react';
import type { Article } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import './Articles.css';

function Articles() {
    const [articles] = useLocalStorage<Article[]>('blog-articles', []);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(articles.map(article => article.category.name))];

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || article.category.name === selectedCategory;
        return matchesSearch && matchesCategory;
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
                <div className="search-box">
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="articles-grid">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))
                ) : (
                    <div className="no-results">
                        <span className="material-symbols-outlined no-results-icon">search_off</span>
                        <p>No articles found matching your criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Articles;
