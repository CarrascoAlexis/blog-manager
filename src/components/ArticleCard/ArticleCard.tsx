import { Link } from 'react-router-dom';
import type { ArticleCardProps } from '../../shared/interfaces';
import './ArticleCard.css';

function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="article-card">
            <div className="article-category" style={{ backgroundColor: article.category.color }}>
                {article.category.name}
            </div>
            <h2 className="article-title">
                <Link to={`/articles/${article.id}`}>
                    {article.title}
                </Link>
            </h2>
            <p className="article-excerpt">{article.excerpt}</p>
            <div className="article-meta">
                <div className="article-author">
                    <span className="material-symbols-outlined">person</span>
                    {article.author}
                </div>
                <div className="article-date">
                    <span className="material-symbols-outlined">calendar_today</span>
                    {new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                    })}
                </div>
                <div className="article-read-time">
                    <span className="material-symbols-outlined">schedule</span>
                    {article.readTime}
                </div>
            </div>
        </article>
    );
}

export default ArticleCard;
