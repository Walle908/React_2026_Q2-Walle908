import type { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Text.module.css';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  className?: string;
  color?: 'default' | 'accent' | 'accent2' | 'error';
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  weight?: 'bold' | 'medium' | 'normal';
}

export default function Text({
  as = 'p',
  children,
  className = '',
  color = 'default',
  size = 'sm',
  weight = 'normal',

  ...props
}: TextProps): ReactNode {
  const Tag = as;
  const sizeClass = styles[size] ? styles[size] : '';
  const colorClass = styles[color] ? styles[color] : '';
  const weightClass = styles[weight] ? styles[weight] : '';

  const combinedClasses = classNames(sizeClass, colorClass, weightClass, className);

  return (
    <Tag className={combinedClasses} {...props}>
      {children}
    </Tag>
  );
}
