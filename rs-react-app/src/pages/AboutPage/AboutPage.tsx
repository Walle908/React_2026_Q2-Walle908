import { type ReactNode } from 'react';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
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
        <a className={styles.link} href="https://github.com/Walle908">
          Elena Valiullina
        </a>
      </Text>

      <Text className={styles.aboutCourse} size="md">
        <Text as="span" size="md" weight="bold">
          Link to the course:
        </Text>
        <a className={styles.link} href="https://rs.school/courses/reactjs">
          RS School React course
        </a>
      </Text>
      <LinkComponent to="/" variant="buttonLink">
        Go to main page
      </LinkComponent>
    </div>
  );
}
