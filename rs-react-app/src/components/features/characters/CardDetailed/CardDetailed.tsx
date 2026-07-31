'use client';

import { type ReactNode } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import buildUrl from '@/utils/buildUrl';
import CardDetailsContent from '@/components/features/characters/CardDetailedContent/CardDetailedContent';
import Button from '@/components/ui/Button/Button';
import { type Character } from '@/types/types';
import Text from '@/components/ui/Text/Text';
import { ErrorMessage } from '@/constants/constants';
import styles from './CardDetailed.module.css';

interface CardDetailedProps {
  char: Character | null;
  errorMessage: string;
  currentPage: number;
  currentQuery: string;
}

export default function CardDetailed({
  char,
  errorMessage,
  currentPage,
  currentQuery,
}: CardDetailedProps): ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('App');

  const onClose = () => {
    const queryObj = buildUrl(currentPage, currentQuery, null);
    router.push({ pathname, query: queryObj }, { scroll: false });
  };

  const handleAsideClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  if (errorMessage !== t(ErrorMessage.NO_ERROR)) {
    return (
      <aside className={styles.rightPanelDetails} onClick={handleAsideClick}>
        <div className={styles.errorWrapper}>
          <Text as="h2" className={styles.errorTitle} size="lg">
            {errorMessage}
          </Text>
          <Button onClick={onClose}>Close</Button>
        </div>
      </aside>
    );
  }

  if (!char) {
    return null;
  }

  return (
    <aside className={styles.rightPanelDetails} onClick={handleAsideClick}>
      <CardDetailsContent character={char} onClose={onClose} />
    </aside>
  );
}
