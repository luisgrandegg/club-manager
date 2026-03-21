import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const css = `
.cm-input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  box-sizing: border-box;
}
.cm-input:focus {
  outline: none;
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.15);
}
.cm-input::placeholder {
  color: #9ca3af;
}
.cm-input:disabled {
  background: #f9fafb;
  cursor: not-allowed;
  opacity: 0.7;
}
.cm-input--error {
  border-color: #dc2626;
}
.cm-input--error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  const id = '__cm-input-styles__';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...rest }, ref) => {
    injectStyles();
    const classes = ['cm-input', error ? 'cm-input--error' : '', className]
      .filter(Boolean)
      .join(' ');
    return <input ref={ref} className={classes} {...rest} />;
  },
);

Input.displayName = 'Input';
