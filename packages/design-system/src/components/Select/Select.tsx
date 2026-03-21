import { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const css = `
.cm-select {
  display: block;
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #111827;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 0.75rem center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  appearance: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
  box-sizing: border-box;
}
.cm-select:focus {
  outline: none;
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.15);
}
.cm-select:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  opacity: 0.7;
}
.cm-select--error {
  border-color: #dc2626;
}
.cm-select--error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  const id = '__cm-select-styles__';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className = '', ...rest }, ref) => {
    injectStyles();
    const classes = [
      'cm-select',
      error ? 'cm-select--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    return <select ref={ref} className={classes} {...rest} />;
  },
);

Select.displayName = 'Select';
