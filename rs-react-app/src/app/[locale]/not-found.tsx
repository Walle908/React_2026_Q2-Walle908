import { type ReactNode } from 'react';
import { LinkComponent, Text } from '@/components/ui';
import { useTranslations } from 'next-intl';
import styles from '@/styles/notFoundPage.module.css';

export default function NotFoundPage(): ReactNode {
  const t = useTranslations('App');

  return (
    <div className={styles.notFoundWrapper}>
      <Text className={styles.errorPageSubTitle} size="xl" weight="bold">
        {t('404Error')}
      </Text>
      <Text as="h1" color="error" size="xl">
        {t('pageNotFound')}
      </Text>
      <LinkComponent href="/" variant="button">
        {t('mainPageLink')}
      </LinkComponent>
    </div>
  );
}
