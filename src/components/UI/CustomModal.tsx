import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const CustomModal = (props: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    if (props.isOpen) {
      setIsAnimating(true);
      // Add slight delay before show effect
      setTimeout(() => {
        setShowEffect(true);
      }, 50);
    } else {
      setShowEffect(false);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [props.isOpen]);

  if (!props.isOpen && !isAnimating) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        props.isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={props.onClose}></div>
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative
          transition-all duration-300 transform
          ${showEffect ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{props.title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            onClick={props.onClose}
          >
            &#10005;
          </button>
        </div>
        <div className="text-gray-900 dark:text-white">{props.children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
