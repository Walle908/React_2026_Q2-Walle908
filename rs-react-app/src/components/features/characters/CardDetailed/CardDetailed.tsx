import { type ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import buildUrl from '@/utils/buildUrl';
import { CardDetailsContent } from '@/components/features/characters';
import { type Character } from '@/types/types';
import { Text, ModalCard } from '@/components/ui';
import { ErrorMessage } from '@/constants/constants';
import styles from './CardDetailed.module.css';

interface CardDetailedProps {
  char: Character | null;
  errorMessage: string;
  currentPage: number;
  currentQuery: string;
}

export async function CardDetailed({
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
      <ModalCard className={styles.rightPanelDetails} closePath={closePath}>
        <div className={styles.errorWrapper}>
          <Text as="h2" className={styles.errorTitle} size="lg">
            {errorMessage}
          </Text>
        </div>
      </ModalCard>
    );
  }

  if (!char) {
    return null;
  }

  return (
    <ModalCard className={styles.rightPanelDetails} closePath={closePath}>
      <CardDetailsContent character={char} />
    </ModalCard>
  );
}
