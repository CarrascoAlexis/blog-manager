import { Link } from 'react-router-dom';
import './ArticleNotFound.css';

/**
 * ArticleNotFound component displayed when an article ID doesn't exist
 * Shows a friendly error message with a link back to articles list
 */
function ArticleNotFound() {
    return (
        <div className="article-not-found">
            {/* Large article icon to indicate missing content */}
            <span className="material-symbols-outlined not-found-icon">article</span>
            {/* Error heading */}
            <h1>Article Not Found</h1>
            {/* Helpful message explaining the issue */}
            <p>The article you're looking for doesn't exist or has been removed.</p>
            {/* Link back to articles listing */}
            <Link to="/articles" className="back-link">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Articles
            </Link>
        </div>
    );
}

export default ArticleNotFound;
