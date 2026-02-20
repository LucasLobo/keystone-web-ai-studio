import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500 shadow-sm",
        secondary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900 shadow-sm",
        outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 focus:ring-slate-500",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
        link: "text-brand-600 underline-offset-4 hover:underline p-0 h-auto"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-2"
      },
      fullWidth: {
        true: "w-full",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant, 
  size, 
  fullWidth, 
  isLoading, 
  icon: Icon,
  children, 
  disabled,
  ...props 
}) => {
  return (
    <button 
      className={buttonVariants({ variant, size, fullWidth, className })} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};
