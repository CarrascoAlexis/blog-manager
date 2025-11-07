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
            <div 
                className="article-category-badge" 
                style={{ backgroundColor: article.category.color }}
                role="note"
                aria-label={`Category: ${article.category.name}`}
            >
                {article.category.name}
            </div>
            {/* Article title */}
            <h1 className="article-detail-title">{article.title}</h1>
            {/* Article excerpt/summary */}
            <p className="article-detail-excerpt">{article.excerpt}</p>
            
            {/* Metadata row */}
            <div className="article-detail-meta" role="group" aria-label="Article information">
                {/* Author with icon */}
                <div className="meta-item">
                    <span className="material-symbols-outlined" aria-hidden="true">person</span>
                    <span aria-label={`Written by ${article.author}`}>{article.author}</span>
                </div>
                {/* Publication date with icon (formatted as "Month Day, Year") */}
                <div className="meta-item">
                    <span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>
                    <time dateTime={article.date} aria-label={`Published on ${new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}>
                        {new Date(article.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                        })}
                    </time>
                </div>
                {/* Estimated read time with icon */}
                <div className="meta-item">
                    <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
                    <span aria-label={`Reading time: ${article.readTime}`}>{article.readTime}</span>
                </div>
            </div>
        </header>
    );
}

export default ArticleHeader;
