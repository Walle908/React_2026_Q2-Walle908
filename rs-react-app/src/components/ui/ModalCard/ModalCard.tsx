import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { LinkComponent } from '../LinkComponent/LinkComponent';
import combineClasses from '@/utils/combineClasses';
import styles from './ModalCard.module.css';

interface ModalCardProps extends ComponentPropsWithoutRef<'div'> {
  closePath: string;
  children?: ReactNode;
}
export function ModalCard({
  children,
  closePath,
  className = '',
  ...props
}: ModalCardProps): ReactNode {
  const containerClass = styles.container ? styles.container : '';
  const combinedClasses = combineClasses(containerClass, className);

  return (
    <div className={combinedClasses} {...props}>
      {children}
      <LinkComponent variant="button" href={closePath} scroll={false}>
        Close
      </LinkComponent>
    </div>
  );
}
