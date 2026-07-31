import { type ReactNode } from 'react';
import Card from '@/components/features/characters/Card/Card';
import Text from '@/components/ui/Text/Text';
import { ErrorMessage } from '@/constants/constants';
import { type Character } from '@/types/types';
import { useTranslations } from 'next-intl';
import styles from './ResultBlock.module.css';

interface ResultSectionProps {
  chars: Character[];
  errorMessage: string;
  currentPage: number;
  currentQuery: string;
}

export default function ResultBlock({
  chars,
  errorMessage,
  currentPage,
  currentQuery,
}: ResultSectionProps): ReactNode {
  const t = useTranslations('App');

  if (errorMessage !== t(ErrorMessage.NO_ERROR)) {
    return (
      <div className={styles.resultBlock}>
        <Text as="h2" className={styles.badResult} data-testid="bad-result" size="lg">
          {errorMessage}
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.resultBlock}>
      <div className={styles.cardsWrapper}>
        {chars.map((char, index) => (
          <Card
            char={char}
            index={index}
            key={char.id}
            currentPage={currentPage}
            currentQuery={currentQuery}
          />
        ))}
      </div>
    </div>
  );
}
