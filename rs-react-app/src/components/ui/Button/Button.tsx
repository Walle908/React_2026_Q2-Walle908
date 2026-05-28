import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  className?: string;
  color?: 'baseBg' | 'errorBg' | 'noBg';
  variant?: 'base' | 'plain';
}

export default function Button({
  children,
  className = '',
  color = 'baseBg',
  onClick,
  type = 'button',
  variant = 'base',
  ...props
}: ButtonProps): ReactNode {
  const variantClass = styles[variant];
  const colorClass = styles[color];
  const combinedClassName = `${variantClass} ${colorClass} ${className}`.trim();

  return (
    <button className={combinedClassName} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  );
}
