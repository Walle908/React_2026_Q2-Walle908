import { type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { ErrorMessage } from '../../constants/constants';
import Card from '../Card/Card';
import styles from './ResultBlock.module.css';

interface ResultSectionProps {
  chars: Character[];
  errorMessage: ErrorMessage;
}

export default function ResultBlock({ chars, errorMessage }: ResultSectionProps): ReactNode {
  return (
    <div className={styles.resultBlock}>
      <div className={styles.cardsWrapper}>
        {chars.length > 0
          ? chars.map((char) => <Card key={char.id} char={char} />)
          : errorMessage !== ErrorMessage.NO_ERROR && (
              <h2 className={styles.badResult}>{errorMessage}</h2>
            )}
      </div>
    </div>
  );
}
