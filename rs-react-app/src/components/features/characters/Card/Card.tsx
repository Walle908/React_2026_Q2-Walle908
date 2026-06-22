import { type ReactNode } from 'react';
import Input from '@/components/ui/Input/Input';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import Text from '@/components/ui/Text/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSelection } from '@/store/reducers/selectedCharactersSlice';
import { type Character } from '@/types/types';
import buildUrl from '@/utils/buildUrl';
import styles from './Card.module.css';

interface CardProps {
  char: Character;
  currentPage: number;
  currentQuery: string;
}

export default function Card({ char, currentPage, currentQuery }: CardProps): ReactNode {
  const dispatch = useAppDispatch();
  const selectedChars = useAppSelector((state) => state.selectedCharacters.selectedChars);
  const isSelected = selectedChars.some((item) => item.id === char.id);

  const href = buildUrl(currentPage, currentQuery, String(char.id));

  return (
    <LinkComponent href={href} variant="cardLink" scroll={false}>
      <Input
        checked={isSelected}
        className={styles.inputCheckbox}
        onChange={() => dispatch(toggleSelection(char))}
        onClick={(e) => e.stopPropagation()}
        type="checkbox"
        variant="checkbox"
      />
      <img alt={char.name} className={styles.cardImg} src={char.image} />
      <Text as="h2" className={styles.cardTitle} size="md">
        {char.name}
      </Text>
    </LinkComponent>
  );
}
