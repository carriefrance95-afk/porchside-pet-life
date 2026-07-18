import React from 'react';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      hasError = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        className={[
          'min-h-12 w-full rounded-[var(--radius-md)] border bg-white px-4 text-base',
          'text-[var(--color-charcoal-900)] shadow-[var(--shadow-inset)] transition',
          'placeholder:text-[var(--color-charcoal-500)]',
          'focus:border-[var(--color-terracotta-500)] focus:outline-none focus:ring-4 focus:ring-[var(--color-terracotta-100)]',
          'disabled:cursor-not-allowed disabled:bg-[var(--color-cream-200)] disabled:opacity-70',
          hasError
            ? 'border-[var(--color-danger)]'
            : 'border-[var(--color-border-strong)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;