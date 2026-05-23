import { type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import styles from './CardDetailedContent.module.css';

interface CardDetailsContentProps {
  character: Character;
  onClose: () => void;
}

export default function CardDetailsContent({
  character,
  onClose,
}: CardDetailsContentProps): ReactNode {
  const fields = [
    { label: 'Status', value: character.status },
    { label: 'Species', value: character.species },
    { label: 'Type', value: character.type },
    { label: 'Gender', value: character.gender },
    { label: 'Origin', value: character.origin?.name },
    { label: 'Location', value: character.location?.name },
  ];

  return (
    <div className={styles.cardWrapper}>
      <img className={styles.cardImg} src={character.image} alt={character.name} />

      <div className={styles.cardDescription}>
        <Text as="h2" className={styles.cardTitle}>
          {character.name || 'n/a'}
        </Text>
        <ul className={styles.cardList}>
          {fields.map(({ label, value }) => {
            return (
              <li key={label}>
                <b>{label}: </b>
                {value || 'n/a'}
              </li>
            );
          })}
        </ul>
      </div>
      <Button variant="close" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
