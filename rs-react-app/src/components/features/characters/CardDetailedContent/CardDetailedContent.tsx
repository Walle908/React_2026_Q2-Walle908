import { type ReactNode } from 'react';
import Image from 'next/image';
import Text from '@/components/ui/Text/Text';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import { type Character } from '@/types/types';
import { useTranslations } from 'next-intl';
import styles from './CardDetailedContent.module.css';

interface CardDetailsContentProps {
  character: Character;
  path: string;
}

export default function CardDetailsContent({
  character,
  path,
}: CardDetailsContentProps): ReactNode {
  const t = useTranslations('Card');
  const fields = [
    { label: t('status'), value: character.status },
    { label: t('species'), value: character.species },
    { label: t('type'), value: character.type },
    { label: t('gender'), value: character.gender },
    { label: t('origin'), value: character.origin?.name },
    { label: t('location'), value: character.location?.name },
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
        priority
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
      <LinkComponent variant="buttonLink" href={path} className={styles.closeButton}>
        {t('close')}
      </LinkComponent>
    </div>
  );
}
