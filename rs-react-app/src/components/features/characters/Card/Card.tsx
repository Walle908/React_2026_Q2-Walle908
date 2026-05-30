import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import Text from '@/components/ui/Text/Text';
import { SearchParams } from '@/constants/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSelection } from '@/store/reducers/selectedCharactersSlice';
import { type Character } from '@/types/types';
import styles from './Card.module.css';

interface CardProps {
  char: Character;
}

export default function Card({ char }: CardProps): ReactNode {
  const dispatch = useAppDispatch();
  const selectedChars = useAppSelector((state) => state.selectedCharacters.selectedChars);
  const isSelected = selectedChars.some((item) => item.id === char.id);

  const [searchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  newParams.set(SearchParams.DETAILS || 'details', String(char.id));

  return (
    <LinkComponent to={`/?${newParams.toString()}`} variant="cardLink">
      <input
        checked={isSelected}
        className={styles.checkbox}
        onChange={() => dispatch(toggleSelection(char))}
        onClick={(e) => e.stopPropagation()}
        type="checkbox"
      />
      <img alt={char.name} className={styles.cardImg} src={char.image} />
      <Text as="h2" className={styles.cardTitle} size="md">
        {char.name}
      </Text>
    </LinkComponent>
  );
}
