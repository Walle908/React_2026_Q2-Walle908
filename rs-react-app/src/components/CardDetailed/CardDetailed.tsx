import { type ReactNode } from 'react';
import Loader from '../Loader/Loader';
import { Text } from '../Text/Text';
import useCharacterDetails from '../../hooks/useCharactersDetails';
import CardDetailsContent from '../CardDetailedContent/CardDetailedContent';

export default function CardDetailed(): ReactNode {
  const { character, isLoading, closeCard } = useCharacterDetails();

  if (isLoading) {
    return <Loader />;
  }

  if (!character) {
    return <Text as="h2">The character&apos;s info is not found</Text>;
  }
  return <CardDetailsContent character={character} onClose={closeCard} />;
}
