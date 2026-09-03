import { Link } from '@/i18n/navigation';
import type { AnchorHTMLAttributes, ReactNode, ComponentPropsWithoutRef } from 'react';
import combineClasses from '@/utils/combineClasses';
import styles from './LinkComponent.module.css';

type I18nLinkProps = ComponentPropsWithoutRef<typeof Link>;
interface LinkComponentProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof I18nLinkProps>, I18nLinkProps {
  variant?: 'base' | 'button' | 'card';
}

export function LinkComponent({
  children,
  className = '',
  href,
  variant = 'base',
  ...props
}: LinkComponentProps): ReactNode {
  const baseClass = styles.base ? styles.base : '';
  const variantClass = styles[variant] ? styles[variant] : '';

  const combinedClasses = combineClasses(baseClass, variantClass, className);

  return (
    <Link className={combinedClasses} href={href} {...props}>
      {children}
    </Link>
  );
}
