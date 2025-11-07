import type { Article } from '../../shared/interfaces';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleList.css';

interface ArticleListProps {
    articles: Article[];
}

function ArticleList({ articles }: ArticleListProps) {
    if (articles.length === 0) {
        return (
            <div className="no-results">
                <span className="material-symbols-outlined no-results-icon">search_off</span>
                <p>No articles found matching your criteria</p>
            </div>
        );
    }

    return (
        <div className="articles-grid">
            {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}

export default ArticleList;
