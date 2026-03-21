import { HTMLAttributes, ReactNode, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  action?: ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const css = `
.cm-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.07);
  overflow: hidden;
}
.cm-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
}
.cm-card__header-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.cm-card__body {
  padding: 1.25rem;
}
.cm-card__footer {
  padding: 0.875rem 1.25rem;
  border-top: 1px solid #f3f4f6;
  background: #f9fafb;
}
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  const id = '__cm-card-styles__';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...rest }, ref) => {
    injectStyles();
    return (
      <div ref={ref} className={`cm-card ${className}`.trim()} {...rest}>
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, action, className = '', ...rest }, ref) => (
    <div ref={ref} className={`cm-card__header ${className}`.trim()} {...rest}>
      <h3 className="cm-card__header-title">{title}</h3>
      {action}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = '', children, ...rest }, ref) => (
    <div ref={ref} className={`cm-card__body ${className}`.trim()} {...rest}>
      {children}
    </div>
  ),
);
CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...rest }, ref) => (
    <div ref={ref} className={`cm-card__footer ${className}`.trim()} {...rest}>
      {children}
    </div>
  ),
);
CardFooter.displayName = 'CardFooter';
