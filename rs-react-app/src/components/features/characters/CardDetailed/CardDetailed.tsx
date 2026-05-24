import { type ReactNode } from 'react';
import CardDetailsContent from '@/components/features/characters/CardDetailedContent/CardDetailedContent';
import Loader from '@/components/ui/Loader/Loader';
import Text from '@/components/ui/Text/Text';
import useCharacterDetails from '@/hooks/useCharactersDetails';
import styles from './CardDetailed.module.css';

export default function CardDetailed(): ReactNode {
  const { char, closeCard, errorMessage, isLoading } = useCharacterDetails();

  if (isLoading) {
    return <Loader />;
  }

  if (!char) {
    return (
      <Text as="h2" className={styles.errorTitle} size="lg">
        {errorMessage}
      </Text>
    );
  }
  return <CardDetailsContent character={char} onClose={closeCard} />;
}
