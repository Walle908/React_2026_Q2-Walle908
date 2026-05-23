import { type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { Link, useSearchParams } from 'react-router';
import { SearchParams } from '../../constants/constants';
import Text from '../Text/Text';
import styles from './Card.module.css';

interface CardProps {
  char: Character;
}

export default function Card({ char }: CardProps): ReactNode {
  const [searchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  newParams.set(SearchParams.DETAILS, String(char.id));

  return (
    <Link to={`/?${newParams.toString()}`} className="link">
      <div className={styles.cardWrapper}>
        <img className={styles.cardImg} src={char.image} alt={char.name} />
        <Text as="h2" className={styles.cardTitle}>
          {char.name || 'n/a'}
        </Text>
      </div>
    </Link>
  );
}
