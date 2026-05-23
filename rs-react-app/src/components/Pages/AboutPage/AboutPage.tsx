import { type ReactNode } from 'react';
import { Link } from 'react-router';
import Button from '@components/Button/Button';
import Text from '@components/Text/Text';
import styles from './AboutPage.module.css';

export default function AboutPage(): ReactNode {
  return (
    <div className={styles.aboutWrapper}>
      <Text as="h1">About App</Text>
      <Text className={styles.aboutAuthor}>
        <Text as="span" className={styles.aboutText}>
          Author:{' '}
        </Text>
        <a className={`link ${styles.aboutLink}`} href="https://github.com/Walle908">
          Elena Valiullina
        </a>
      </Text>

      <Text className={styles.aboutCourse}>
        <Text as="span" className={styles.aboutText}>
          Link to the course:
        </Text>
        <a className={`link ${styles.aboutLink}`} href="https://rs.school/courses/reactjs">
          RS School React course
        </a>
      </Text>
      <Link className="link" to="/">
        <Button>Go to main page</Button>
      </Link>
    </div>
  );
}
