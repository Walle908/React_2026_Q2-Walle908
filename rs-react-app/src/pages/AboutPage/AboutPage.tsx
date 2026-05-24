import { type ReactNode } from 'react';
import { Link } from 'react-router';
import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import styles from './AboutPage.module.css';

export default function AboutPage(): ReactNode {
  return (
    <div className={styles.aboutWrapper}>
      <Text as="h1" color="accent" size="xl">
        About App
      </Text>
      <Text className={styles.aboutAuthor} size="md">
        <Text as="span" size="md" weight="bold">
          Author:
        </Text>
        <a className={`link ${styles.aboutLink}`} href="https://github.com/Walle908">
          Elena Valiullina
        </a>
      </Text>

      <Text className={styles.aboutCourse} size="md">
        <Text as="span" size="md" weight="bold">
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
