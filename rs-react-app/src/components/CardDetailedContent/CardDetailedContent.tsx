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
  return (
    <div className={styles.cardWrapper}>
      <img className={styles.cardImg} src={character.image} alt={character.name} />

      <div className={styles.cardDescription}>
        <Text as="h2" className={styles.cardTitle}>
          {character.name || 'n/a'}
        </Text>
        <ul className={styles.cardList}>
          <li>
            <b>Status: </b>
            {character.status || 'n/a'}
          </li>
          <li>
            <b>Species: </b>
            {character.species || 'n/a'}
          </li>
          <li>
            <b>Type: </b>
            {character.type || 'n/a'}
          </li>
          <li>
            <b>Gender: </b>
            {character.gender || 'n/a'}
          </li>
          <li>
            <b>Origin: </b>
            {character.origin.name || 'n/a'}
          </li>
          <li>
            <b>Location: </b>
            {character.location.name || 'n/a'}
          </li>
        </ul>
      </div>
      <Button variant="close" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
