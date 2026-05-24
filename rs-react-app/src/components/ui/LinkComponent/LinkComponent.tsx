import { type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import styles from './LinkComponent.module.css';

interface LinkComponentProps extends LinkProps {
  variant?: 'buttonLink' | 'cardLink';
}

export default function LinkComponent({
  children,
  className = '',
  variant,
  ...props
}: LinkComponentProps): ReactNode {
  const variantClass = variant ? styles[variant] : '';

  const combinedClassName = `${styles.baseLink} ${variantClass} ${className}`.trim();

  return (
    <Link className={combinedClassName} {...props}>
      {children}
    </Link>
  );
}
