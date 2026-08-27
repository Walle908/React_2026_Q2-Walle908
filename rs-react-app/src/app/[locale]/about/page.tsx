import { type ReactNode } from 'react';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import Text from '@/components/ui/Text/Text';
import { getTranslations } from 'next-intl/server';
import styles from '@/styles/aboutPage.module.css';

export default async function AboutPage(): Promise<ReactNode> {
  const t = await getTranslations('App');

  return (
    <div className={styles.aboutWrapper}>
      <Text as="h1" color="accent" size="xl">
        {t('aboutTitle')}
      </Text>
      <Text className={styles.description} color="additional" size="md" weight="bold">
        {t('description')}
      </Text>
      <Text className={styles.aboutAuthor} size="md">
        <Text as="span" size="md" weight="bold">
          {t('author')}
        </Text>
        <LinkComponent href="https://github.com/Walle908" rel="noreferrer" target="_blank">
          {t('authorName')}
        </LinkComponent>
      </Text>

      <Text className={styles.aboutCourse} size="md">
        <Text as="span" size="md" weight="bold">
          {t('courseLink')}
        </Text>
        <LinkComponent href="https://rs.school/courses/reactjs" rel="noreferrer" target="_blank">
          {t('rsSchool')}
        </LinkComponent>
      </Text>
    </div>
  );
}
