import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  className?: string;
  variant?: 'clear' | 'close' | 'error' | 'reset';
}

export default function Button({
  children,
  className,
  onClick,
  type = 'button',
  variant,
  ...props
}: ButtonProps): ReactNode {
  const isClear = variant === 'clear';
  const baseClass = isClear ? '' : styles.baseButton;
  const variantClass = variant ? styles[variant] : '';

  const combinedClassName = `${baseClass} ${variantClass} ${className || ''}`.trim();

  return (
    <button className={combinedClassName} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  );
}
