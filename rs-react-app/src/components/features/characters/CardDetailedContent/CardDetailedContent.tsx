import { type ReactNode } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import { type Character } from '@/types/types';
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
      <Image
        alt={character.name}
        className={styles.cardImg}
        key={character.id}
        src={character.image}
        width={200}
        height={200}
      />

      <div className={styles.cardDescription}>
        <Text as="h2" className={styles.cardTitle} size="md">
          {character.name}
        </Text>
        <ul className={styles.cardList}>
          {fields.map(({ label, value }) => (
            <li key={label}>
              <b>{label}: </b>
              {value || 'n/a'}
            </li>
          ))}
        </ul>
      </div>
      <Button className={styles.closeButton} onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
