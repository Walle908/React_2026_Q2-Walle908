import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import styles from './Buton.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  className?: string;
  variant?: 'error' | 'reset' | 'close' | 'clear';
}

export function Button({
  children,
  className,
  variant,
  type = 'button',
  onClick,
  ...props
}: ButtonProps): ReactNode {
  const isClear = variant === 'clear';
  const baseClass = isClear ? '' : styles.baseButton;
  const variantClass = variant ? styles[variant] : '';

  const combinedClassName = `${baseClass} ${variantClass} ${className || ''}`.trim();

  return (
    <button type={type} onClick={onClick} className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
