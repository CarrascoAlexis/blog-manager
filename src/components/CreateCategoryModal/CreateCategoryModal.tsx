import { useState } from 'react';
import './CreateCategoryModal.css';

/**
 * Props interface for CreateCategoryModal component
 */
interface CreateCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (name: string, color: string, description?: string) => void;
}

// Predefined color options for categories
const COLOR_OPTIONS = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Lime', value: '#84cc16' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Amber', value: '#f59e42' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Fuchsia', value: '#d946ef' },
    { name: 'Violet', value: '#7c3aed' }
];

/**
 * CreateCategoryModal component for creating new categories
 * Allows user to input category name, description, and select a color
 */
function CreateCategoryModal({ isOpen, onClose, onConfirm }: CreateCategoryModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].value);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Don't render if modal is closed
    if (!isOpen) return null;

    /**
     * Validate form fields
     */
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) {
            newErrors.name = 'Category name is required';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Category name must be at least 2 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle form submission
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onConfirm(name.trim(), selectedColor, description.trim() || undefined);
        handleClose();
    };

    /**
     * Handle modal close and reset form
     */
    const handleClose = () => {
        setName('');
        setDescription('');
        setSelectedColor(COLOR_OPTIONS[0].value);
        setErrors({});
        onClose();
    };

    /**
     * Clear error when user starts typing
     */
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (errors.name) {
            setErrors(prev => ({ ...prev, name: '' }));
        }
    };

    return (
        <div 
            className="create-category-modal-overlay" 
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-category-modal-title"
        >
            <div className="create-category-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Modal header */}
                <div className="create-category-modal-header">
                    <h2 id="create-category-modal-title" className="create-category-modal-title">
                        <span className="material-symbols-outlined" aria-hidden="true">add_circle</span>
                        Create New Category
                    </h2>
                    <button 
                        onClick={handleClose} 
                        className="modal-close-btn"
                        aria-label="Close modal"
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">close</span>
                    </button>
                </div>

                {/* Modal form */}
                <form onSubmit={handleSubmit} className="create-category-form">
                    {/* Category name field */}
                    <div className="form-group">
                        <label htmlFor="category-name">
                            Category Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="category-name"
                            value={name}
                            onChange={handleNameChange}
                            className={errors.name ? 'error' : ''}
                            placeholder="e.g., Technology, Travel, Food"
                            autoFocus
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    {/* Category description field */}
                    <div className="form-group">
                        <label htmlFor="category-description">
                            Description <span className="optional">(Optional)</span>
                        </label>
                        <textarea
                            id="category-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of this category"
                            rows={3}
                        />
                    </div>

                    {/* Color picker */}
                    <div className="form-group">
                        <label>
                            Category Color <span className="required">*</span>
                        </label>
                        <div className="color-picker-grid">
                            {COLOR_OPTIONS.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    className={`color-option ${selectedColor === color.value ? 'selected' : ''}`}
                                    style={{ backgroundColor: color.value }}
                                    onClick={() => setSelectedColor(color.value)}
                                    aria-label={`Select ${color.name}`}
                                    title={color.name}
                                >
                                    {selectedColor === color.value && (
                                        <span className="material-symbols-outlined" aria-hidden="true">check</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="form-group">
                        <label>Preview</label>
                        <div className="category-preview">
                            <span 
                                className="preview-badge" 
                                style={{ backgroundColor: selectedColor }}
                            >
                                {name || 'Category Name'}
                            </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="modal-actions">
                        <button type="button" onClick={handleClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            <span className="material-symbols-outlined" aria-hidden="true">add</span>
                            Create Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCategoryModal;
