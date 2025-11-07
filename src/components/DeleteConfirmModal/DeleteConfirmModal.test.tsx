import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirmModal from './DeleteConfirmModal';

describe('DeleteConfirmModal', () => {
    it('does not render when isOpen is false', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        const { container } = render(
            <DeleteConfirmModal
                isOpen={false}
                articleTitle="Test Article"
                onClose={mockClose}
                onConfirm={mockConfirm}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('renders when isOpen is true', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="Test Article"
                onClose={mockClose}
                onConfirm={mockConfirm}
            />
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/Delete Article\?/i)).toBeInTheDocument();
    });

    it('displays article title in confirmation message', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="My Important Article"
                onClose={mockClose}
                onConfirm={mockConfirm}
            />
        );

        expect(screen.getByText(/My Important Article/i)).toBeInTheDocument();
        expect(screen.getByText(/This action cannot be undone/i)).toBeInTheDocument();
    });

    it('calls onClose when cancel button is clicked', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="Test Article"
                onClose={mockClose}
                onConfirm={mockConfirm}
            />
        );

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        expect(mockClose).toHaveBeenCalledTimes(1);
        expect(mockConfirm).not.toHaveBeenCalled();
    });

    it('calls onConfirm when delete button is clicked', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="Test Article"
                onClose={mockClose}
                onConfirm={mockConfirm}
            />
        );

        const deleteButton = screen.getByRole('button', { name: /confirm deletion/i });
        fireEvent.click(deleteButton);

        expect(mockConfirm).toHaveBeenCalledTimes(1);
        expect(mockClose).not.toHaveBeenCalled();
    });

    it('calls onClose when overlay is clicked', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="Test Article"
                onClose={mockClose}
                onConfirm={mockConfirm}
            />
        );

        const overlay = screen.getByRole('dialog');
        fireEvent.click(overlay);

        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('does not close when modal content is clicked', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="Test Article"
                onClose={mockClose}
                onConfirm={mockConfirm}
            />
        );

        const modalContent = screen.getByText(/Delete Article\?/i).closest('.delete-modal-content');
        if (modalContent) {
            fireEvent.click(modalContent);
        }

        expect(mockClose).not.toHaveBeenCalled();
    });

    it('uses custom title when provided', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="Test Draft"
                onClose={mockClose}
                onConfirm={mockConfirm}
                title="Delete Draft?"
            />
        );

        expect(screen.getByText('Delete Draft?')).toBeInTheDocument();
        expect(screen.queryByText('Delete Article?')).not.toBeInTheDocument();
    });

    it('uses custom button text when provided', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="Test Draft"
                onClose={mockClose}
                onConfirm={mockConfirm}
                buttonText="Delete Draft"
            />
        );

        // Check the button contains the custom text
        expect(screen.getByText('Delete Draft')).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="Test Article"
                onClose={mockClose}
                onConfirm={mockConfirm}
            />
        );

        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby', 'delete-modal-title');
        expect(dialog).toHaveAttribute('aria-describedby', 'delete-modal-description');
    });

    it('displays warning icon', () => {
        const mockClose = vi.fn();
        const mockConfirm = vi.fn();

        render(
            <DeleteConfirmModal
                isOpen={true}
                articleTitle="Test Article"
                onClose={mockClose}
                onConfirm={mockConfirm}
            />
        );

        const warningIcon = screen.getByText('warning');
        expect(warningIcon).toBeInTheDocument();
        expect(warningIcon.closest('.delete-modal-icon')).toHaveAttribute('aria-hidden', 'true');
    });
});
