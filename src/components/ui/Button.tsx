import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'quiet';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border border-[var(--color-terracotta-700)] bg-[var(--color-terracotta-500)] text-white shadow-[var(--shadow-raised)] hover:bg-[var(--color-terracotta-600)] active:translate-y-[2px] active:shadow-[0_4px_0_rgba(143,73,44,0.18),0_8px_18px_rgba(72,61,51,0.1)]',
  secondary:
    'border border-[var(--color-border-strong)] bg-white text-[var(--color-charcoal-900)] shadow-[var(--shadow-soft)] hover:bg-[var(--color-cream-50)] active:translate-y-[1px]',
  quiet:
    'border border-transparent bg-transparent text-[var(--color-terracotta-700)] hover:bg-[var(--color-terracotta-100)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  small: 'min-h-10 px-4 text-sm',
  medium: 'min-h-12 px-5 text-base',
  large: 'min-h-14 px-7 text-lg',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      isLoading = false,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-terracotta-100)]',
          'disabled:cursor-not-allowed disabled:opacity-60',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;