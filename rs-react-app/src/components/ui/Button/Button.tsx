import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import combineClasses from '@/utils/combineClasses';
import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  className?: string;
  color?: 'accent' | 'base' | 'error' | 'no';
  variant?: 'default' | 'plain';
}

export default function Button({
  children,
  className = '',
  color = 'base',
  onClick,
  type = 'button',
  variant = 'default',
  ...props
}: ButtonProps): ReactNode {
  const variantClass = styles[variant] ? styles[variant] : '';
  const colorClass = styles[color] ? styles[color] : '';
  const combinedClasses = combineClasses(variantClass, colorClass, className);

  return (
    <button className={combinedClasses} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  );
}
