import { type ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage(): ReactNode {
  return (
    <div className={styles.notFoundWrapper}>
      <h2 className={styles.errorPageTitle}>Error 404</h2>
      <h2 className={styles.errorPageTitle}>Page not found</h2>
      <Link className="link" to="/">
        <button className="button">Go to main page</button>
      </Link>
    </div>
  );
}
