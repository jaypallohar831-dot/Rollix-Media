import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/* ============================================
   CONTAINER — Constrains content width with
   premium horizontal padding.
   ============================================ */

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Maximum width variant */
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

const containerSizes = {
  narrow: 'max-w-[900px]',
  default: 'max-w-[1200px]',
  wide: 'max-w-[1400px]',
  full: 'max-w-none',
};

export function Container({
  children,
  className,
  size = 'default',
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 sm:px-10 lg:px-16',
        containerSizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}

/* ============================================
   SECTION — Full-width section wrapper with
   cinematic vertical rhythm.
   ============================================ */

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Vertical padding size */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to add the default dark background */
  withBackground?: boolean;
}

const sectionSpacing = {
  none: '',
  sm: 'py-16 sm:py-20',
  md: 'py-20 sm:py-28 lg:py-32',
  lg: 'py-28 sm:py-36 lg:py-44',
  xl: 'py-36 sm:py-44 lg:py-56',
};

export function Section({
  children,
  id,
  className,
  spacing = 'lg',
  withBackground = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        sectionSpacing[spacing],
        withBackground && 'bg-[#050505]',
        className
      )}
    >
      {children}
    </section>
  );
}

/* ============================================
   SECTION HEADER — Reusable heading block
   for top of each section.
   ============================================ */

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  /** Optional highlighted word in the title (will be italic + gradient) */
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  // If highlight is provided, split the title around it
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) {
      return <span>{title}</span>;
    }
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-gradient-warm italic">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={cn(
        'mb-16 sm:mb-20 lg:mb-24',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80 sm:mb-6">
          <span className="h-[1px] w-6 bg-cinematic-orange/40" />
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          'font-heading text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-foreground',
          align === 'center' && 'mx-auto max-w-[800px]'
        )}
      >
        {renderTitle()}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg sm:leading-relaxed',
            align === 'center' && 'mx-auto max-w-[520px]'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ============================================
   DIVIDER — Subtle section separator.
   ============================================ */

interface DividerProps {
  className?: string;
  variant?: 'line' | 'gradient' | 'dot';
}

export function Divider({ className, variant = 'gradient' }: DividerProps) {
  if (variant === 'dot') {
    return (
      <div className={cn('flex items-center justify-center py-4', className)}>
        <span className="h-1 w-1 rounded-full bg-cinematic-orange/40" />
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <div className={cn('mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16', className)}>
        <div className="h-[1px] w-full bg-white/[0.04]" />
      </div>
    );
  }

  return (
    <div className={cn('mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16', className)}>
      <div
        className="h-[1px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}

/* ============================================
   SPACER — Vertical breathing room.
   ============================================ */

interface SpacerProps {
  /** Size in the spacing scale */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const spacerSizes = {
  xs: 'h-8 sm:h-10',
  sm: 'h-12 sm:h-16',
  md: 'h-16 sm:h-24',
  lg: 'h-24 sm:h-32 lg:h-40',
  xl: 'h-32 sm:h-44 lg:h-56',
  '2xl': 'h-44 sm:h-56 lg:h-72',
};

export function Spacer({ size = 'md', className }: SpacerProps) {
  return <div className={cn(spacerSizes[size], className)} aria-hidden="true" />;
}
