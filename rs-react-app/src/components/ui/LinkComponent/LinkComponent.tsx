import { type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import combineClasses from '@/utils/combineClasses';
import styles from './LinkComponent.module.css';

interface LinkComponentProps extends LinkProps {
  variant?: 'baseLink' | 'buttonLink' | 'cardLink';
}

export default function LinkComponent({
  children,
  className = '',
  variant = 'baseLink',
  ...props
}: LinkComponentProps): ReactNode {
  const baseClass = styles.baseLink ? styles.baseLink : '';
  const variantClass = styles[variant] ? styles[variant] : '';

  const combinedClasses = combineClasses(baseClass, variantClass, className);

  return (
    <Link className={combinedClasses} {...props}>
      {children}
    </Link>
  );
}
