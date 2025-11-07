import { useState, useRef } from 'react';
import type { category } from '../../shared/interfaces';
import './ArticleForm.css';

/**
 * Interface for article form data
 * Used for both creating new articles and editing existing ones
 */
export interface ArticleFormData {
    title: string;       // Article title
    excerpt: string;     // Short summary
    author: string;      // Author name
    categoryId: string;  // ID of selected category
    readTime: string;    // Estimated read time
    content: string;     // Markdown content
}

/**
 * Props interface for ArticleForm component
 */
interface ArticleFormProps {
    formData: ArticleFormData;                 // Initial form values
    categories: category[];                    // Available categories for dropdown
    onSubmit: (data: ArticleFormData) => void; // Callback when form is submitted
    onCancel?: () => void;                     // Optional callback when form is cancelled
    submitLabel?: string;                      // Custom submit button text
    showCancel?: boolean;                      // Whether to show cancel button
}

/**
 * ArticleForm component - Reusable form for creating and editing articles
 * Provides Markdown toolbar for content formatting and validation
 * 
 * @param {ArticleFormProps} props - Component props
 */
function ArticleForm({ 
    formData: initialFormData, 
    categories, 
    onSubmit, 
    onCancel,
    submitLabel = 'Publish Article',
    showCancel = false
}: ArticleFormProps) {
    // Reference to content textarea for Markdown insertion
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
    // Form state
    const [formData, setFormData] = useState<ArticleFormData>(initialFormData);
    // Validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    /**
     * Handle input changes for all form fields
     * Clears validation errors when user starts typing
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
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
        const selectedText = formData.content.substring(start, end);
        const textToInsert = selectedText || placeholder;
        
        // Build new text with markdown inserted
        const newText = 
            formData.content.substring(0, start) +
            before + textToInsert + after +
            formData.content.substring(end);

        setFormData(prev => ({ ...prev, content: newText }));

        // Set cursor position after insertion (after the inserted text)
        setTimeout(() => {
            textarea.focus();
            const newPosition = start + before.length + textToInsert.length;
            textarea.setSelectionRange(newPosition, newPosition);
        }, 0);
    };

    // Markdown formatting helper functions
    
    /**
     * Insert heading markdown (# for h1, ## for h2, etc.)
     * @param {number} level - Heading level (1-6)
     */
    const insertHeading = (level: number) => {
        const hashes = '#'.repeat(level);
        insertMarkdown(`${hashes} `, '', 'Heading');
    };

    /** Insert bold markdown (**text**) */
    const insertBold = () => insertMarkdown('**', '**', 'bold text');
    
    /** Insert italic markdown (*text*) */
    const insertItalic = () => insertMarkdown('*', '*', 'italic text');
    
    /** Insert inline code markdown (`code`) */
    const insertCode = () => insertMarkdown('`', '`', 'code');
    
    /** Insert link markdown ([text](url)) */
    const insertLink = () => insertMarkdown('[', '](url)', 'link text');
    
    /** Insert image markdown (![alt](url)) */
    const insertImage = () => insertMarkdown('![', '](image-url)', 'alt text');
    
    /** Insert code block markdown (```code```) */
    const insertCodeBlock = () => {
        insertMarkdown('\n```\n', '\n```\n', 'code here');
    };

    /**
     * Insert unordered list markdown
     * Converts each line of selected text to a list item
     */
    const insertList = () => {
        const textarea = contentTextareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content.substring(start, end);
        
        // Split into lines and prefix each with "- "
        const lines = selectedText.split('\n');
        const listText = lines.map(line => `- ${line || 'Item'}`).join('\n');
        
        const newText = 
            formData.content.substring(0, start) +
            listText +
            formData.content.substring(end);

        setFormData(prev => ({ ...prev, content: newText }));
    };

    /** Insert blockquote markdown (> text) */
    const insertQuote = () => insertMarkdown('> ', '', 'Quote text');

    /**
     * Insert table template markdown
     * Creates a 3x3 table with headers
     */
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
            formData.content.substring(0, start) +
            tableTemplate +
            formData.content.substring(start);

        setFormData(prev => ({ ...prev, content: newText }));
    };

    /**
     * Validate form fields
     * @returns {boolean} - True if form is valid, false otherwise
     */
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Check all required fields
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.excerpt.trim()) {
            newErrors.excerpt = 'Excerpt is required';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }

        if (!formData.categoryId) {
            newErrors.categoryId = 'Category is required';
        }

        if (!formData.readTime.trim()) {
            newErrors.readTime = 'Read time is required';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle form submission
     * Validates form and calls onSubmit callback if valid
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate before submitting
        if (!validateForm()) {
            return;
        }

        onSubmit(formData);
    };

    return (
        <form className="article-form" onSubmit={handleSubmit}>
            {/* Title field */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="title">
                        Title <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={errors.title ? 'error' : ''}
                        placeholder="Enter article title"
                    />
                    {/* Show error message if validation failed */}
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>
            </div>

            {/* Excerpt field */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="excerpt">
                        Excerpt <span className="required">*</span>
                    </label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        className={errors.excerpt ? 'error' : ''}
                        placeholder="Brief description of the article"
                        rows={3}
                    />
                    {errors.excerpt && <span className="error-message">{errors.excerpt}</span>}
                </div>
            </div>

            {/* Author and Read Time row (two columns) */}
            <div className="form-row two-cols">
                {/* Author field */}
                <div className="form-group">
                    <label htmlFor="author">
                        Author <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className={errors.author ? 'error' : ''}
                        placeholder="Author name"
                    />
                    {errors.author && <span className="error-message">{errors.author}</span>}
                </div>

                {/* Read time field */}
                <div className="form-group">
                    <label htmlFor="readTime">
                        Read Time <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="readTime"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleChange}
                        className={errors.readTime ? 'error' : ''}
                        placeholder="e.g., 5 min read"
                    />
                    {errors.readTime && <span className="error-message">{errors.readTime}</span>}
                </div>
            </div>

            {/* Category dropdown */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="categoryId">
                        Category <span className="required">*</span>
                    </label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className={errors.categoryId ? 'error' : ''}
                    >
                        <option value="">Select a category</option>
                        {/* Render option for each available category */}
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <span className="error-message">{errors.categoryId}</span>}
                </div>
            </div>

            {/* Content field with Markdown toolbar */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="content">
                        Content <span className="required">*</span>
                        <span className="label-hint">Supports Markdown</span>
                    </label>

                    {/* Markdown formatting toolbar with Material icons */}
                    <div className="markdown-toolbar">
                        {/* Heading buttons */}
                        <button type="button" onClick={() => insertHeading(1)} title="Heading 1">
                            <span className="material-symbols-outlined">format_h1</span>
                        </button>
                        <button type="button" onClick={() => insertHeading(2)} title="Heading 2">
                            <span className="material-symbols-outlined">format_h2</span>
                        </button>
                        <button type="button" onClick={() => insertHeading(3)} title="Heading 3">
                            <span className="material-symbols-outlined">format_h3</span>
                        </button>
                        <div className="toolbar-divider"></div>
                        {/* Text formatting buttons */}
                        <button type="button" onClick={insertBold} title="Bold">
                            <span className="material-symbols-outlined">format_bold</span>
                        </button>
                        <button type="button" onClick={insertItalic} title="Italic">
                            <span className="material-symbols-outlined">format_italic</span>
                        </button>
                        <button type="button" onClick={insertCode} title="Inline Code">
                            <span className="material-symbols-outlined">code</span>
                        </button>
                        <div className="toolbar-divider"></div>
                        {/* Link and image buttons */}
                        <button type="button" onClick={insertLink} title="Link">
                            <span className="material-symbols-outlined">link</span>
                        </button>
                        <button type="button" onClick={insertImage} title="Image">
                            <span className="material-symbols-outlined">image</span>
                        </button>
                        <div className="toolbar-divider"></div>
                        {/* Block element buttons */}
                        <button type="button" onClick={insertList} title="List">
                            <span className="material-symbols-outlined">format_list_bulleted</span>
                        </button>
                        <button type="button" onClick={insertQuote} title="Quote">
                            <span className="material-symbols-outlined">format_quote</span>
                        </button>
                        <button type="button" onClick={insertCodeBlock} title="Code Block">
                            <span className="material-symbols-outlined">code_blocks</span>
                        </button>
                        <button type="button" onClick={insertTable} title="Table">
                            <span className="material-symbols-outlined">table</span>
                        </button>
                    </div>

                    {/* Content textarea - ref used for cursor positioning */}
                    <textarea
                        ref={contentTextareaRef}
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className={errors.content ? 'error content-textarea' : 'content-textarea'}
                        placeholder="Write your article content in Markdown..."
                        rows={20}
                    />
                    {errors.content && <span className="error-message">{errors.content}</span>}
                </div>
            </div>

            {/* Form action buttons */}
            <div className="form-actions">
                {/* Cancel button - only shown if showCancel prop is true */}
                {showCancel && onCancel && (
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                )}
                {/* Submit button with custom label */}
                <button type="submit" className="btn-primary">
                    <span className="material-symbols-outlined">publish</span>
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}

export default ArticleForm;
