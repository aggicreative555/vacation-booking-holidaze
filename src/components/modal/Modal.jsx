import { X } from "lucide-react";
import { useEffect } from "react";

function Modal({ isOpen, onClose, children}) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onclose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className={`fixed inset-0 z-50 flex items-center align-center justify-center transition-opacity duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={onClose}>
            </div>
            <div
                className={`relative flex items-center flex-col bg-white shadow-lg w-full max-w-3xl max-h-[80%] overflow-y-auto p-6 transform transition-transform duration-300
                ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                <button
                onClick={onClose}
                className="fixed right-3 cursor-pointer text-gray-500 hover:text-black text-xl"
                >
                    <X/>
                </button>

                {children}
            </div>
        </div>
    )
}

export default Modal;