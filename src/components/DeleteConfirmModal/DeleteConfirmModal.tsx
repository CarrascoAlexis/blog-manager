import './DeleteConfirmModal.css';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    articleTitle: string;
    onClose: () => void;
    onConfirm: () => void;
}

function DeleteConfirmModal({ isOpen, articleTitle, onClose, onConfirm }: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="delete-modal-overlay" onClick={onClose}>
            <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="delete-modal-icon">
                    <span className="material-symbols-outlined">warning</span>
                </div>
                
                <h2 className="delete-modal-title">Delete Article?</h2>
                
                <p className="delete-modal-message">
                    Are you sure you want to delete <strong>"{articleTitle}"</strong>? 
                    This action cannot be undone.
                </p>

                <div className="delete-modal-actions">
                    <button onClick={onClose} className="btn-cancel">
                        Cancel
                    </button>
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
