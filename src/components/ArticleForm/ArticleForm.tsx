import { useState, useRef } from 'react';
import type { category } from '../../shared/interfaces';
import './ArticleForm.css';

export interface ArticleFormData {
    title: string;
    excerpt: string;
    author: string;
    categoryId: string;
    readTime: string;
    content: string;
}

interface ArticleFormProps {
    formData: ArticleFormData;
    categories: category[];
    onSubmit: (data: ArticleFormData) => void;
    onCancel?: () => void;
    submitLabel?: string;
    showCancel?: boolean;
}

function ArticleForm({ 
    formData: initialFormData, 
    categories, 
    onSubmit, 
    onCancel,
    submitLabel = 'Publish Article',
    showCancel = false
}: ArticleFormProps) {
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [formData, setFormData] = useState<ArticleFormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
        const textarea = contentTextareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content.substring(start, end);
        const textToInsert = selectedText || placeholder;
        
        const newText = 
            formData.content.substring(0, start) +
            before + textToInsert + after +
            formData.content.substring(end);

        setFormData(prev => ({ ...prev, content: newText }));

        // Set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            const newPosition = start + before.length + textToInsert.length;
            textarea.setSelectionRange(newPosition, newPosition);
        }, 0);
    };

    const insertHeading = (level: number) => {
        const hashes = '#'.repeat(level);
        insertMarkdown(`${hashes} `, '', 'Heading');
    };

    const insertBold = () => insertMarkdown('**', '**', 'bold text');
    const insertItalic = () => insertMarkdown('*', '*', 'italic text');
    const insertCode = () => insertMarkdown('`', '`', 'code');
    const insertLink = () => insertMarkdown('[', '](url)', 'link text');
    const insertImage = () => insertMarkdown('![', '](image-url)', 'alt text');
    
    const insertCodeBlock = () => {
        insertMarkdown('\n```\n', '\n```\n', 'code here');
    };

    const insertList = () => {
        const textarea = contentTextareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content.substring(start, end);
        
        const lines = selectedText.split('\n');
        const listText = lines.map(line => `- ${line || 'Item'}`).join('\n');
        
        const newText = 
            formData.content.substring(0, start) +
            listText +
            formData.content.substring(end);

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
            formData.content.substring(0, start) +
            tableTemplate +
            formData.content.substring(start);

        setFormData(prev => ({ ...prev, content: newText }));
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit(formData);
    };

    return (
        <form className="article-form" onSubmit={handleSubmit}>
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
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>
            </div>

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

            <div className="form-row two-cols">
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
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <span className="error-message">{errors.categoryId}</span>}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="content">
                        Content <span className="required">*</span>
                        <span className="label-hint">Supports Markdown</span>
                    </label>

                    <div className="markdown-toolbar">
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
                        <button type="button" onClick={insertLink} title="Link">
                            <span className="material-symbols-outlined">link</span>
                        </button>
                        <button type="button" onClick={insertImage} title="Image">
                            <span className="material-symbols-outlined">image</span>
                        </button>
                        <div className="toolbar-divider"></div>
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

            <div className="form-actions">
                {showCancel && onCancel && (
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn-primary">
                    <span className="material-symbols-outlined">publish</span>
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}

export default ArticleForm;
