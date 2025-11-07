import type { Article } from '../../shared/interfaces';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleList.css';

/**
 * Props interface for ArticleList component
 */
interface ArticleListProps {
    articles: Article[]; // Array of articles to display
}

/**
 * ArticleList component that displays a grid of article cards
 * Shows a "no results" message when the articles array is empty
 * 
 * @param {ArticleListProps} props - Component props
 */
function ArticleList({ articles }: ArticleListProps) {
    // Show empty state when no articles match filters
    if (articles.length === 0) {
        return (
            <div className="no-results">
                <span className="material-symbols-outlined no-results-icon">search_off</span>
                <p>No articles found matching your criteria</p>
            </div>
        );
    }

    // Render grid of article cards
    return (
        <div className="articles-grid">
            {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}

export default ArticleList;
