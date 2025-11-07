import './DeleteConfirmModal.css';

/**
 * Props interface for DeleteConfirmModal component
 */
interface DeleteConfirmModalProps {
    isOpen: boolean; // Whether the modal is visible
    articleTitle: string; // Title of article being deleted (for confirmation message)
    onClose: () => void; // Callback to close modal without deleting
    onConfirm: () => void; // Callback to confirm deletion
}

/**
 * DeleteConfirmModal component that asks user to confirm article deletion
 * Prevents accidental deletion by requiring explicit confirmation
 * 
 * @param {DeleteConfirmModalProps} props - Component props
 */
function DeleteConfirmModal({ isOpen, articleTitle, onClose, onConfirm }: DeleteConfirmModalProps) {
    // Don't render anything if modal is closed
    if (!isOpen) return null;

    return (
        // Modal overlay - clicking it closes the modal
        <div className="delete-modal-overlay" onClick={onClose}>
            {/* Modal content - stops propagation to prevent closing when clicking inside */}
            <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Warning icon */}
                <div className="delete-modal-icon">
                    <span className="material-symbols-outlined">warning</span>
                </div>
                
                {/* Modal title */}
                <h2 className="delete-modal-title">Delete Article?</h2>
                
                {/* Confirmation message with article title */}
                <p className="delete-modal-message">
                    Are you sure you want to delete <strong>"{articleTitle}"</strong>? 
                    This action cannot be undone.
                </p>

                {/* Action buttons */}
                <div className="delete-modal-actions">
                    {/* Cancel button - closes modal */}
                    <button onClick={onClose} className="btn-cancel">
                        Cancel
                    </button>
                    {/* Delete button - confirms deletion */}
                    <button onClick={onConfirm} className="btn-delete">
                        <span className="material-symbols-outlined">delete</span>
                        Delete Article
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmModal;
