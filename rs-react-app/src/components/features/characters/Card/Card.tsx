'use client';

import { type ReactNode } from 'react';
import { usePathname } from '@/i18n/navigation';
import Image from 'next/image';
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
  index: number;
}

export default function Card({ char, index, currentPage, currentQuery }: CardProps): ReactNode {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const selectedChars = useAppSelector((state) => state.selectedCharacters.selectedChars);
  const isSelected = selectedChars.some((item) => item.id === char.id);

  const queryObj = buildUrl(currentPage, currentQuery, String(char.id));

  const shouldPreload = index < 4;

  return (
    <LinkComponent href={{ pathname, query: queryObj }} variant="cardLink" scroll={false}>
      <Input
        checked={isSelected}
        className={styles.inputCheckbox}
        onChange={() => dispatch(toggleSelection(char))}
        onClick={(e) => e.stopPropagation()}
        type="checkbox"
        variant="checkbox"
      />
      <Image
        alt={char.name}
        className={styles.cardImg}
        src={char.image}
        width={200}
        height={200}
        priority={shouldPreload}
      />
      <Text as="h2" className={styles.cardTitle} size="md">
        {char.name}
      </Text>
    </LinkComponent>
  );
}
