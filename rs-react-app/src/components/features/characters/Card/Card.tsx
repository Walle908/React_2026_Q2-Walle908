import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import Text from '@/components/ui/Text/Text';
import { SearchParams } from '@/constants/constants';
import { type Character } from '@/types/types';
import styles from './Card.module.css';

interface CardProps {
  char: Character;
}

export default function Card({ char }: CardProps): ReactNode {
  const [searchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  newParams.set(SearchParams.DETAILS, String(char.id));

  return (
    <LinkComponent to={`/?${newParams.toString()}`} variant="cardLink">
      <img alt={char.name} className={styles.cardImg} src={char.image} />
      <Text as="h2" className={styles.cardTitle} size="md">
        {char.name || 'n/a'}
      </Text>
    </LinkComponent>
  );
}
