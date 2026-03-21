import { LabelHTMLAttributes, forwardRef } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const css = `
.cm-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.25rem;
}
.cm-label__required {
  color: #dc2626;
  margin-left: 0.25rem;
  aria-hidden: true;
}
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  const id = '__cm-label-styles__';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className = '', children, ...rest }, ref) => {
    injectStyles();
    return (
      <label ref={ref} className={`cm-label ${className}`.trim()} {...rest}>
        {children}
        {required && (
          <span className="cm-label__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
