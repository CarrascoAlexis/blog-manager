import { useParams, Link } from 'react-router-dom';
import type { Article as ArticleType } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';
import ArticleContent from '../../components/ArticleContent/ArticleContent';
import ArticleNotFound from '../../components/ArticleNotFound/ArticleNotFound';
import './Article.css';

function Article() {
    const { id } = useParams<{ id: string }>();
    const [articles] = useLocalStorage<ArticleType[]>('blog-articles', []);
    
    const article = articles.find(a => a.id === id);

    if (!article) {
        return (
            <div className="article-page">
                <ArticleNotFound />
            </div>
        );
    }

    return (
        <div className="article-page">
            <Link to="/articles" className="back-link">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Articles
            </Link>

            <article className="article-detail">
                <ArticleHeader article={article} />
                <ArticleContent content={article.content || ''} />
            </article>
        </div>
    );
}

export default Article;
