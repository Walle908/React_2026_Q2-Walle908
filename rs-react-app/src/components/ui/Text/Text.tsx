import type { HTMLAttributes, ReactNode } from 'react';
import combineClasses from '@/utils/combineClasses';
import styles from './Text.module.css';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  className?: string;
  color?: 'accent' | 'base' | 'error' | 'additional';
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'xxl';
  weight?: 'bold' | 'medium' | 'normal';
}

export default function Text({
  as = 'p',
  children,
  className = '',
  color = 'base',
  size = 'sm',
  weight = 'normal',

  ...props
}: TextProps): ReactNode {
  const Tag = as;
  const sizeClass = styles[size] ? styles[size] : '';
  const colorClass = styles[color] ? styles[color] : '';
  const weightClass = styles[weight] ? styles[weight] : '';

  const combinedClasses = combineClasses(sizeClass, colorClass, weightClass, className);

  return (
    <Tag className={combinedClasses} {...props}>
      {children}
    </Tag>
  );
}
