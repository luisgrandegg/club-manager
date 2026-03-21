import { HTMLAttributes, forwardRef } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const css = `
.cm-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  line-height: 1.5;
  white-space: nowrap;
}
.cm-badge--default { background: #f3f4f6; color: #374151; }
.cm-badge--success { background: #d1fae5; color: #065f46; }
.cm-badge--warning { background: #fef3c7; color: #92400e; }
.cm-badge--danger  { background: #fee2e2; color: #991b1b; }
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  const id = '__cm-badge-styles__';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className = '', ...rest }, ref) => {
    injectStyles();
    const classes = [`cm-badge`, `cm-badge--${variant}`, className]
      .filter(Boolean)
      .join(' ');
    return <span ref={ref} className={classes} {...rest} />;
  },
);

Badge.displayName = 'Badge';
