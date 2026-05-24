import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  className?: string;
  variant?: 'base' | 'plain';
}

export default function Button({
  children,
  className = '',
  onClick,
  type = 'button',
  variant = 'base',
  ...props
}: ButtonProps): ReactNode {
  const variantClass = styles[variant];

  const combinedClassName = `${variantClass} ${className}`;

  return (
    <button className={combinedClassName} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  );
}
