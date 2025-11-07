import { Link } from 'react-router-dom';
import './ArticleNotFound.css';

function ArticleNotFound() {
    return (
        <div className="article-not-found">
            <span className="material-symbols-outlined not-found-icon">article</span>
            <h1>Article Not Found</h1>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/articles" className="back-link">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Articles
            </Link>
        </div>
    );
}

export default ArticleNotFound;
