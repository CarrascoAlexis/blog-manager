import { Link } from 'react-router-dom';
import type { ArticleCardProps } from '../../shared/interfaces';
import './ArticleCard.css';

/**
 * ArticleCard component that displays a preview card for an article
 * Shows category badge, title, excerpt, and metadata (author, date, read time)
 * Clicking the title navigates to the full article detail page
 * 
 * @param {ArticleCardProps} props - Component props containing article data
 */
function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="article-card">
            {/* Category badge with custom color */}
            <div className="article-category" style={{ backgroundColor: article.category.color }}>
                {article.category.name}
            </div>
            {/* Article title as clickable link */}
            <h2 className="article-title">
                <Link to={`/articles/${article.id}`}>
                    {article.title}
                </Link>
            </h2>
            {/* Short excerpt/preview */}
            <p className="article-excerpt">{article.excerpt}</p>
            {/* Metadata row with author, date, and read time */}
            <div className="article-meta">
                {/* Author info with icon */}
                <div className="article-author">
                    <span className="material-symbols-outlined">person</span>
                    {article.author}
                </div>
                {/* Publication date with icon */}
                <div className="article-date">
                    <span className="material-symbols-outlined">calendar_today</span>
                    {new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                    })}
                </div>
                {/* Estimated read time with icon */}
                <div className="article-read-time">
                    <span className="material-symbols-outlined">schedule</span>
                    {article.readTime}
                </div>
            </div>
        </article>
    );
}

export default ArticleCard;
