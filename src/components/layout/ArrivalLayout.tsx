import React from 'react';

interface ArrivalLayoutProps {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  illustration?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const ArrivalLayout = ({
  children,
  eyebrow,
  title,
  description,
  illustration,
  footer,
  className = '',
}: ArrivalLayoutProps) => {
  return (
    <main
      className={[
        'min-h-screen bg-[var(--color-cream-100)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="psl-page-shell flex min-h-screen flex-col py-5 sm:py-8 lg:py-10">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)] lg:gap-12">
          <section className="flex flex-col justify-center">
            {eyebrow ? (
              <p className="psl-eyebrow mb-4">
                {eyebrow}
              </p>
            ) : null}

            {title ? (
              <h1 className="psl-display-title max-w-3xl">
                {title}
              </h1>
            ) : null}

            {description ? (
              <p className="psl-body-copy mt-5 max-w-2xl">
                {description}
              </p>
            ) : null}

            <div className="mt-8">
              {children}
            </div>
          </section>

          {illustration ? (
            <aside className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md">
                {illustration}
              </div>
            </aside>
          ) : null}
        </div>

        {footer ? (
          <footer className="mt-8 border-t border-[var(--color-border-soft)] pt-5">
            {footer}
          </footer>
        ) : null}
      </div>
    </main>
  );
};

export default ArrivalLayout;