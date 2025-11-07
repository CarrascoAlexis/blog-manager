import { useState, useRef, useEffect } from 'react';
import type { Article, category } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import CreateCategoryModal from '../CreateCategoryModal/CreateCategoryModal';
import './EditArticleModal.css';

/**
 * Props interface for EditArticleModal component
 */
interface EditArticleModalProps {
    article: Article;                         // Article to edit
    isOpen: boolean;                          // Whether modal is visible
    onClose: () => void;                      // Callback to close modal
    onSave: (updatedArticle: Article) => void; // Callback to save changes
}

/**
 * EditArticleModal component - Modal dialog for editing existing articles
 * Similar to ArticleForm but works within a modal and handles Article objects
 * instead of ArticleFormData
 * 
 * @param {EditArticleModalProps} props - Component props
 */
function EditArticleModal({ article, isOpen, onClose, onSave }: EditArticleModalProps) {
    // Load categories from localStorage
    const [categories, setCategories] = useLocalStorage<category[]>('blog-categories', []);
    // Form state - initialized with article data
    const [formData, setFormData] = useState<Article>(article);
    // Validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});
    // Reference to content textarea for Markdown insertion
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
    // Create category modal state
    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);

    // Update form data when article prop changes
    useEffect(() => {
        setFormData(article);
    }, [article]);

    /**
     * Handle input changes for all form fields
     * Special handling for category selection to update full category object
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        // Special handling for category selection
        if (name === 'categoryId') {
            const selectedCategory = categories.find(cat => cat.id === value);
            if (selectedCategory) {
                setFormData(prev => ({ ...prev, category: selectedCategory }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    /**
     * Insert Markdown syntax at cursor position or around selected text
     * @param {string} before - Text to insert before cursor/selection
     * @param {string} after - Text to insert after cursor/selection
     * @param {string} placeholder - Default text if nothing is selected
     */
    const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
        const textarea = contentTextareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content?.substring(start, end) || '';
        const textToInsert = selectedText || placeholder;
        
        const newText = 
            (formData.content?.substring(0, start) || '') +
            before + textToInsert + after +
            (formData.content?.substring(end) || '');

        setFormData(prev => ({ ...prev, content: newText }));

        // Set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            const newPosition = start + before.length + textToInsert.length;
            textarea.setSelectionRange(newPosition, newPosition);
        }, 0);
    };

    // Markdown formatting helper functions (same as ArticleForm)
    const insertHeading = (level: number) => {
        const hashes = '#'.repeat(level);
        insertMarkdown(`${hashes} `, '', 'Heading');
    };
    const insertBold = () => insertMarkdown('**', '**', 'bold text');
    const insertItalic = () => insertMarkdown('*', '*', 'italic text');
    const insertCode = () => insertMarkdown('`', '`', 'code');
    const insertLink = () => insertMarkdown('[', '](url)', 'link text');
    const insertImage = () => insertMarkdown('![', '](image-url)', 'alt text');
    const insertCodeBlock = () => insertMarkdown('\n```\n', '\n```\n', 'code here');

    const insertList = () => {
        const textarea = contentTextareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content?.substring(start, end) || '';
        
        const lines = selectedText.split('\n');
        const listText = lines.map(line => `- ${line || 'Item'}`).join('\n');
        
        const newText = 
            (formData.content?.substring(0, start) || '') +
            listText +
            (formData.content?.substring(end) || '');

        setFormData(prev => ({ ...prev, content: newText }));
    };

    const insertQuote = () => insertMarkdown('> ', '', 'Quote text');

    const insertTable = () => {
        const tableTemplate = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;
        const textarea = contentTextareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const newText = 
            (formData.content?.substring(0, start) || '') +
            tableTemplate +
            (formData.content?.substring(start) || '');

        setFormData(prev => ({ ...prev, content: newText }));
    };

    /**
     * Handle creating a new category
     */
    const handleCreateCategory = (name: string, color: string, description?: string) => {
        const generateUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

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
        
        // Auto-select the newly created category
        setFormData(prev => ({ ...prev, category: newCategory }));
    };

    /**
     * Handle form submission
     * Validates form and saves updated article with updatedAt timestamp
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate all required fields
        const newErrors: Record<string, string> = {};
        
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
        if (!formData.author.trim()) newErrors.author = 'Author is required';
        if (!formData.category.id) newErrors.categoryId = 'Category is required';
        if (!formData.readTime.trim()) newErrors.readTime = 'Read time is required';
        if (!formData.content?.trim()) newErrors.content = 'Content is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Create updated article with new timestamp
        const updatedArticle: Article = {
            ...formData,
            updatedAt: new Date().toISOString()
        };

        onSave(updatedArticle);
        onClose();
    };

    // Don't render modal if it's not open
    if (!isOpen) return null;

    return (
        // Modal overlay - clicking it closes modal
        <div 
            className="modal-overlay" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-modal-title"
        >
            {/* Modal content - stops click propagation to prevent closing when clicking inside */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Modal header with title and close button */}
                <div className="modal-header">
                    <h2 id="edit-modal-title" className="modal-title">
                        <span className="material-symbols-outlined" aria-hidden="true">edit</span>
                        Edit Article
                    </h2>
                    {/* Close button (X) */}
                    <button className="modal-close" onClick={onClose} aria-label="Close edit modal">
                        <span className="material-symbols-outlined" aria-hidden="true">close</span>
                    </button>
                </div>

                {/* Edit form - similar structure to ArticleForm */}
                <form onSubmit={handleSubmit} className="modal-form" aria-label="Edit article form">
                    {/* Title field */}
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`form-input ${errors.title ? 'error' : ''}`}
                            placeholder="Article title"
                            aria-required="true"
                            aria-invalid={!!errors.title}
                            aria-describedby={errors.title ? 'title-error' : undefined}
                        />
                        {errors.title && <span id="title-error" className="error-message" role="alert">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="excerpt" className="form-label">Excerpt *</label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            className={`form-textarea ${errors.excerpt ? 'error' : ''}`}
                            rows={3}
                            placeholder="Brief description of the article"
                            aria-required="true"
                            aria-invalid={!!errors.excerpt}
                            aria-describedby={errors.excerpt ? 'excerpt-error' : undefined}
                        />
                        {errors.excerpt && <span id="excerpt-error" className="error-message" role="alert">{errors.excerpt}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="author" className="form-label">Author *</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className={`form-input ${errors.author ? 'error' : ''}`}
                                placeholder="Your name"
                                aria-required="true"
                                aria-invalid={!!errors.author}
                                aria-describedby={errors.author ? 'author-error' : undefined}
                            />
                            {errors.author && <span id="author-error" className="error-message" role="alert">{errors.author}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoryId" className="form-label">Category *</label>
                            <div className="category-select-wrapper">
                                <select
                                    id="categoryId"
                                    name="categoryId"
                                    value={formData.category.id}
                                    onChange={handleChange}
                                    className={`form-select ${errors.categoryId ? 'error' : ''}`}
                                    aria-required="true"
                                    aria-invalid={!!errors.categoryId}
                                    aria-describedby={errors.categoryId ? 'category-error' : undefined}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn-create-category"
                                    onClick={() => setIsCreateCategoryModalOpen(true)}
                                    title="Create new category"
                                >
                                    <span className="material-symbols-outlined">add_circle</span>
                                    New Category
                                </button>
                            </div>
                            {errors.categoryId && <span id="category-error" className="error-message" role="alert">{errors.categoryId}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="readTime" className="form-label">Read Time *</label>
                            <input
                                type="text"
                                id="readTime"
                                name="readTime"
                                value={formData.readTime}
                                onChange={handleChange}
                                className={`form-input ${errors.readTime ? 'error' : ''}`}
                                placeholder="e.g., 5 min read"
                                aria-required="true"
                                aria-invalid={!!errors.readTime}
                                aria-describedby={errors.readTime ? 'readtime-error' : undefined}
                            />
                            {errors.readTime && <span id="readtime-error" className="error-message" role="alert">{errors.readTime}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content" className="form-label">
                            Content * <span className="label-hint">(Markdown supported)</span>
                        </label>
                        <div className="formatting-toolbar" role="toolbar" aria-label="Text formatting tools">
                            <button type="button" onClick={() => insertHeading(1)} title="Heading 1" className="toolbar-btn" aria-label="Insert heading level 1">
                                <span className="material-symbols-outlined" aria-hidden="true">format_h1</span>
                            </button>
                            <button type="button" onClick={() => insertHeading(2)} title="Heading 2" className="toolbar-btn" aria-label="Insert heading level 2">
                                <span className="material-symbols-outlined" aria-hidden="true">format_h2</span>
                            </button>
                            <button type="button" onClick={() => insertHeading(3)} title="Heading 3" className="toolbar-btn" aria-label="Insert heading level 3">
                                <span className="material-symbols-outlined" aria-hidden="true">format_h3</span>
                            </button>
                            <div className="toolbar-divider" role="separator" aria-hidden="true"></div>
                            <button type="button" onClick={insertBold} title="Bold" className="toolbar-btn" aria-label="Insert bold text">
                                <span className="material-symbols-outlined" aria-hidden="true">format_bold</span>
                            </button>
                            <button type="button" onClick={insertItalic} title="Italic" className="toolbar-btn" aria-label="Insert italic text">
                                <span className="material-symbols-outlined" aria-hidden="true">format_italic</span>
                            </button>
                            <button type="button" onClick={insertCode} title="Inline Code" className="toolbar-btn" aria-label="Insert inline code">
                                <span className="material-symbols-outlined" aria-hidden="true">code</span>
                            </button>
                            <button type="button" onClick={insertCodeBlock} title="Code Block" className="toolbar-btn" aria-label="Insert code block">
                                <span className="material-symbols-outlined" aria-hidden="true">code_blocks</span>
                            </button>
                            <div className="toolbar-divider" role="separator" aria-hidden="true"></div>
                            <button type="button" onClick={insertLink} title="Link" className="toolbar-btn" aria-label="Insert hyperlink">
                                <span className="material-symbols-outlined" aria-hidden="true">link</span>
                            </button>
                            <button type="button" onClick={insertImage} title="Image" className="toolbar-btn" aria-label="Insert image">
                                <span className="material-symbols-outlined" aria-hidden="true">image</span>
                            </button>
                            <div className="toolbar-divider" role="separator" aria-hidden="true"></div>
                            <button type="button" onClick={insertList} title="Bullet List" className="toolbar-btn" aria-label="Insert bullet list">
                                <span className="material-symbols-outlined" aria-hidden="true">format_list_bulleted</span>
                            </button>
                            <button type="button" onClick={insertQuote} title="Quote" className="toolbar-btn" aria-label="Insert quote">
                                <span className="material-symbols-outlined" aria-hidden="true">format_quote</span>
                            </button>
                            <button type="button" onClick={insertTable} title="Table" className="toolbar-btn" aria-label="Insert table">
                                <span className="material-symbols-outlined" aria-hidden="true">table</span>
                            </button>
                        </div>
                        <textarea
                            ref={contentTextareaRef}
                            id="content"
                            name="content"
                            value={formData.content || ''}
                            onChange={handleChange}
                            className={`form-textarea content-textarea ${errors.content ? 'error' : ''}`}
                            placeholder="Write your article content in Markdown format..."
                            rows={15}
                            aria-required="true"
                            aria-invalid={!!errors.content}
                            aria-describedby={errors.content ? 'content-error' : undefined}
                        />
                        {errors.content && <span id="content-error" className="error-message" role="alert">{errors.content}</span>}
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary" aria-label="Cancel editing">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" aria-label="Save article changes">
                            <span className="material-symbols-outlined" aria-hidden="true">save</span>
                            Save Changes
                        </button>
                    </div>
                </form>

                {/* Category creation modal */}
                <CreateCategoryModal
                    isOpen={isCreateCategoryModalOpen}
                    onClose={() => setIsCreateCategoryModalOpen(false)}
                    onConfirm={(name, color, description) => {
                        handleCreateCategory(name, color, description);
                        setIsCreateCategoryModalOpen(false);
                    }}
                />
            </div>
        </div>
    );
}

export default EditArticleModal;
