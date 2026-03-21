import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const css = `
.cm-textarea {
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
  resize: vertical;
  min-height: 6rem;
  box-sizing: border-box;
  font-family: inherit;
}
.cm-textarea:focus {
  outline: none;
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.15);
}
.cm-textarea::placeholder {
  color: #9ca3af;
}
.cm-textarea:disabled {
  background: #f9fafb;
  cursor: not-allowed;
  opacity: 0.7;
}
.cm-textarea--error {
  border-color: #dc2626;
}
.cm-textarea--error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  const id = '__cm-textarea-styles__';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = '', ...rest }, ref) => {
    injectStyles();
    const classes = [
      'cm-textarea',
      error ? 'cm-textarea--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    return <textarea ref={ref} className={classes} {...rest} />;
  },
);

Textarea.displayName = 'Textarea';
