import { createPortal } from "react-dom";
import "./base-modal.css"

export const Modal = ({ open, onClose, children }) => {
    if (!open) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};