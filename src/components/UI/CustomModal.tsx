import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const CustomModal = (props: ModalProps) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{props.title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={props.onClose}
          >
            &#10005;
          </button>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
