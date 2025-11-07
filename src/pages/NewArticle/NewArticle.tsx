import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Article, category, Draft } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import ArticleForm, { type ArticleFormData } from '../../components/ArticleForm/ArticleForm';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';
import './NewArticle.css';

/**
 * NewArticle page component for creating new blog articles
 * Uses ArticleForm component and handles article creation logic
 * Supports draft saving and loading
 */
function NewArticle() {
    // Navigation hook for redirecting after article creation
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // Load existing articles from localStorage
    const [articles, setArticles] = useLocalStorage<Article[]>('blog-articles', []);
    // Load available categories from localStorage
    const [categories, setCategories] = useLocalStorage<category[]>('blog-categories', []);
    // Load drafts from localStorage
    const [drafts, setDrafts] = useLocalStorage<Draft[]>('blog-drafts', []);
    // Track current draft being edited
    const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
    // Track if showing draft list
    const [showDraftList, setShowDraftList] = useState(true);
    // Delete modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [draftToDelete, setDraftToDelete] = useState<Draft | null>(null);
    
    // Set page title
    useEffect(() => {
        document.title = 'Create New Article - Blog Manager';
    }, []);

    // Check if loading a specific draft from URL
    useEffect(() => {
        const draftId = searchParams.get('draft');
        if (draftId) {
            const draft = drafts.find(d => d.id === draftId);
            if (draft) {
                setCurrentDraftId(draftId);
                setShowDraftList(false);
            }
        }
    }, [searchParams, drafts]);

    // Get initial form data (from draft or empty)
    const getInitialFormData = (): ArticleFormData => {
        if (currentDraftId) {
            const draft = drafts.find(d => d.id === currentDraftId);
            if (draft) {
                return {
                    title: draft.title,
                    excerpt: draft.excerpt,
                    author: draft.author,
                    categoryId: draft.category.id,
                    readTime: '',
                    content: draft.content || ''
                };
            }
        }
        return {
            title: '',
            excerpt: '',
            author: '',
            categoryId: '',
            readTime: '',
            content: ''
        };
    };

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

    /**
     * Save current form as draft
     * Returns validation errors if any, or null if successful
     */
    const handleSaveDraft = (formData: ArticleFormData): Record<string, string> | null => {
        const validationErrors: Record<string, string> = {};
        
        // Validate required fields for draft
        if (!formData.title.trim()) {
            validationErrors.title = 'Title is required to save as draft';
        }
        if (!formData.categoryId) {
            validationErrors.categoryId = 'Category is required to save as draft';
        }

        // If there are validation errors, return them
        if (Object.keys(validationErrors).length > 0) {
            return validationErrors;
        }

        const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
        
        if (!selectedCategory) {
            return { categoryId: 'Invalid category selected' };
        }

        const now = new Date().toISOString();
        
        if (currentDraftId) {
            // Update existing draft
            const updatedDrafts = drafts.map(draft => 
                draft.id === currentDraftId
                    ? {
                        ...draft,
                        title: formData.title.trim(),
                        excerpt: formData.excerpt.trim(),
                        author: formData.author.trim(),
                        category: selectedCategory,
                        content: formData.content.trim(),
                        updatedAt: now
                    }
                    : draft
            );
            setDrafts(updatedDrafts);
        } else {
            // Create new draft
            const newDraft: Draft = {
                id: generateUUID(),
                title: formData.title.trim(),
                excerpt: formData.excerpt.trim(),
                author: formData.author.trim(),
                category: selectedCategory,
                content: formData.content.trim(),
                createdAt: now,
                updatedAt: now
            };
            setDrafts([newDraft, ...drafts]);
            setCurrentDraftId(newDraft.id);
        }
        
        return null; // Success
    };

    /**
     * Handle creating a new category
     */
    const handleCreateCategory = (name: string, color: string, description?: string): string => {
        const newCategory: category = {
            id: generateUUID(),
            name,
            color,
            description
        };
        
        // Get current categories from localStorage
        const currentCategories = JSON.parse(localStorage.getItem('blog-categories') || '[]');
        // Add new category
        const updatedCategories = [...currentCategories, newCategory];
        // Save back to localStorage
        localStorage.setItem('blog-categories', JSON.stringify(updatedCategories));
        // Update state
        setCategories(updatedCategories);
        
        // Return the new category ID
        return newCategory.id;
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
        
        // Delete draft if publishing from draft
        if (currentDraftId) {
            setDrafts(drafts.filter(draft => draft.id !== currentDraftId));
        }
        
        // Navigate to the newly created article's detail page
        navigate(`/articles/${newArticle.id}`);
    };

    /**
     * Load a draft
     */
    const handleLoadDraft = (draftId: string) => {
        setCurrentDraftId(draftId);
        setShowDraftList(false);
        navigate(`/new?draft=${draftId}`);
    };

    /**
     * Delete a draft
     */
    const handleDeleteDraft = (draftId: string) => {
        const draft = drafts.find(d => d.id === draftId);
        if (draft) {
            setDraftToDelete(draft);
            setIsDeleteModalOpen(true);
        }
    };

    /**
     * Confirm draft deletion
     */
    const confirmDeleteDraft = () => {
        if (draftToDelete) {
            setDrafts(drafts.filter(d => d.id !== draftToDelete.id));
            if (currentDraftId === draftToDelete.id) {
                setCurrentDraftId(null);
            }
            setIsDeleteModalOpen(false);
            setDraftToDelete(null);
        }
    };

    /**
     * Cancel draft deletion
     */
    const cancelDeleteDraft = () => {
        setIsDeleteModalOpen(false);
        setDraftToDelete(null);
    };

    /**
     * Start new article (clear draft)
     */
    const handleNewArticle = () => {
        setCurrentDraftId(null);
        setShowDraftList(false);
        navigate('/new');
    };

    // If showing draft list and there are drafts, show selection UI
    if (showDraftList && drafts.length > 0 && !searchParams.get('draft')) {
        return (
            <div className="new-article-page">
                <div className="draft-selection">
                    <div className="drafts-header">
                        <h2>Your Drafts</h2>
                        <p>Continue working on a draft or start fresh</p>
                    </div>

                    <button 
                        className="draft-new-article-btn"
                        onClick={handleNewArticle}
                        aria-label="Start creating a new article from scratch"
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">add_circle</span>
                        Start New Article
                    </button>

                    <div className="drafts-section">
                        <h3>
                            <span className="material-symbols-outlined" aria-hidden="true">draft</span>
                            {drafts.length} {drafts.length === 1 ? 'Draft' : 'Drafts'}
                        </h3>
                        <div className="drafts-list">
                            {drafts.map(draft => (
                                <div key={draft.id} className="draft-item">
                                    <div className="draft-info">
                                        <h3>{draft.title || 'Untitled Draft'}</h3>
                                        <div className="draft-meta">
                                            <span 
                                                className="draft-category"
                                                style={{ backgroundColor: draft.category.color }}
                                            >
                                                {draft.category.name}
                                            </span>
                                            <span className="draft-date">
                                                <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
                                                {new Date(draft.updatedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {draft.excerpt && (
                                            <p className="draft-excerpt">{draft.excerpt}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleLoadDraft(draft.id)}
                                        aria-label={`Continue editing ${draft.title || 'draft'}`}
                                    >
                                        <span className="material-symbols-outlined" aria-hidden="true">edit</span>
                                        Continue
                                    </button>
                                    <button
                                        className="btn-danger"
                                        onClick={() => handleDeleteDraft(draft.id)}
                                        aria-label={`Delete ${draft.title || 'draft'}`}
                                    >
                                        <span className="material-symbols-outlined" aria-hidden="true">delete</span>
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Delete confirmation modal */}
                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    articleTitle={draftToDelete?.title || 'Untitled Draft'}
                    onClose={cancelDeleteDraft}
                    onConfirm={confirmDeleteDraft}
                    title="Delete Draft?"
                    buttonText="Delete Draft"
                />
            </div>
        );
    }

    return (
        <div className="new-article-page">
            {/* Page header */}
            <header className="new-article-header">
                <h1 className="new-article-title">
                    <span className="material-symbols-outlined" aria-hidden="true">edit_note</span>
                    {currentDraftId ? 'Edit Draft' : 'Create New Article'}
                </h1>
                <p className="new-article-subtitle">
                    {currentDraftId ? 'Continue working on your draft' : 'Share your knowledge with the world'}
                </p>
            </header>

            {/* Draft status banner */}
            {currentDraftId && (
                <div className="draft-banner" role="status" aria-live="polite">
                    <span className="material-symbols-outlined" aria-hidden="true">draft</span>
                    <div className="draft-banner-text">
                        <strong>Editing Draft</strong>
                        <span>Your changes are being saved to this draft</span>
                    </div>
                </div>
            )}

            {/* Article creation form */}
            <div className="form-container">
                <ArticleForm 
                    formData={getInitialFormData()}
                    categories={categories}
                    onSubmit={handleSubmit}
                    onSaveDraft={handleSaveDraft}
                    onCreateCategory={handleCreateCategory}
                    submitLabel="Publish Article"
                />
            </div>
        </div>
    );
}

export default NewArticle;
