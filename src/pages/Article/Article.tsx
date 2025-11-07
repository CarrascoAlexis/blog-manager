import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Article as ArticleType } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';
import ArticleContent from '../../components/ArticleContent/ArticleContent';
import ArticleNotFound from '../../components/ArticleNotFound/ArticleNotFound';
import EditArticleModal from '../../components/EditArticleModal/EditArticleModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';
import './Article.css';

function Article() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [articles, setArticles] = useLocalStorage<ArticleType[]>('blog-articles', []);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const article = articles.find(a => a.id === id);

    const handleSaveArticle = (updatedArticle: ArticleType) => {
        const updatedArticles = articles.map(a => 
            a.id === updatedArticle.id ? updatedArticle : a
        );
        setArticles(updatedArticles);
    };

    const handleDeleteArticle = () => {
        const updatedArticles = articles.filter(a => a.id !== id);
        setArticles(updatedArticles);
        navigate('/articles');
    };

    if (!article) {
        return (
            <div className="article-page">
                <ArticleNotFound />
            </div>
        );
    }

    return (
        <div className="article-page">
            <div className="article-actions">
                <Link to="/articles" className="back-link">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Articles
                </Link>

                <div className="action-buttons">
                    <button className="edit-btn" onClick={() => setIsEditModalOpen(true)}>
                        <span className="material-symbols-outlined">edit</span>
                        Edit
                    </button>
                    <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
                        <span className="material-symbols-outlined">delete</span>
                        Delete
                    </button>
                </div>
            </div>

            <article className="article-detail">
                <ArticleHeader article={article} />
                <ArticleContent content={article.content || ''} />
            </article>

            <EditArticleModal
                article={article}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveArticle}
            />

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
