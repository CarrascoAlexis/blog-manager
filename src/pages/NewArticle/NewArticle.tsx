import { useNavigate } from 'react-router-dom';
import type { Article, category } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import ArticleForm, { type ArticleFormData } from '../../components/ArticleForm/ArticleForm';
import './NewArticle.css';

function NewArticle() {
    const navigate = useNavigate();
    const [articles, setArticles] = useLocalStorage<Article[]>('blog-articles', []);
    const [categories] = useLocalStorage<category[]>('blog-categories', []);
    
    const initialFormData: ArticleFormData = {
        title: '',
        excerpt: '',
        author: '',
        categoryId: '',
        readTime: '',
        content: ''
    };

    const handleSubmit = (formData: ArticleFormData) => {
        const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
        
        if (!selectedCategory) {
            return;
        }

        // Generate UUID
        const generateUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        const newArticle: Article = {
            id: generateUUID(),
            title: formData.title.trim(),
            excerpt: formData.excerpt.trim(),
            author: formData.author.trim(),
            date: new Date().toISOString().split('T')[0],
            category: {
                id: selectedCategory.id,
                name: selectedCategory.name,
                color: selectedCategory.color
            },
            readTime: formData.readTime.trim(),
            content: formData.content.trim()
        };

        setArticles([newArticle, ...articles]);
        
        // Navigate to the new article
        navigate(`/articles/${newArticle.id}`);
    };

    return (
        <div className="new-article-page">
            <div className="new-article-header">
                <h1 className="new-article-title">
                    <span className="material-symbols-outlined">edit_note</span>
                    Create New Article
                </h1>
                <p className="new-article-subtitle">
                    Share your knowledge with the world
                </p>
            </div>

            <div className="form-container">
                <ArticleForm 
                    formData={initialFormData}
                    categories={categories}
                    onSubmit={handleSubmit}
                    submitLabel="Publish Article"
                />
            </div>
        </div>
    );
}

export default NewArticle;
