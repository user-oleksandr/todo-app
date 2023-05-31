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
          &times;
        </span>
                <h3>Deadline Details</h3>
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
