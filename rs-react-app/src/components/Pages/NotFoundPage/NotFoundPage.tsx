import { type ReactNode } from 'react';
import { Link } from 'react-router';
import Button from '@components/Button/Button';
import Text from '@components/Text/Text';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage(): ReactNode {
  return (
    <div className={styles.notFoundWrapper}>
      <Text className={styles.errorPageSubTitle}>Error 404</Text>
      <Text as="h1">Page not found</Text>
      <Link className="link" to="/">
        <Button>Go to main page</Button>
      </Link>
    </div>
  );
}
