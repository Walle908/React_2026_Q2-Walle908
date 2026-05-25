import { type ReactNode } from 'react';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import Text from '@/components/ui/Text/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSelection } from '@/store/reducers/selectCharactersSlice';
import { type Character } from '@/types/types';
import styles from './Card.module.css';

interface CardProps {
  char: Character;
}

export default function Card({ char }: CardProps): ReactNode {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => state.selectCharacters.selectedIds);

  const isSelected = selectedIds.includes(char.id);

  return (
    <LinkComponent to={`/?details=${char.id}`} variant="cardLink">
      <input
        checked={isSelected}
        onChange={() => dispatch(toggleSelection(char.id))}
        onClick={(e) => e.stopPropagation()}
        type="checkbox"
      />
      <img alt={char.name} className={styles.cardImg} src={char.image} />
      <Text as="h2" className={styles.cardTitle} size="md">
        {char.name || 'n/a'}
      </Text>
    </LinkComponent>
  );
}
