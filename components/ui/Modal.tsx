import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, AlertTriangle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  isDestructive = false,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {isDestructive && (
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
              <AlertTriangle size={24} />
            </div>
          )}
          
          <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-500 mb-6">{description}</p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              {cancelText || t('common.cancel')}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-white shadow-sm transition-colors ${
                isDestructive 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-brand-600 hover:bg-brand-700'
              }`}
            >
              {confirmText || t('common.confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
