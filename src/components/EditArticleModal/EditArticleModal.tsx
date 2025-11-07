import { useState, useRef, useEffect } from 'react';
import type { Article, category } from '../../shared/interfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import './EditArticleModal.css';

interface EditArticleModalProps {
    article: Article;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedArticle: Article) => void;
}

function EditArticleModal({ article, isOpen, onClose, onSave }: EditArticleModalProps) {
    const [categories] = useLocalStorage<category[]>('blog-categories', []);
    const [formData, setFormData] = useState<Article>(article);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setFormData(article);
    }, [article]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === 'categoryId') {
            const selectedCategory = categories.find(cat => cat.id === value);
            if (selectedCategory) {
                setFormData(prev => ({ ...prev, category: selectedCategory }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
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

        const updatedArticle: Article = {
            ...formData,
            updatedAt: new Date().toISOString()
        };

        onSave(updatedArticle);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <span className="material-symbols-outlined">edit</span>
                        Edit Article
                    </h2>
                    <button className="modal-close" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
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
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
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
                        />
                        {errors.excerpt && <span className="error-message">{errors.excerpt}</span>}
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
                            />
                            {errors.author && <span className="error-message">{errors.author}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoryId" className="form-label">Category *</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={formData.category.id}
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
                            <label htmlFor="readTime" className="form-label">Read Time *</label>
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
                            value={formData.content || ''}
                            onChange={handleChange}
                            className={`form-textarea content-textarea ${errors.content ? 'error' : ''}`}
                            placeholder="Write your article content in Markdown format..."
                            rows={15}
                        />
                        {errors.content && <span className="error-message">{errors.content}</span>}
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            <span className="material-symbols-outlined">save</span>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditArticleModal;
