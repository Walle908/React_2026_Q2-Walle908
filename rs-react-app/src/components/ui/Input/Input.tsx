import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import styles from './Input.module.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string;
  variant: 'checkbox' | 'search' | 'text';
}

export default function Input({ className = '', variant, ...props }: InputProps): ReactNode {
  const variantClass = styles[variant];
  const combinedClassName = `${variantClass} ${className}`.trim();

  return <input className={combinedClassName} {...props} />;
}
