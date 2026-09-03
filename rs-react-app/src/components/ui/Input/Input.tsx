import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import combineClasses from '@/utils/combineClasses';
import styles from './Input.module.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string;
  variant: 'checkbox' | 'search';
}

export function Input({ className = '', variant, ...props }: InputProps): ReactNode {
  const variantClass = styles[variant] ? styles[variant] : '';
  const combinedClasses = combineClasses(variantClass, className);

  return <input className={combinedClasses} {...props} />;
}
