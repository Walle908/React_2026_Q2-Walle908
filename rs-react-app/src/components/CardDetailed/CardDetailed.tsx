import { type ReactNode } from 'react';
import Loader from '@components/Loader/Loader';
import Text from '@components/Text/Text';
import useCharacterDetails from '@hooks/useCharactersDetails';
import CardDetailsContent from '../CardDetailedContent/CardDetailedContent';
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
