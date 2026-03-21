import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'cm-btn--primary',
  secondary: 'cm-btn--secondary',
  danger: 'cm-btn--danger',
  ghost: 'cm-btn--ghost',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'cm-btn--sm',
  md: 'cm-btn--md',
  lg: 'cm-btn--lg',
};

const css = `
.cm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.1s ease;
  white-space: nowrap;
  text-decoration: none;
}
.cm-btn:focus-visible {
  outline: 2px solid #4fc3f7;
  outline-offset: 2px;
}
.cm-btn:disabled,
.cm-btn--loading {
  opacity: 0.5;
  cursor: not-allowed;
}
.cm-btn:not(:disabled):not(.cm-btn--loading):hover {
  opacity: 0.88;
}
.cm-btn:not(:disabled):not(.cm-btn--loading):active {
  transform: scale(0.97);
}

/* Variants */
.cm-btn--primary  { background: #1d4ed8; color: #fff; }
.cm-btn--secondary { background: #f3f4f6; color: #111827; border: 1px solid #d1d5db; }
.cm-btn--danger   { background: #dc2626; color: #fff; }
.cm-btn--ghost    { background: transparent; color: #1d4ed8; }

/* Sizes */
.cm-btn--sm { padding: 0.375rem 0.75rem;  font-size: 0.8125rem; }
.cm-btn--md { padding: 0.5rem  1rem;       font-size: 0.9375rem; }
.cm-btn--lg { padding: 0.75rem 1.5rem;    font-size: 1.0625rem; }
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  const id = '__cm-btn-styles__';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    injectStyles();

    const classes = [
      'cm-btn',
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      loading ? 'cm-btn--loading' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {loading ? <span aria-hidden="true">…</span> : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
