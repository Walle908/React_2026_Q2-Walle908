import { type ReactNode } from 'react';
import Card from '@/components/features/characters/Card/Card';
import Text from '@/components/ui/Text/Text';
import { ErrorMessage } from '@/constants/constants';
import { type Character } from '@/types/types';
import styles from './ResultBlock.module.css';

interface ResultSectionProps {
  chars: Character[];
  errorMessage: ErrorMessage;
}

export default function ResultBlock({ chars, errorMessage }: ResultSectionProps): ReactNode {
  if (errorMessage !== ErrorMessage.NO_ERROR) {
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
        {chars.map((char) => (
          <Card char={char} key={char.id} />
        ))}
      </div>
    </div>
  );
}
