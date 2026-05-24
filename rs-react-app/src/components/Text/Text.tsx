import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Text.module.css';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  className?: string;
  color?: 'accent' | 'base' | 'error';
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
  const sizeClass = styles[size];
  const variantClass = styles[color];
  const weightClass = styles[weight];

  const combinedClassName = `${sizeClass} ${weightClass} ${variantClass} ${className}`;

  return (
    <Tag className={combinedClassName} {...props}>
      {children}
    </Tag>
  );
}
