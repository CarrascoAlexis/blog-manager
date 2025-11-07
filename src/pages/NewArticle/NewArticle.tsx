import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { Article, category } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import ArticleForm, { type ArticleFormData } from '../../components/ArticleForm/ArticleForm';
import './NewArticle.css';

/**
 * NewArticle page component for creating new blog articles
 * Uses ArticleForm component and handles article creation logic
 */
function NewArticle() {
    // Navigation hook for redirecting after article creation
    const navigate = useNavigate();
    // Load existing articles from localStorage
    const [articles, setArticles] = useLocalStorage<Article[]>('blog-articles', []);
    // Load available categories from localStorage
    const [categories] = useLocalStorage<category[]>('blog-categories', []);
    
    // Set page title
    useEffect(() => {
        document.title = 'Create New Article - Blog Manager';
    }, []);
    
    // Initial empty form data
    const initialFormData: ArticleFormData = {
        title: '',
        excerpt: '',
        author: '',
        categoryId: '',
        readTime: '',
        content: ''
    };

    /**
     * Handle form submission - creates new article and saves to localStorage
     * @param {ArticleFormData} formData - Form data from ArticleForm component
     */
    const handleSubmit = (formData: ArticleFormData) => {
        // Find the selected category object
        const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
        
        // Validation: ensure category exists
        if (!selectedCategory) {
            return;
        }

        /**
         * Generate a UUID v4 compliant unique identifier
         * @returns {string} - UUID string
         */
        const generateUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0;  // Random hex digit
                const v = c === 'x' ? r : (r & 0x3 | 0x8);  // UUID v4 format
                return v.toString(16);
            });
        };

        // Create new article object
        const newArticle: Article = {
            id: generateUUID(),                      // Generate unique ID
            title: formData.title.trim(),            // Trim whitespace from title
            excerpt: formData.excerpt.trim(),        // Trim whitespace from excerpt
            author: formData.author.trim(),          // Trim whitespace from author
            date: new Date().toISOString().split('T')[0],  // Current date (YYYY-MM-DD)
            category: {
                id: selectedCategory.id,
                name: selectedCategory.name,
                color: selectedCategory.color
            },
            readTime: formData.readTime.trim(),      // Trim whitespace from read time
            content: formData.content.trim()         // Trim whitespace from content
        };

        // Add new article to beginning of articles array (newest first)
        setArticles([newArticle, ...articles]);
        
        // Navigate to the newly created article's detail page
        navigate(`/articles/${newArticle.id}`);
    };

    return (
        <div className="new-article-page">
            {/* Page header */}
            <header className="new-article-header">
                <h1 className="new-article-title">
                    <span className="material-symbols-outlined" aria-hidden="true">edit_note</span>
                    Create New Article
                </h1>
                <p className="new-article-subtitle">
                    Share your knowledge with the world
                </p>
            </header>

            {/* Article creation form */}
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
