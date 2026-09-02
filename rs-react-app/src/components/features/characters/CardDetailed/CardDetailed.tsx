import { type ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import buildUrl from '@/utils/buildUrl';
import CardDetailsContent from '@/components/features/characters/CardDetailedContent/CardDetailedContent';
import { type Character } from '@/types/types';
import Text from '@/components/ui/Text/Text';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import { ErrorMessage } from '@/constants/constants';
import styles from './CardDetailed.module.css';

interface CardDetailedProps {
  char: Character | null;
  errorMessage: string;
  currentPage: number;
  currentQuery: string;
}

export default async function CardDetailed({
  char,
  errorMessage,
  currentPage,
  currentQuery,
}: CardDetailedProps): Promise<ReactNode> {
  const t = await getTranslations('App');

  const closeQueryObj = buildUrl(currentPage, currentQuery, null);

  const closePath = `/?${new URLSearchParams(closeQueryObj).toString()}`;

  if (errorMessage !== t(ErrorMessage.NO_ERROR)) {
    return (
      <aside className={styles.rightPanelDetails}>
        <div className={styles.errorWrapper}>
          <Text as="h2" className={styles.errorTitle} size="lg">
            {errorMessage}
          </Text>

          <LinkComponent variant="buttonLink" href={closePath} scroll={false}>
            Close
          </LinkComponent>
        </div>
      </aside>
    );
  }

  if (!char) {
    return null;
  }

  return (
    <aside className={styles.rightPanelDetails}>
      <CardDetailsContent character={char} path={closePath} />
    </aside>
  );
}
