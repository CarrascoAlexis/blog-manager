import type { Article } from '../../shared/interfaces';
import './ArticleHeader.css';

interface ArticleHeaderProps {
    article: Article;
}

function ArticleHeader({ article }: ArticleHeaderProps) {
    return (
        <header className="article-header">
            <div className="article-category-badge" style={{ backgroundColor: article.category.color }}>
                {article.category.name}
            </div>
            <h1 className="article-detail-title">{article.title}</h1>
            <p className="article-detail-excerpt">{article.excerpt}</p>
            
            <div className="article-detail-meta">
                <div className="meta-item">
                    <span className="material-symbols-outlined">person</span>
                    <span>{article.author}</span>
                </div>
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
                <div className="meta-item">
                    <span className="material-symbols-outlined">schedule</span>
                    <span>{article.readTime}</span>
                </div>
            </div>
        </header>
    );
}

export default ArticleHeader;
