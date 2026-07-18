import React from 'react';

type SurfaceTone = 'default' | 'soft' | 'sage';

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tone?: SurfaceTone;
  padded?: boolean;
}

const toneClasses: Record<SurfaceTone, string> = {
  default:
    'border border-[var(--color-border-soft)] bg-white shadow-[var(--shadow-card)]',
  soft:
    'border border-[var(--color-border-soft)] bg-[var(--color-cream-50)] shadow-[var(--shadow-soft)]',
  sage:
    'border border-[var(--color-sage-300)] bg-[var(--color-sage-100)] shadow-[var(--shadow-soft)]',
};

const Surface = ({
  children,
  className = '',
  tone = 'default',
  padded = true,
  ...props
}: SurfaceProps) => {
  return (
    <div
      className={[
        'rounded-[var(--radius-2xl)]',
        toneClasses[tone],
        padded ? 'p-5 sm:p-6 lg:p-8' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Surface;