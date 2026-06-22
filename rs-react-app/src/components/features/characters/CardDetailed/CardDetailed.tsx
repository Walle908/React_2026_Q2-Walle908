import { type ReactNode } from 'react';
import CardDetailsContent from '@/components/features/characters/CardDetailedContent/CardDetailedContent';
import Button from '@/components/ui/Button/Button';
import { type Character } from '@/types/types';
import Text from '@/components/ui/Text/Text';
import { ErrorMessage } from '@/constants/constants';
import styles from './CardDetailed.module.css';

interface CardDetailedProps {
  char: Character | null;
  errorMessage: string;
  onClose: () => void;
}

export default function CardDetailed({
  char,
  errorMessage,
  onClose,
}: CardDetailedProps): ReactNode {
  if (errorMessage !== ErrorMessage.NO_ERROR) {
    return (
      <div className={styles.errorWrapper}>
        <Text as="h2" className={styles.errorTitle} size="lg">
          {errorMessage}
        </Text>
        <Button onClick={onClose}>Close</Button>
      </div>
    );
  }

  if (!char) {
    return null;
  }

  return <CardDetailsContent character={char} onClose={onClose} />;
}
