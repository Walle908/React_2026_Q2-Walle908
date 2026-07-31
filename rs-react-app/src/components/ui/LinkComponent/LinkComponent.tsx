import { Link } from '@/i18n/navigation';
import type { AnchorHTMLAttributes, ReactNode, ComponentPropsWithoutRef } from 'react';
import combineClasses from '@/utils/combineClasses';
import styles from './LinkComponent.module.css';

type I18nLinkProps = ComponentPropsWithoutRef<typeof Link>;
interface LinkComponentProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof I18nLinkProps>, I18nLinkProps {
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
