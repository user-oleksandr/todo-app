import React from "react";
import './Modal.css';

const Modal = ({isOpen, onClose, selectedTodo}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                ×
                </span>
                <h4>Deadline Details</h4>
                {selectedTodo && (
                    <div>
                        <p>
                            <strong>deadline:</strong> {selectedTodo.text}
                        </p>
                        {selectedTodo.date && (
                            <p>
                                <strong>date:</strong> {selectedTodo.date}
                            </p>
                        )}
                        {selectedTodo.time && (
                            <p>
                                <strong>time:</strong> {selectedTodo.time}
                            </p>
                        )}
                        {selectedTodo.category && (
                            <p>
                                <strong>category:</strong> {selectedTodo.category}
                            </p>
                        )}
                        {selectedTodo.attachments && (
                            <div>
                                <strong>file:</strong>
                                {selectedTodo.attachments.map((attachment, index) => (
                                    <p key={index}>
                                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                                            {attachment.name}
                                        </a>
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
