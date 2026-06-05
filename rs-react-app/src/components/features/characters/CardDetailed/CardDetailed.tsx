import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import CardDetailsContent from '@/components/features/characters/CardDetailedContent/CardDetailedContent';
import Button from '@/components/ui/Button/Button';
import Loader from '@/components/ui/Loader/Loader';
import Text from '@/components/ui/Text/Text';
import { SearchParams } from '@/constants/constants';
import { useGetCharByIdQuery } from '@/services/apiSlice';
import getErrorMessage from '@/utils/getErrorMessage';
import styles from './CardDetailed.module.css';

export default function CardDetailed(): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get(SearchParams.DETAILS);

  const { data: char, error, isFetching, isLoading } = useGetCharByIdQuery(id ?? '', { skip: !id });

  const errorMessage = getErrorMessage(error);

  const closeCard = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(SearchParams.DETAILS);
    setSearchParams(newParams);
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!id) {
    return null;
  }

  if (!char) {
    return (
      <div className={styles.errorWrapper}>
        <Text as="h2" className={styles.errorTitle} size="lg">
          {errorMessage}
        </Text>
        <Button onClick={closeCard}>Close</Button>
      </div>
    );
  }
  return <CardDetailsContent character={char} onClose={closeCard} />;
}
