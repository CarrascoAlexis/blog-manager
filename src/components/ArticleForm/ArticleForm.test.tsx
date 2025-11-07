import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArticleForm, { type ArticleFormData } from './ArticleForm';
import type { category } from '../../shared/interfaces';

// Mock categories
const mockCategories: category[] = [
    { id: '1', name: 'Technology', color: '#3b82f6' },
    { id: '2', name: 'Science', color: '#10b981' },
    { id: '3', name: 'Business', color: '#f59e0b' }
];

// Initial form data
const initialFormData: ArticleFormData = {
    title: '',
    excerpt: '',
    author: '',
    categoryId: '',
    readTime: '',
    content: ''
};

describe('ArticleForm', () => {
    it('renders all form fields', () => {
        const mockSubmit = vi.fn();
        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                submitLabel="Publish"
            />
        );

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/excerpt/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/read time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    });

    it('displays validation errors for empty required fields', async () => {
        const mockSubmit = vi.fn();
        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                submitLabel="Publish"
            />
        );

        const submitButton = screen.getByRole('button', { name: /publish/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Title is required')).toBeInTheDocument();
            expect(screen.getByText('Excerpt is required')).toBeInTheDocument();
            expect(screen.getByText('Author is required')).toBeInTheDocument();
            expect(screen.getByText('Category is required')).toBeInTheDocument();
            expect(screen.getByText('Read time is required')).toBeInTheDocument();
            expect(screen.getByText('Content is required')).toBeInTheDocument();
        });

        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('clears error when user starts typing in field', async () => {
        const mockSubmit = vi.fn();
        
        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                submitLabel="Publish"
            />
        );

        // Trigger validation errors
        const submitButton = screen.getByRole('button', { name: /publish/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Title is required')).toBeInTheDocument();
        });

        // Type in title field
        const titleInput = screen.getByLabelText(/title/i);
        fireEvent.change(titleInput, { target: { value: 'New Title' } });

        // Error should be cleared
        await waitFor(() => {
            expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
        });
    });

    it('submits form with valid data', async () => {
        const mockSubmit = vi.fn();
        const validFormData: ArticleFormData = {
            title: 'Test Article',
            excerpt: 'Test excerpt',
            author: 'John Doe',
            categoryId: '1',
            readTime: '5 min',
            content: 'Test content'
        };

        render(
            <ArticleForm
                formData={validFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                submitLabel="Publish"
            />
        );

        const submitButton = screen.getByRole('button', { name: /publish/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith(validFormData);
        });
    });

    it('renders category options correctly', () => {
        const mockSubmit = vi.fn();
        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                submitLabel="Publish"
            />
        );

        const categorySelect = screen.getByLabelText(/category/i);
        expect(categorySelect).toBeInTheDocument();

        mockCategories.forEach(category => {
            expect(screen.getByRole('option', { name: category.name })).toBeInTheDocument();
        });
    });

    it('shows cancel button when showCancel is true', () => {
        const mockSubmit = vi.fn();
        const mockCancel = vi.fn();

        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                onCancel={mockCancel}
                showCancel={true}
                submitLabel="Publish"
            />
        );

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        expect(cancelButton).toBeInTheDocument();
        
        fireEvent.click(cancelButton);
        expect(mockCancel).toHaveBeenCalled();
    });

    it('does not show cancel button when showCancel is false', () => {
        const mockSubmit = vi.fn();
        const mockCancel = vi.fn();

        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                onCancel={mockCancel}
                showCancel={false}
                submitLabel="Publish"
            />
        );

        expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
    });

    it('shows save draft button when onSaveDraft is provided', () => {
        const mockSubmit = vi.fn();
        const mockSaveDraft = vi.fn();

        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                onSaveDraft={mockSaveDraft}
                submitLabel="Publish"
            />
        );

        const draftButton = screen.getByRole('button', { name: /save as draft/i });
        expect(draftButton).toBeInTheDocument();
    });

    it('handles save draft with validation errors', async () => {
        const mockSubmit = vi.fn();
        const mockSaveDraft = vi.fn().mockReturnValue({
            title: 'Title is required to save as draft',
            categoryId: 'Category is required to save as draft'
        });

        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                onSaveDraft={mockSaveDraft}
                submitLabel="Publish"
            />
        );

        const draftButton = screen.getByRole('button', { name: /save as draft/i });
        fireEvent.click(draftButton);

        await waitFor(() => {
            expect(mockSaveDraft).toHaveBeenCalled();
            expect(screen.getByText('Title is required to save as draft')).toBeInTheDocument();
            expect(screen.getByText('Category is required to save as draft')).toBeInTheDocument();
        });
    });

    it('handles successful save draft', async () => {
        const mockSubmit = vi.fn();
        const mockSaveDraft = vi.fn().mockReturnValue(null);
        const validFormData: ArticleFormData = {
            title: 'Draft Article',
            excerpt: '',
            author: '',
            categoryId: '1',
            readTime: '',
            content: ''
        };

        render(
            <ArticleForm
                formData={validFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                onSaveDraft={mockSaveDraft}
                submitLabel="Publish"
            />
        );

        const draftButton = screen.getByRole('button', { name: /save as draft/i });
        fireEvent.click(draftButton);

        await waitFor(() => {
            expect(mockSaveDraft).toHaveBeenCalledWith(validFormData);
        });
    });

    it('uses custom submit label', () => {
        const mockSubmit = vi.fn();

        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                submitLabel="Create Article"
            />
        );

        expect(screen.getByRole('button', { name: /create article/i })).toBeInTheDocument();
    });

    it('has markdown toolbar buttons', () => {
        const mockSubmit = vi.fn();

        render(
            <ArticleForm
                formData={initialFormData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                submitLabel="Publish"
            />
        );

        // Check for some toolbar buttons
        expect(screen.getByTitle(/bold/i)).toBeInTheDocument();
        expect(screen.getByTitle(/italic/i)).toBeInTheDocument();
        expect(screen.getByTitle(/heading 1/i)).toBeInTheDocument();
        expect(screen.getByTitle(/link/i)).toBeInTheDocument();
    });
});
