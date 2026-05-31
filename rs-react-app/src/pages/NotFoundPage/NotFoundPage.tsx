import { type ReactNode } from 'react';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import Text from '@/components/ui/Text/Text';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage(): ReactNode {
  return (
    <div className={styles.notFoundWrapper}>
      <Text className={styles.errorPageSubTitle} size="xl" weight="bold">
        Error 404
      </Text>
      <Text as="h1" color="error" size="xl">
        Page not found
      </Text>
      <LinkComponent to="/" variant="buttonLink">
        Go to main page
      </LinkComponent>
    </div>
  );
}
