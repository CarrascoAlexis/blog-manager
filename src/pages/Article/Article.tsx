import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Article as ArticleType } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';
import ArticleContent from '../../components/ArticleContent/ArticleContent';
import ArticleNotFound from '../../components/ArticleNotFound/ArticleNotFound';
import EditArticleModal from '../../components/EditArticleModal/EditArticleModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';
import './Article.css';

/**
 * Article detail page component that displays a full article
 * Provides edit and delete functionality with confirmation modals
 */
function Article() {
    // Extract article ID from URL parameters
    const { id } = useParams<{ id: string }>();
    // Navigation hook for redirecting after delete
    const navigate = useNavigate();
    // Load articles from localStorage
    const [articles, setArticles] = useLocalStorage<ArticleType[]>('blog-articles', []);
    // Track edit modal open/closed state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // Track delete confirmation modal open/closed state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // Find the article with matching ID
    const article = articles.find(a => a.id === id);

    // Set page title based on article
    useEffect(() => {
        if (article) {
            document.title = `${article.title} - Blog Manager`;
        } else {
            document.title = 'Article Not Found - Blog Manager';
        }
    }, [article]);

    /**
     * Save updated article to localStorage
     * @param {ArticleType} updatedArticle - Updated article object
     */
    const handleSaveArticle = (updatedArticle: ArticleType) => {
        // Map through articles and replace the one with matching ID
        const updatedArticles = articles.map(a => 
            a.id === updatedArticle.id ? updatedArticle : a
        );
        setArticles(updatedArticles);
    };

    /**
     * Delete article and navigate back to articles list
     */
    const handleDeleteArticle = () => {
        // Filter out the article with matching ID
        const updatedArticles = articles.filter(a => a.id !== id);
        setArticles(updatedArticles);
        // Redirect to articles listing page
        navigate('/articles');
    };

    // Show 404 page if article not found
    if (!article) {
        return (
            <div className="article-page">
                <ArticleNotFound />
            </div>
        );
    }

    return (
        <div className="article-page">
            {/* Action buttons row */}
            <nav className="article-actions" aria-label="Article actions">
                {/* Back to articles link */}
                <Link to="/articles" className="back-link" aria-label="Return to articles list">
                    <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
                    Back to Articles
                </Link>

                {/* Edit and Delete buttons */}
                <div className="action-buttons">
                    {/* Edit button - opens edit modal */}
                    <button className="edit-btn" onClick={() => setIsEditModalOpen(true)} aria-label="Edit this article">
                        <span className="material-symbols-outlined" aria-hidden="true">edit</span>
                        Edit
                    </button>
                    {/* Delete button - opens confirmation modal */}
                    <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)} aria-label="Delete this article">
                        <span className="material-symbols-outlined" aria-hidden="true">delete</span>
                        Delete
                    </button>
                </div>
            </nav>

            {/* Article content */}
            <article className="article-detail">
                {/* Article header with metadata */}
                <ArticleHeader article={article} />
                {/* Article content (Markdown converted to HTML) */}
                <ArticleContent content={article.content || ''} />
            </article>

            {/* Edit modal - only rendered when open */}
            <EditArticleModal
                article={article}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveArticle}
            />

            {/* Delete confirmation modal - only rendered when open */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                articleTitle={article.title}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteArticle}
            />
        </div>
    );
}

export default Article;
