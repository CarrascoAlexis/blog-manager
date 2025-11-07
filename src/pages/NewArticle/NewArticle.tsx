import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Article, category } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import './NewArticle.css';

function NewArticle() {
    const navigate = useNavigate();
    const [articles, setArticles] = useLocalStorage<Article[]>('blog-articles', []);
    const [categories] = useLocalStorage<category[]>('blog-categories', []);
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
    
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        author: '',
        categoryId: '',
        readTime: '',
        content: ''
    });

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

        const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
        
        if (!selectedCategory) {
            setErrors({ categoryId: 'Invalid category selected' });
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

            <form className="article-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`form-input ${errors.title ? 'error' : ''}`}
                        placeholder="Enter article title"
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="excerpt" className="form-label">
                        Excerpt *
                    </label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        className={`form-textarea ${errors.excerpt ? 'error' : ''}`}
                        placeholder="Brief description of your article"
                        rows={3}
                    />
                    {errors.excerpt && <span className="error-message">{errors.excerpt}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="author" className="form-label">
                            Author *
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className={`form-input ${errors.author ? 'error' : ''}`}
                            placeholder="Your name"
                        />
                        {errors.author && <span className="error-message">{errors.author}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="categoryId" className="form-label">
                            Category *
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className={`form-select ${errors.categoryId ? 'error' : ''}`}
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

                    <div className="form-group">
                        <label htmlFor="readTime" className="form-label">
                            Read Time *
                        </label>
                        <input
                            type="text"
                            id="readTime"
                            name="readTime"
                            value={formData.readTime}
                            onChange={handleChange}
                            className={`form-input ${errors.readTime ? 'error' : ''}`}
                            placeholder="e.g., 5 min read"
                        />
                        {errors.readTime && <span className="error-message">{errors.readTime}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="content" className="form-label">
                        Content * <span className="label-hint">(Markdown supported)</span>
                    </label>
                    <div className="formatting-toolbar">
                        <button type="button" onClick={() => insertHeading(1)} title="Heading 1" className="toolbar-btn">
                            <span className="material-symbols-outlined">format_h1</span>
                        </button>
                        <button type="button" onClick={() => insertHeading(2)} title="Heading 2" className="toolbar-btn">
                            <span className="material-symbols-outlined">format_h2</span>
                        </button>
                        <button type="button" onClick={() => insertHeading(3)} title="Heading 3" className="toolbar-btn">
                            <span className="material-symbols-outlined">format_h3</span>
                        </button>
                        <div className="toolbar-divider"></div>
                        <button type="button" onClick={insertBold} title="Bold" className="toolbar-btn">
                            <span className="material-symbols-outlined">format_bold</span>
                        </button>
                        <button type="button" onClick={insertItalic} title="Italic" className="toolbar-btn">
                            <span className="material-symbols-outlined">format_italic</span>
                        </button>
                        <button type="button" onClick={insertCode} title="Inline Code" className="toolbar-btn">
                            <span className="material-symbols-outlined">code</span>
                        </button>
                        <button type="button" onClick={insertCodeBlock} title="Code Block" className="toolbar-btn">
                            <span className="material-symbols-outlined">code_blocks</span>
                        </button>
                        <div className="toolbar-divider"></div>
                        <button type="button" onClick={insertLink} title="Link" className="toolbar-btn">
                            <span className="material-symbols-outlined">link</span>
                        </button>
                        <button type="button" onClick={insertImage} title="Image" className="toolbar-btn">
                            <span className="material-symbols-outlined">image</span>
                        </button>
                        <div className="toolbar-divider"></div>
                        <button type="button" onClick={insertList} title="Bullet List" className="toolbar-btn">
                            <span className="material-symbols-outlined">format_list_bulleted</span>
                        </button>
                        <button type="button" onClick={insertQuote} title="Quote" className="toolbar-btn">
                            <span className="material-symbols-outlined">format_quote</span>
                        </button>
                        <button type="button" onClick={insertTable} title="Table" className="toolbar-btn">
                            <span className="material-symbols-outlined">table</span>
                        </button>
                    </div>
                    <textarea
                        ref={contentTextareaRef}
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className={`form-textarea content-textarea ${errors.content ? 'error' : ''}`}
                        placeholder="Write your article content in Markdown format...

## Example Heading

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

```javascript
const code = 'example';
```"
                        rows={15}
                    />
                    {errors.content && <span className="error-message">{errors.content}</span>}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/articles')}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        <span className="material-symbols-outlined">publish</span>
                        Publish Article
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewArticle;
