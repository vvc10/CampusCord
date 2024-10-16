// Modal.js
import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
<div className="bg-white rounded-lg p-6 w-[80%] h-fit mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-[26px] text-gray-500">
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
