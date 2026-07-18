import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const FormField = ({
  label,
  htmlFor,
  children,
  description,
  error,
  required = false,
  className = '',
}: FormFieldProps) => {
  return (
    <div className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-[var(--color-charcoal-900)]"
      >
        {label}

        {required ? (
          <span
            aria-hidden="true"
            className="ml-1 text-[var(--color-terracotta-600)]"
          >
            *
          </span>
        ) : null}
      </label>

      {description ? (
        <p className="text-sm leading-6 text-[var(--color-charcoal-500)]">
          {description}
        </p>
      ) : null}

      {children}

      {error ? (
        <p
          role="alert"
          className="text-sm font-medium text-[var(--color-danger)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;