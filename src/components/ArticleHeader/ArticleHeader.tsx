import type { Article } from '../../shared/interfaces';
import './ArticleHeader.css';

/**
 * Props interface for ArticleHeader component
 */
interface ArticleHeaderProps {
    article: Article; // Article data to display in header
}

/**
 * ArticleHeader component that displays article metadata at the top of detail page
 * Shows category badge, title, excerpt, and metadata (author, date, read time)
 * 
 * @param {ArticleHeaderProps} props - Component props
 */
function ArticleHeader({ article }: ArticleHeaderProps) {
    return (
        <header className="article-header">
            {/* Category badge with custom background color */}
            <div className="article-category-badge" style={{ backgroundColor: article.category.color }}>
                {article.category.name}
            </div>
            {/* Article title */}
            <h1 className="article-detail-title">{article.title}</h1>
            {/* Article excerpt/summary */}
            <p className="article-detail-excerpt">{article.excerpt}</p>
            
            {/* Metadata row */}
            <div className="article-detail-meta">
                {/* Author with icon */}
                <div className="meta-item">
                    <span className="material-symbols-outlined">person</span>
                    <span>{article.author}</span>
                </div>
                {/* Publication date with icon (formatted as "Month Day, Year") */}
                <div className="meta-item">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>
                        {new Date(article.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                        })}
                    </span>
                </div>
                {/* Estimated read time with icon */}
                <div className="meta-item">
                    <span className="material-symbols-outlined">schedule</span>
                    <span>{article.readTime}</span>
                </div>
            </div>
        </header>
    );
}

export default ArticleHeader;
