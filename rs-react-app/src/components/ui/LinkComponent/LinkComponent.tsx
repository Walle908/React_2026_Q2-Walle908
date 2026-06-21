import Link, { type LinkProps } from 'next/link';
import { type AnchorHTMLAttributes, type ReactNode } from 'react';
import combineClasses from '@/utils/combineClasses';
import styles from './LinkComponent.module.css';

interface LinkComponentProps
  extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  variant?: 'baseLink' | 'buttonLink' | 'cardLink';
}

export default function LinkComponent({
  children,
  className = '',
  href,
  variant = 'baseLink',
  ...props
}: LinkComponentProps): ReactNode {
  const baseClass = styles.baseLink ? styles.baseLink : '';
  const variantClass = styles[variant] ? styles[variant] : '';

  const combinedClasses = combineClasses(baseClass, variantClass, className);

  return (
    <Link className={combinedClasses} href={href} {...props}>
      {children}
    </Link>
  );
}
