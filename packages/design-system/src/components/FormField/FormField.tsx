import { HTMLAttributes, ReactNode, useId } from 'react';
import { Label } from '../Label/Label';

export interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode | ((id: string) => ReactNode);
}

const css = `
.cm-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.cm-form-field__error {
  font-size: 0.8125rem;
  color: #dc2626;
  margin-top: 0.125rem;
}
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  const id = '__cm-form-field-styles__';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export function FormField({
  label,
  error,
  required,
  className = '',
  children,
  ...rest
}: FormFieldProps) {
  injectStyles();
  const id = useId();
  const controlId = `cm-field-${id}`;

  return (
    <div className={`cm-form-field ${className}`.trim()} {...rest}>
      <Label htmlFor={controlId} required={required}>
        {label}
      </Label>
      {typeof children === 'function' ? children(controlId) : children}
      {error && (
        <span className="cm-form-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
