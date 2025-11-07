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
        <article className="article-card" aria-labelledby={`article-title-${article.id}`}>
            {/* Category badge with custom color */}
            <div 
                className="article-category" 
                style={{ backgroundColor: article.category.color }}
                role="note"
                aria-label={`Category: ${article.category.name}`}
            >
                {article.category.name}
            </div>
            {/* Article title as clickable link */}
            <h2 className="article-title" id={`article-title-${article.id}`}>
                <Link to={`/articles/${article.id}`} aria-label={`Read article: ${article.title}`}>
                    {article.title}
                </Link>
            </h2>
            {/* Short excerpt/preview */}
            <p className="article-excerpt">{article.excerpt}</p>
            {/* Metadata row with author, date, and read time */}
            <div className="article-meta" role="group" aria-label="Article metadata">
                {/* Author info with icon */}
                <div className="article-author">
                    <span className="material-symbols-outlined" aria-hidden="true">person</span>
                    <span aria-label={`Author: ${article.author}`}>{article.author}</span>
                </div>
                {/* Publication date with icon */}
                <div className="article-date">
                    <span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>
                    <time dateTime={article.date} aria-label={`Published on ${new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}>
                        {new Date(article.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                        })}
                    </time>
                </div>
                {/* Estimated read time with icon */}
                <div className="article-read-time">
                    <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
                    <span aria-label={`Reading time: ${article.readTime}`}>{article.readTime}</span>
                </div>
            </div>
        </article>
    );
}

export default ArticleCard;
