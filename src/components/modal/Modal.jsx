import { X } from 'lucide-react';
import { useEffect } from 'react';

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onclose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center align-center justify-center transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className="absolute inset-0 bg-dark opacity-70"
        onClick={onClose}
      ></div>
      <div
        className={`relative flex items-center flex-col bg-light shadow-lg w-full max-w-[768px] max-h-[80%] overflow-y-auto md:px-6 px-4 mx-4 pt-6 pb-12 transform transition-transform duration-300
                ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <button
          onClick={onClose}
          className="fixed right-6 top-6 cursor-pointer text-brown-300 hover:text-black"
        >
          <X />
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
