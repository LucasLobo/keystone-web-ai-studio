import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Label } from './Typography';

const inputVariants = cva(
  "flex w-full rounded-lg border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
  {
    variants: {
      state: {
        default: "border-slate-300 text-slate-900",
        error: "border-red-300 text-red-900 focus-visible:ring-red-500",
        success: "border-emerald-300 text-emerald-900 focus-visible:ring-emerald-500"
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base px-4"
      }
    },
    defaultVariants: {
      state: "default",
      size: "md"
    }
  }
);

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  icon?: React.ElementType;
}

export const Input: React.FC<InputProps> = ({ 
  className, 
  state, 
  size, 
  label, 
  error, 
  icon: Icon,
  ...props 
}) => {
  const finalState = error ? 'error' : state;

  return (
    <div className="w-full space-y-1.5">
      {label && <Label>{label}</Label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input 
          className={inputVariants({ state: finalState, size, className: Icon ? 'pl-10' : className })} 
          {...props} 
        />
      </div>
      {error && <p className="text-xs text-red-600 animate-in slide-in-from-top-1">{error}</p>}
    </div>
  );
};

// --- Text Area ---

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ className, label, error, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <Label>{label}</Label>}
      <textarea 
        className={`flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-red-300' : ''} ${className}`}
        {...props} 
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
