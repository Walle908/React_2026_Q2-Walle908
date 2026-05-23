import { type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { ErrorMessage } from '../../constants/constants';
import Card from '../Card/Card';
import { Text } from '../Text/Text';
import styles from './ResultBlock.module.css';

interface ResultSectionProps {
  chars: Character[];
  errorMessage: ErrorMessage;
}

export default function ResultBlock({ chars, errorMessage }: ResultSectionProps): ReactNode {
  if (errorMessage !== ErrorMessage.NO_ERROR) {
    return (
      <div className={styles.resultBlock}>
        <Text as="h2" className={styles.badResult} data-testid="bad-result">
          {errorMessage}
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.resultBlock}>
      <div className={styles.cardsWrapper}>
        {chars.map((char) => (
          <Card key={char.id} char={char} />
        ))}
      </div>
    </div>
  );
}
