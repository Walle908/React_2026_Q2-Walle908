'use client';

import { type ReactNode } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
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

export default function CardDetailed({
  char,
  errorMessage,
  currentPage,
  currentQuery,
}: CardDetailedProps): ReactNode {
  const pathname = usePathname();
  const t = useTranslations('App');

  const closeQueryObj = buildUrl(currentPage, currentQuery, null);

  const searchParams = new URLSearchParams();
  Object.entries(closeQueryObj).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      searchParams.set(key, String(val));
    }
  });

  const closePath = `${pathname}?${searchParams.toString()}`;

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
    <aside className={styles.rightPanelDetails} onClick={handleAsideClick}>
      <CardDetailsContent character={char} path={closePath} />
    </aside>
  );
}
