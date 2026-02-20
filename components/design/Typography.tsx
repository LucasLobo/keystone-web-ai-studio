import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// --- Headings ---

const headingVariants = cva("font-bold text-slate-900 tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl md:text-5xl lg:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
      h4: "text-xl md:text-2xl",
      h5: "text-lg font-bold",
      h6: "text-base font-bold uppercase tracking-wider",
    },
    font: {
      serif: "font-serif",
      sans: "font-sans",
    },
    color: {
      default: "text-slate-900",
      brand: "text-brand-600",
      muted: "text-slate-500",
      white: "text-white"
    }
  },
  defaultVariants: {
    level: "h1",
    font: "serif",
    color: "default"
  }
});

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading: React.FC<HeadingProps> = ({ className, level, font, color, as, ...props }) => {
  const Component = as || (level as any) || 'h1';
  return <Component className={headingVariants({ level, font, color, className })} {...props} />;
};

// --- Text ---

const textVariants = cva("font-sans", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-slate-900",
      muted: "text-slate-500",
      subtle: "text-slate-400",
      brand: "text-brand-600",
      white: "text-white",
      danger: "text-red-600",
      success: "text-emerald-600",
      warning: "text-amber-600"
    }
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default"
  }
});

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'label';
}

export const Text: React.FC<TextProps> = ({ className, size, weight, color, as = 'p', ...props }) => {
  const Component = as;
  return <Component className={textVariants({ size, weight, color, className })} {...props} />;
};

// --- Label ---

export const Label: React.FC<TextProps> = ({ className, ...props }) => {
  return (
    <Text 
      as="label" 
      size="xs" 
      weight="bold" 
      color="muted" 
      className={`uppercase tracking-wider mb-1 block ${className}`} 
      {...props} 
    />
  );
};
