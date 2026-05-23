import { type ReactNode } from 'react';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import useCharacterDetails from '../../hooks/useCharactersDetails';
import CardDetailsContent from '../CardDetailedContent/CardDetailedContent';
import styles from './CardDetailed.module.css';

export default function CardDetailed(): ReactNode {
  const { char, isLoading, errorMessage, closeCard } = useCharacterDetails();

  if (isLoading) {
    return <Loader />;
  }

  if (!char) {
    return (
      <Text as="h2" className={styles.errorTitle}>
        {errorMessage}
      </Text>
    );
  }
  return <CardDetailsContent character={char} onClose={closeCard} />;
}
